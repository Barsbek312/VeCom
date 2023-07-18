import React from "react";
import f from './Footer.module.css';
import google from './../../assets/images/footer__icons/google.svg';
import instagram from './../../assets/images/footer__icons/instagram.svg';
import telegram from './../../assets/images/footer__icons/telegram.svg';
import tikTok from './../../assets/images/footer__icons/tik-tok.svg';

const Footer = () => {
    return (
        <footer className={f.footer}>
            <div className="container">
                <div className={f.footer__left}>
                    <div>
                        {/* <img src="" alt="ava_shishka" /> */}
                    </div>
                </div>
                <div className={f.footer__right}>
                    <ul className={f.footer__list}>
                        <li>
                            <a href="https://www.google.ru/" target="_blank"><img src={google} alt="google" /></a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/" target="_blank"><img src={tikTok} alt="tik-tok" /></a>
                        </li>
                        <li>
                            <a href="https://web.telegram.org/" target="_blank"><img src={telegram} alt="telegram" /></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" target="_blank"><img src={instagram} alt="instagram" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;