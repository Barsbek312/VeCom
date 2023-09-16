import React from "react";
import { compose } from "redux";
import { WithAuthRedirect } from "../../../hoc/WithAuthRedirect";
import p from './Participants.module.css';
import yes from './../../../assets/images/participants__icons/yes.svg';
import no from './../../../assets/images/participants__icons/no.svg'

const Participants = ({ dataOfUser, name, isAccept, onClickAccept, onClickReject }) => {
    
    return (
        <div className={p.wrapper}>
            <div className={p.left}>
                <div>
                    {/* <img src="" alt="ava-user" className={p.ava}/> */}
                </div>
                <h2>{name}</h2>
            </div>
            <div className={p.right}>
                <button className={p.button + " " + p.reject} onClick={() => {onClickReject({dataOfUser})}}>
                    <img src={no} alt="reject-icon" />
                </button>
                {!isAccept &&
                    <>
                        <button className={p.button + " " + p.accept} onClick={() => { onClickAccept({ dataOfUser }) }}>
                            <img src={yes} alt="accept-icon" />
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default compose(WithAuthRedirect)(Participants);