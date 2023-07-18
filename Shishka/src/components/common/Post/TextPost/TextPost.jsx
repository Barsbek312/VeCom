import React from "react";
import tp from './TextPost.module.css';
import view from './../../../../assets/images/post__icons/Views.svg';
import date from './../../../../assets/images/post__icons/date_of_adding_post.svg';

const TextPost = () => {
    return (
        <div className={tp.post}>
            <div className={tp.left}>
                <h3>Название мероприятий организаторов</h3>
            </div>
            <div className={tp.right}>
                <ul>
                    <li>
                        <img src={view} alt="views" /><span>14</span>
                    </li>
                    <li>
                        <img height={8} width={9} src={date} alt="date" /><span>23.04</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TextPost;