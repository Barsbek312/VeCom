import React, { useEffect, useRef, useState } from "react";
import ddm from './DropDownMenu.module.css';
import { useSelector } from "react-redux";
import { logout } from "../../../redux/user";
import { useDispatch } from "react-redux";
import { changeDescriptionOfVol } from "../../../redux/profile";

const DropDownMenu = () => {

    // Нужно зарефакторить код и выделить в отдельные компоненты для дальнейшего его использования!

    const { user } = useSelector(state => state.user);

    const [isEditable, setIsEditable] = useState(false);
    const descriptionText = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(logout());
    }

    const handleSubmitOnDescription = () => {
        setIsEditable(true);
    }

    useEffect(() => {
        if(isEditable) descriptionText.current.focus();
    }, [isEditable])

    const handleSubmitSave = async (id, description) => {
        const res = await dispatch(changeDescriptionOfVol({id, description}));
        console.log(res);
        setIsEditable(false);
    }

    return (
        <div className="container">
            <form className={ddm.form} onSubmit={handleSubmit}>
                <ul className={ddm.dropdown}>
                    <li>
                        <span>У вас</span>
                        <input type="text" value={(user && user['hours']) + " ч."} readOnly/>
                    </li>
                    {/* временное комментирование */}
                    {/* <li>
                        <span>Друзья</span>
                        <input type="text" value={100} readOnly/>
                    </li> */}
                    {/* временное комментирование */}
                </ul>
                <ul className={ddm.dropdown}>
                    <li>
                        <span>Имя</span>
                        <input type="text" value={user && user['first_name']} readOnly/>
                    </li>
                </ul>
                <ul className={ddm.dropdown}>
                    <li>
                        <span>История</span>
                        <input type="text" value={32} readOnly/>
                    </li>
                </ul>
                <div className={ddm.description__wrapper}>
                    <strong>Описание:</strong>
                    <div className={ddm.description}>
                        <p contentEditable={isEditable} ref={descriptionText}>
                            {!(user && user["description"]) && !isEditable && "Добавьте описание, чтобы другие люди могли понять, кто вы:)"}
                        </p>
                    </div>
                </div>
                <div className={ddm.change__wrapper}>
                    <a onClick={isEditable ? () => {handleSubmitSave((user && user["id"]), descriptionText.current.innerText)} : handleSubmitOnDescription}>{isEditable ? "Save" : "Change"}</a>
                </div>
                <div className={ddm.signOut__wrapper}>
                    <button type="submit">Exit</button>
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