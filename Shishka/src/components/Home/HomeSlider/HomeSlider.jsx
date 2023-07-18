import React from "react";
import hs from "./HomeSlider.module.css";

const HomeSlider = () => {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const listOfSubscr = arr.map(item => {
        return(
            <li>
                <a>Все </a>
            </li>
        )
    })

    return (
        <ul className={hs.subscriptions}>
            {listOfSubscr}
        </ul>
    );
}

export default HomeSlider;