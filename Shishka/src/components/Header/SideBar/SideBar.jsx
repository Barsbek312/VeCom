import React, { useState, useEffect, useLayoutEffect } from "react";
import './SideBar.css';
import { slide as Menu } from 'react-burger-menu';
import { useSwipeable } from 'react-swipeable';
import { NavLink, useNavigate } from "react-router-dom";
import qrCode from './../../../assets/images/sidebar__images/qr_code.svg';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/user";

const SideBar = () => {

    const { registered, isAuth, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleClickOnExit = async () => {
        const exit = await dispatch(logout());
        navigate("/entrance");
    }

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
                    {isAuth === true ? 
                        <NavLink to={user?.isOrg ? "/profileOrg/me" : "/profileVol"}>
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
                            <h2>Log in</h2>
                        </NavLink>
                    }
                </div>
                {/* <NavLink to="/" className="menu-item">Домой</NavLink> */}
                <NavLink to="/" className="menu-item">Home</NavLink>
                {/* <NavLink to="/settings" className="menu-item">Настройки</NavLink> */}
                {/* <NavLink to="/rating" className="menu-item">Рейтинг</NavLink> */}
                {/* <NavLink to="/organizations" className="menu-item">Организации</NavLink> */}
                {/* <NavLink to="/notifications" className="menu-item">Уведомления</NavLink> */}
                <NavLink to="/notifications" className="menu-item">Notifications</NavLink>
                {/* временное комментирование */}
                {/* <NavLink to="/chat" className="menu-item">Чат</NavLink> */}
                {/* {user?.isOrg && [<NavLink to="/eventsOfOrg" className="menu-item">Мероприятия</NavLink>
                , <NavLink to="/createPost" className="menu-item">Создать пост</NavLink>,
                <a className="menu-item" onClick={handleClickOnExit}>Выйти</a>]} */}
                {user?.isOrg && [<NavLink to="/eventsOfOrg" className="menu-item">Events</NavLink>
                , <NavLink to="/createPost" className="menu-item">Create a post</NavLink>,
                <a className="menu-item" onClick={handleClickOnExit}>Exit</a>]}
                {/*  временное комментирование */}
                {/* <div className="advertising">
                    <h3 className="advertisin__title">Реклама</h3>
                </div> */}
                {/* <div className="qr_code">
                    <img src={qrCode} alt="qr-code" />
                </div> */}
            </Menu>
        </div>
    );
}

export default SideBar;