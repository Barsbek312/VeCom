import React, {useState} from "react";
import Entrance from "./Entrance";
import { connect, useSelector } from "react-redux";
import { register, login } from "../../redux/user.js";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const EntranceContainer = (props) => {

    const dispatch = useDispatch();
    const { registered, loading, isAuth } = useSelector(state => state.user);

    const [isError, setIsError] = useState(false);
    const [isExist, setIsExist] = useState(false);
    const [isRegistration, setIsRegistration] = useState(false);

    const onSubmitButton = async (data, event) => {
        event.preventDefault();
        const dataLength = Object.keys(data).length;
        if(!isRegistration) {
            const setError = dataLength > 2 ? false : true;
            setIsError(setError);
            if(!isError) {
                data.status = data?.status?.trim();
                data.username = data?.email;
                if(data?.status === "Волонтер") {
                    delete data.status;
                    delete data.email;
                    dispatch(login(data, true));
                } else{
                    delete data.status;
                    delete data.email;
                    dispatch(login(data, false));
                }
            }
        } 
        else {
            delete data?.confirmPassword;
            data['username'] = data['email'];
            let isVol = false;
            if(dataLength > 4) {
                data["hours"] = 0;
                data['certificated'] = false;
                isVol = true;
            }
            data.isVol = isVol;
            const res = await dispatch(register(data));

            if(res?.payload?.username[0] === "A user with that username already exists.") {
                setIsExist(true);
            }
        }
    }

    if(registered) return <Navigate to="/messageVerify" />
    if(isAuth) return <Navigate to="/" />



    return (
        <Entrance onSubmitButton={onSubmitButton} 
            isLoading={loading}
            isError={isError}
            setIsError={setIsError}
            isExist={isExist}
            isRegistration={isRegistration}
            setIsRegistration={setIsRegistration}/>
    )

}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {register})(EntranceContainer);
// export default connect(mapStateToProps, {login})(EntranceContainer);