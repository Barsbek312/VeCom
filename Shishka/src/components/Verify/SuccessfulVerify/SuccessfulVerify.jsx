import React, { useEffect, useState } from "react";
import v3 from './../AcceptVerify/Verify.module.css';
import { Navigate } from "react-router-dom";

const SuccessfulVerify = () => {
    const [isHandleClick, setIsHandleClick] = useState(false);
    if(isHandleClick) return <Navigate to="/entrance" />
    return (
        <main className={v3.main__wrapper}>
            <div className="container">
                <div className={v3.modal}>
                    <h3>Сообщение отправлено</h3>
                    <p>
                        Подтвердите, что это Ваша почта
                    </p>
                    <button className={v3.modal__button}>Подтвердить</button>
                    <button
                        className={v3.modal__exit}
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

export default SuccessfulVerify;