import React, { useState, useEffect, useLayoutEffect } from "react";
import './SideBar.css';
import { slide as Menu } from 'react-burger-menu';
import { useSwipeable } from 'react-swipeable';
import { NavLink } from "react-router-dom";
import qrCode from './../../../assets/images/sidebar__images/qr_code.svg';
import { useSelector } from "react-redux";

const SideBar = () => {

    const { registered, isAuth, user } = useSelector(state => state.user);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSwipeLeft = () => {
        setIsSidebarOpen(false);
    };

    const handleSwipeRight = () => {
        setIsSidebarOpen(true);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
    });

    useEffect(() => {
        setIsSidebarOpen(false);
    }, []);

    const handleMenuStateChange = (state) => {
        setIsSidebarOpen(state.isOpen);
    };

    useLayoutEffect(() => {
        if(isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isSidebarOpen])

    return (
        <div className={"wrapper"} {...swipeHandlers}>
            <Menu width={'167px'} isOpen={isSidebarOpen} onStateChange={handleMenuStateChange}>
                <div className="sidebar__header">
                    {isAuth ? 
                        <NavLink to="/profileVol">
                            <div className="sidebar__ava">
                                {/* <img src="" alt="sidebar-ava" /> */}
                            </div>
                            <h2>{user && user['first_name']}</h2>
                        </NavLink>
                    :
                        <NavLink to="/entrance">
                            <div className="sidebar__ava">
                                {/* <img src="" alt="sidebar-ava" /> */}
                            </div>
                            <h2>Войти</h2>
                        </NavLink>
                    }
                </div>
                <NavLink to="/" className="menu-item">Домой</NavLink>
                <NavLink to="/settings" className="menu-item">Настройки</NavLink>
                <NavLink to="/rating" className="menu-item">Рейтинг</NavLink>
                <NavLink to="/organizations" className="menu-item">Организации</NavLink>
                {/* чат будет на стадии тестирования с колледжом TSI AUCA */}
                {/* <NavLink to="/chat" className="menu-item">Чат</NavLink> */}
                {user?.isAdmin && [<NavLink to="/participantsOfEvent" className="menu-item">Мероприятия</NavLink>
                , <NavLink to="/createPost" className="menu-item">Создать пост</NavLink>]}
                {/* реклама будет на поздних стадиях последнего этапа */}
                {/* <div className="advertising">
                    <h3 className="advertisin__title">Реклама</h3>
                </div> */}
                <div className="qr_code">
                    <img src={qrCode} alt="qr-code" />
                </div>
            </Menu>
        </div>
    );
}

export default SideBar;