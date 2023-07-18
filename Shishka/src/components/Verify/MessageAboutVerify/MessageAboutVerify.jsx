import React, { useEffect, useState } from "react";
import v2 from './../AcceptVerify/Verify.module.css';
import { Navigate } from "react-router-dom";

const MessageAboutVerify = ({match}) => {
    console.log(match)
    const [isHandleClick, setIsHandleClick] = useState(false);
    if(isHandleClick) return <Navigate to="/entrance" />
    return (
        <main className={v2.main__wrapper}>
            <div className="container">
                <div className={v2.modal}>
                    <h3>Сообщение отправлено</h3>
                    <p style={{marginTop: 20, marginBottom: 20}}>
                        Подтвердите, что это Ваша почта, перейдя по ссылке на вашей почте
                    </p>
                    <button
                        className={v2.modal__exit}
                        type="button"
                        onClick={() => {setIsHandleClick(true)}}
                    >
                        Изменить адрес электронной почты
                    </button>
                </div>
            </div>
        </main>
    )
}

export default MessageAboutVerify;