import React from "react";
import pr from './ProfileVolunteer.module.css';
import changer from './../../assets/images/profile__icons/changer.svg';
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

const ProfileVolunteer = () => {
    return (
        <main>
            <div className={"container"}>
                <div className={pr.header}>
                    <div className={pr.ava}>
                        <div className={pr.ava__wrapper}>
                            {/* <img src="" alt="avatar" /> */}
                        </div>
                        <button className={pr.btn}><img src={changer} alt="changer" /></button>
                    </div>
                    <div className={pr.info}>
                        <h2>Shnizel</h2>
                        <span className={pr.email}>Suranbaevb22a@gmail.com</span>
                    </div>
                </div>
            </div>
            <DropDownMenu />
        </main>
    )
}

export default compose(WithAuthRedirect)(ProfileVolunteer);