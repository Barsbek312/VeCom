import React, { useEffect, useState } from "react";
import n from './Notification.module.css';
import shishka from './../../../assets/images/LogoShishka.svg';


const Notification = ({isAccepted, nameOfOrg, isPopUp=null}) => {

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if(isPopUp !== null) {
            setVisible(true);
        }

        const timeout = setTimeout(() => {
            setVisible(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [])

    return (
        <div className={`${n.container} ${isPopUp && n.popUp} ${visible ? n.popUpVisible : n.popUpNonVisible}`}>
            <div className={n.top}>
                <div className={n.img__wrapper}>
                    <img src={shishka} alt="answer" />
                </div>
                <h3 style={{color: isAccepted ? "rgba(75, 109, 227, 1)" : "rgba(227, 75, 75, 1)"}}>{nameOfOrg}</h3>
                {/* <span>{timeOfSending}</span> */}
            </div>
            <div className={n.bottom}>
                <p>{isAccepted ? "Thank you your application is accepted" : "Your application has been rejected"}</p>
            </div>
        </div>
    )
}

export default Notification;