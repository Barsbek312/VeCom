import React from 'react';
import r from './Rating.module.css';
import RatingItem from './RatingItem/RatingItem';
import Nothing from '../common/Nothing/Nothing';

const Rating = () => {
    const arr = [1, 2, 3, 4, 5];

    const list = arr.map((item, index) => (
        <RatingItem pos={index + 1} points={item * 100} />
    ));

    return (
        <main>
            <div className={"container"}>
                <div className={r.header}>
                    <h2>Рейтинг</h2>

                </div>
                <div className={r.main}>
                    {list.length ? list : <Nothing />}
                </div>
            </div>
        </main>
    )
}

export default Rating;