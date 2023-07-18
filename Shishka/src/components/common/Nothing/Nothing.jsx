import React from 'react';
import nothing from './../../../assets/images/common__images/nothing.svg';
import n from './Nothing.module.css';

const Nothing = () => {
    return (
        <div className={n.block}>
            <h2 className={n.title}>Пока ничего нет</h2>
            <div className={n.img__wrapper}>
                <img src={nothing} alt="there is nothing" />
            </div>
        </div>
    )
}

export default Nothing;