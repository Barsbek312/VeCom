import React, {useState} from "react";
import Entrance from "./Entrance";
import { connect, useSelector } from "react-redux";
import { register, login } from "../../redux/user.js";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const EntranceContainer = (props) => {

    const dispatch = useDispatch();
    const { registered, isAuth } = useSelector(state => state.user);

    const [isError, setIsError] = useState(false);
    const [isExistInReg, setIsExistInReg] = useState(false);
    const [isExistInLogin, setIsExistInLogin] = useState(false);
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
                delete data.status;
                delete data.email;
                const res = await dispatch(login(data));
                const checkOnExist = "No active account found with the given credentials";
                if(res?.payload?.detail && res?.payload?.detail === checkOnExist) {
                    setIsExistInLogin(true);
                }
            }   
        } 
        else {
            delete data?.confirmPassword;
            data['username'] = data['email'];
            let isVol = false;
            data["hours"] = 0;
            data['certificated'] = false;
            if(dataLength > 4) {
                isVol = true;
            } else {
                data['second_name'] = null;
                data['birthday'] = null;
                data["phoneNumber"] = "";
                data['region'] = "";
                data['city'] = null;
            }

            data.isOrg = !isVol;
            const res = await dispatch(register(data));
            const checktext = "A user with that username already exists.";
            if(res?.payload?.username?.[0] === checktext) {
                setIsExistInReg(true);
            }
        }
    }

    if(registered) return <Navigate to="/messageVerify" />
    if(isAuth === true) return <Navigate to="/" />



    return (
        <Entrance onSubmitButton={onSubmitButton} 
            isError={isError}
            setIsError={setIsError}
            isExistInReg={isExistInReg}
            isRegistration={isRegistration}
            setIsRegistration={setIsRegistration}
            isExistInLogin={isExistInLogin}/>
    )

}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {})(EntranceContainer);
// export default connect(mapStateToProps, {login})(EntranceContainer);