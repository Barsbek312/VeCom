import React from "react";
import poo from './PostOfOrg.module.css';
import { NavLink } from "react-router-dom"; 
import views2 from "./../../../../assets/images/post__icons/views_2.svg";
import calendar from "./../../../../assets/images/post__icons/date_of_adding_post.svg";

const PostOfOrg = ({title, dateOfAdd, views, eventId}) => {

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

    const arrOfDate = dateOfAdd && dateOfAdd.split("-");
    const year = arrOfDate?.[0];
    const month = arrOfDate && months[+arrOfDate[1] - 1];
    const day = arrOfDate?.[2];

    return (
        <div className={poo.post}>
            <div className={poo.left}>
                <NavLink to={`/describePost/${eventId}`}>
                    <h2>
                        {title}
                    </h2>
                </NavLink>
            </div>
            <div className={poo.right}>
                <ul>
                    <li>
                        <img src={views2} alt="views" />
                        <span>{views}</span>
                    </li>
                    <li>
                        <img src={calendar} alt="calendar" />
                        <span>{day}.{month}</span>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default PostOfOrg;