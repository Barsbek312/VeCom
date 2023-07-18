import React from "react";
import p from "./RegularPost.module.css";
import "./SlidePost.css";
import Slider from "react-slick";
import Like from "./../../../../assets/images/post__icons/Like.svg";
import Comment from "./../../../../assets/images/post__icons/Comment.svg"
import Favorite from "./../../../../assets/images/post__icons/Favorites.svg";
import { NavLink } from "react-router-dom";

const RegularPost = ({isHome}) => {

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

    const arr = ["https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?cs=srgb&dl=pexels-jacob-colvin-1761279.jpg&fm=jpg", "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg", "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"];

    const listOfPostImg = arr.map(slide => {
        return (
            <div className={p.post__slide}>
                <img src={`${slide}`} alt="slide-post" />
            </div>
        );
    })

    return (
        <div className={p.post__wrapper}>
            <div className={p.post}>
                <div className={p.header}>
                    <div className={p.header__left}>
                        {isHome && <NavLink to='/profileOrg'>
                            <div className={p.ava}>
                                {/* <img src="" alt="club-ava" /> */}
                            </div>
                        </NavLink>}
                        {isHome && <div className={p.description__club}>
                            {isHome && <NavLink to="/profileOrg"><h2>Interact</h2></NavLink>}
                            <span className={p.post__date}>Март 12, 2023</span>
                        </div>}
                    </div>
                    <div className={p.header__right}>
                        {isHome && <button>Подписаться</button>}
                    </div>
                </div>
                <div className={p.post__body}>
                    <div className={p.post__images}>
                        <Slider {...settings}>
                            {listOfPostImg}
                        </Slider>
                    </div>
                    <div className={p.post__title}>
                        <NavLink to="/describePost">
                            <h3>Дебатному клубу КНУ уже 2 года, а значит пришло время для ежегодного турнира 2023.</h3>
                        </NavLink>
                    </div>
                </div>
                <div className={p.post__footer}>
                    <div className={p.footer__left}>
                        <ul className={p.footer__list}>
                            <li>
                                <button className={p.post__icon}>
                                    <img src={Like} alt="post-like" />
                                </button>
                            </li>
                            <li>
                                <button className={p.post__icon}>
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
                            {isHome && <NavLink to="/profileOrg"><h2>Interact</h2></NavLink>}
                            <span className={p.post__date}>Март 12, 2023</span>
                        </div>}
                        <div className={p.post__views}>
                            <img src="" alt="" />
                            <strong>14</strong>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegularPost;
