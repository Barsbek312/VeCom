import React, { useEffect } from "react";
import tp from './TextPost.module.css';
import view from './../../../../assets/images/post__icons/Views.svg';
import date from './../../../../assets/images/post__icons/date_of_adding_post.svg';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sendView } from "../../../../redux/event";
import Comment from "./../../../../assets/images/post__icons/Comment.svg";
import { NavLink } from "react-router-dom";

const TextPost = ({title, dateOfAdd, nameOfOrg, views, eventId, checkOfLike, like_id, orgUrl }) => {

    const dispatch = useDispatch();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const {user} = useSelector(state => state.user);

    const arrOfDate = dateOfAdd && dateOfAdd.split("-");
    const year = arrOfDate?.[0];
    const month = arrOfDate && months[+arrOfDate[1] - 1];
    const day = arrOfDate?.[2];

    const handleClickOnPost = async (user, eventId) => {
        const res = await dispatch(sendView({user, event: `http://127.0.0.1:8000/events/${eventId}/`}));
    }

    return (
        <div className={tp.post}>
            <div className={tp.left}>
                <div className={tp.title__block}>
                    <NavLink to={`/profileOrg/}`}>
                        <h3>{nameOfOrg}</h3>
                    </NavLink>
                    <div className={tp.date}>
                        <img height={8} width={9} src={date} alt="date" /><span>{day}.{month} {year}</span>
                    </div>
                </div>
                <div className={tp.description__block}>
                    <NavLink to={`/describePost/${eventId}`} onClick={() => { handleClickOnPost(user?.url, eventId) }}>
                        <p>{title}</p>
                    </NavLink>
                </div>
            </div>
            <div className={tp.right}>
                <ul>
                    <li className={tp.comment}>
                        <img src={Comment} alt="comment-icon" />
                    </li>
                    <li className={tp.views}>
                        <img src={view} alt="views" /><span>{views}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TextPost;