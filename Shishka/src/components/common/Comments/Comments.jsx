import React from "react";
import c from "./Comments.module.css";

const Comments = (countOfComments=948) => {
    return (
        <div className={c.comments__wrapper}>
            <div className={c.container}>
                <div className={c.comments__nav}>
                    <span></span>
                </div>
                <div className={c.comments__header}>
                    <h3>Комментарий</h3>
                    <span>{`(${948})`}</span>
                </div>
            </div>
        </div>
    )
}

export default Comments;