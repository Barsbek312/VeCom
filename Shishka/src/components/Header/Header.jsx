import React, { useEffect, useState } from "react";
import "../../index";
import h from './Header.module.css';
import SideBar from "./SideBar/SideBar";
import audio from './../../assets/images/header__icons/audio-speech.svg';

const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 0);
        }

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        const burgerMenu = document.querySelector('.bm-burger-button');

        if(burgerMenu) {
            if(isScrolled) {
                burgerMenu.style.top = "35px";
            } else {
                burgerMenu.style.top = "20px";
            }
        }

    }, [isScrolled])

    return (
        <div className={"container" + " " + h.header__container + (isScrolled ? " " + h.scrolled__header_container : "")}>
            <div className={h.header}>
                <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} isScrolled={isScrolled}/>
                <div className={h.wrapper__input} id="page-wrap">
                    <input type="text" className={h.input} placeholder="Введите запрос"/>
                    <button className={h.btn}><img src={audio} alt="audio-speech"/></button>
                </div>
                <div className={h.avatar}>
                    {/* <img src="" alt="avatar-img" /> */}
                </div>
            </div>
        </div> 
    )
}

export default Header;