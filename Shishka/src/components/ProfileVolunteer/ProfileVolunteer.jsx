import React from "react";
import pr from './ProfileVolunteer.module.css';
import changer from './../../assets/images/profile__icons/changer.svg';
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { changeAvaOfVol } from "../../redux/profile";

const ProfileVolunteer = () => {

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleChooseAva = async (e, id) => {
        console.log(e.target.files)
        const avatar = e.target.files[0];
        const res = await dispatch(changeAvaOfVol({id, avatar}));
        console.log(res);
    }

    return (
        <main>
           <div className={"container"}>
               <div className={pr.header}>
                   <div className={pr.ava}>
                       <div className={pr.ava__wrapper}>
                           {/* <img src="" alt="avatar" /> */}
                       </div>
                       <label htmlFor="input__image"><img src={changer} alt="changer" /></label>
                       <input type="file" id="input__image" onChange={(e) => {handleChooseAva(e, user && user["id"])}} className={pr.choose__avatar} multiple/>
                   </div>
                   <div className={pr.info}>
                       <h2>{user && user["first_name"]}</h2>
                       <span className={pr.email}>{user && user['username']}</span>
                   </div>
               </div>
           </div>
           <DropDownMenu />
        </main>
    )
}

export default compose(WithAuthRedirect)(ProfileVolunteer);