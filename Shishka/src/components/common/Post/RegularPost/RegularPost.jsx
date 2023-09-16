import React, { useEffect, useRef, useState } from "react";
import p from "./RegularPost.module.css";
import "./SlidePost.css";
import Slider from "react-slick";
import Like from "./../../../../assets/images/post__icons/Like.svg";
import Comment from "./../../../../assets/images/post__icons/Comment.svg"
import Favorite from "./../../../../assets/images/post__icons/Favorites.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { sendLike, sendView } from "../../../../redux/event";
import { useDispatch, useSelector } from "react-redux";
import { sendDeleteLike } from "../../../../redux/event";
import { changeLikeIdInEvents } from "../../../../redux/events";
import { gsap } from 'gsap';


const RegularPost = ({ isHome, dateOfAdd = "", nameOfOrg, title, eventId, imagesUrl, views, checkOfLike = false, like_id, orgUrl, setHandleClickOnUnauth=()=>{} }) => {

    const [isLike, setIsLike] = useState(checkOfLike);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const { user, isAuth } = useSelector(state => state.user);
    const likeEl = useRef(null);

    const arrOfDate = dateOfAdd && dateOfAdd.split("-");
    const year = arrOfDate?.[0];
    const month = arrOfDate && months[+arrOfDate[1] - 1];
    const day = arrOfDate?.[2];

    const handleClickOnPost = async (user, eventId, isAuth) => {
        if(!isAuth) {
            setHandleClickOnUnauth(true);
            return 0;
        }

        navigate(`/describePost/${eventId}`);
        
        const res = await dispatch(sendView({ user, event: `http://127.0.0.1:8000/events/${eventId}/` }));
    }

    const handleClickOnLike = async (user, eventId, like_id, isAuth) => {
        if(!isAuth) {
            setHandleClickOnUnauth(true);
            return 0;
        }

        if (!isLike) {
            const res = await dispatch(sendLike({ user, event: `http://127.0.0.1:8000/events/${eventId}/` }));

            if (res?.payload?.status === 201) {
                const likeId = res?.payload?.data?.id;
                dispatch(changeLikeIdInEvents({ eventId, likeId }))
            }
        }
        else {
            const res = await dispatch(sendDeleteLike({ like_id }));
        }
        setIsLike(prev => !prev);
        if(isLike) {
            gsap.fromTo(likeEl.current, {
                '--hand-rotate': 8
            }, 
            {
                ease: 'none',
                keyframes: [{
                    '--hand-rotate': -45,
                    duration: .16,
                    ease: 'none'
                }, {
                    '--hand-rotate': 15,
                    duration: .12,
                    ease: 'none'
                }, {
                    '--hand-rotate': 0,
                    duration: .2,
                    ease: 'none',
                    clearProps: true
                }]
            });
        }
    }

    const handleClickComment = async () => {

    }


    const settings = {
        customPaging: function (i) {
            return (
                <div className={`${p.pagging}`}></div>
            );
        },
        dots: true,
        dotsClass: `slick-dots slick-thumb`,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const listOfPostImg = imagesUrl && imagesUrl.map(slide => {
        if (slide !== null) {
            return (
                <div className={p.post__slide}>
                    <img src={`${slide}`} alt="slide-post" />
                </div>
            );
        }
    })

    return (
        <div className={p.post__wrapper}>
            <div className={p.post}>
                <div className={p.header}>
                    <div className={p.header__left}>
                        {isHome && <NavLink to={`/profileOrg/${orgUrl?.[orgUrl.length-2]}`}>
                            <div className={p.ava}>
                                {/* <img src="" alt="club-ava" /> */}
                            </div>
                        </NavLink>}
                        {isHome && <div className={p.description__club}>
                            {isHome && <NavLink to={`/profileOrg/${orgUrl?.[orgUrl.length-2]}`}><h2>{nameOfOrg}</h2></NavLink>}
                            <span className={p.post__date}>{month} {day}, {year}</span>
                        </div>}
                    </div>
                    <div className={p.header__right}>
                        {/* временное комментирование  */}
                        {/* {isHome && <button>Подписаться</button>} */}
                        {/* временное комментирование  */}
                    </div>
                </div>
                <div className={p.post__body}>
                    <div className={p.post__images}>
                        <Slider {...settings}>
                            {listOfPostImg}
                        </Slider>
                    </div>
                    <div className={p.post__title}>
                        <a onClick={() => { handleClickOnPost(user?.url, eventId, isAuth) }}>
                            <h3>{title}</h3>
                        </a>
                    </div>
                </div>
                <div className={p.post__footer}>
                    <div className={p.footer__left}>
                        <ul className={p.footer__list}>
                            <li>
                                <button className={`${p.post__icon} ${p.like} ${isLike && p.liked}`} onClick={() => { handleClickOnLike(user?.url, eventId, like_id, isAuth) }} ref={likeEl}>
                                    <div className={p.hand}>
                                        <div className={p.thumb}></div>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button className={p.post__icon} onClick={() => { handleClickComment() }}>
                                    <img src={Comment} alt="post-comment" />
                                </button>
                            </li>
                            <li>
                                <button className={p.post__icon}>
                                    <img src={Favorite} alt="post-favorite" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={p.footer__right}>
                        {isHome || <div className={p.description__club}>
                            <span className={p.post__date}>{month} {day}, {year}</span>
                        </div>}
                        <div className={p.post__views}>
                            <strong>{views}</strong>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegularPost;
