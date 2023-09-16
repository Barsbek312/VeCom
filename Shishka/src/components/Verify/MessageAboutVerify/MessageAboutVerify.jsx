import React, { useEffect, useState } from "react";
import v2 from './../AcceptVerify/Verify.module.css';
import { Navigate } from "react-router-dom";

const MessageAboutVerify = () => {
    const [isHandleClick, setIsHandleClick] = useState(false);
    if(isHandleClick) return <Navigate to="/entrance" />
    return (
        <main className={v2.main__wrapper}>
            <div className="container">
                <div className={v2.modal}>
                    <h3>The message has been sent</h3>
                    <p style={{marginTop: 20, marginBottom: 20}}>
                        Confirm that this is your mail by clicking on the link on your mail
                    </p>
                    <button
                        className={v2.modal__exit}
                        type="button"
                        onClick={() => {setIsHandleClick(true);}}
                    >
                        Change Email Address
                    </button>
                </div>
            </div>
        </main>
    )
}

export default MessageAboutVerify;