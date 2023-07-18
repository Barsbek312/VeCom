import React from "react";
import ddm from './DropDownMenu.module.css';

const DropDownMenu = () => {

    // Нужно зарефакторить код и выделить в отдельные компоненты для дальнейшего его использования!


    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className="container">
            <form className={ddm.form} onSubmit={handleSubmit}>
                <ul className={ddm.dropdown}>
                    <li>
                        <span>Имя</span>
                        <input type="text" />
                    </li>
                    <li>
                        <span>Фамилия</span>
                        <input type="text" />
                    </li>
                    <li>
                        <span>Дата рождения</span>
                        <input className={ddm.input} type="text" />
                    </li>
                    <li>
                        <span>Телефон</span>
                        <input type="text" />
                    </li>
                </ul>
                <a>Изменить</a>
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
            <div className={ddm.settings}>
                <button type="button">Настройки</button>
            </div>
            <div className={ddm.signOut__wrapper}>
                <button type="submit">Выйти из аккаунта</button>
            </div>
        </div>
    )
}

export default DropDownMenu;