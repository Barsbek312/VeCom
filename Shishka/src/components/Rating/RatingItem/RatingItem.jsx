import React from "react";
import ri from "./RatingItem.module.css";

const RatingItem = ({pos, points}) => {
    return (
        <div className={ri.rating__item}>
            <div className={ri.rating__item__left}>
                <div className={ri.rating__item__left__number}>
                    <span>{pos}</span>
                </div>
                <div className={ri.rating__item__left__ava + " " + ri.not_picture}>
                    {/* <img src="" alt="ava" /> */}
                </div>
                <div className={ri.rating__item__left__name}>
                    <h3>Иванов Иван</h3>
                </div>
            </div>
            <div className={ri.rating__item__right}>
                <div className={ri.rating__item__right__points}>
                    <span>{points}ч</span>
                </div>
            </div>
        </div>
    )
}

export default RatingItem;