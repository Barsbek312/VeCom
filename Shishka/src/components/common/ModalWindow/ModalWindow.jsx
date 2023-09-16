import React, { useRef } from "react";
import md from './ModalWindow.module.css';
import shishka from './../../../assets/images/LogoShishka.svg';

const ModalWindow = ({text="Confirm your choice", acceptFunc=()=>{}, setIsShowAccepting=()=>{}, params={}, btnText = "Подтвердить"}) => {

    const modalWindow = useRef(null);
    const modalContainer = useRef(null);

    const handleClickContainer = () => {
        setIsShowAccepting(false);
    }

    const handleClickModal = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={md.wrapper} onClick={handleClickContainer} ref={modalWindow}>
            <div className={md.container} onClick={handleClickModal} ref={modalContainer}>
                <div className={md.header}>
                    <div className={md.image__wrapper}>
                        <img src={shishka} alt="logo" />
                    </div>
                    <h2>
                        Shishka
                    </h2>
                </div>
                <div className={md.main}>
                    <span>{text}</span>
                </div>
                <div className={md.footer}>
                    <button onClick={() => {Object.keys(params).length > 0 ? acceptFunc(...params) : acceptFunc(); setIsShowAccepting(false)}}>{btnText}</button>
                    <button onClick={() => {setIsShowAccepting(false)}}>Отклонить</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;