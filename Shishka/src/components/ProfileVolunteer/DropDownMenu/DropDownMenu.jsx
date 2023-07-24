import React from "react";
import ddm from './DropDownMenu.module.css';
import { useSelector } from "react-redux";
import { logout } from "../../../redux/user";
import { useDispatch } from "react-redux";

const DropDownMenu = () => {

    // Нужно зарефакторить код и выделить в отдельные компоненты для дальнейшего его использования!

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(logout());

    }

    return (
        <div className="container">
            <form className={ddm.form} onSubmit={handleSubmit}>
                <ul className={ddm.dropdown}>
                    <li>
                        <span>Имя</span>
                        <input type="text" value={`${user && user['first_name']} IuuuuIuuuuIuuuuIuuuuIuuuuIuuuuIuuuuIuuuu`} readOnly/>
                    </li>
                    <li>
                        <span>Фамилия</span>
                        <input type="text" value={user && user["second_name"]} readOnly/>
                    </li>
                    <li>
                        <span>Дата рождения</span>
                        <input className={ddm.input} type="text" value={user && user["birthday"]} readOnly/>
                    </li>
                    <li>
                        <span>Телефон</span>
                        <input type="text" value={user && user["phoneNumber"]} readOnly/>
                    </li>
                </ul>
                <a>Изменить</a>
                <div className={ddm.settings}>
                    <button type="button">Настройки</button>
                </div>
                <div className={ddm.signOut__wrapper}>
                    <button type="submit">Выйти из аккаунта</button>
                </div>
                {/* <ul className={ddm.dropdown}>
                    <li>
                        <span>E mail</span>
                        <input type="text" />
                    </li>
                    <li>
                        <span>Пароль</span>
                        <input type="password" />
                    </li>
                </ul> */}
            </form>
        </div>
    )
}

export default DropDownMenu;