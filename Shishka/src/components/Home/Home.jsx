import React, { useEffect } from "react";
import h from "./Home.module.css";
import HomeSlider from "./HomeSlider/HomeSlider";
import RegularPost from "../common/Post/RegularPost/RegularPost";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEvents } from "../../redux/event";

const Home = () => {

    const dispatch = useDispatch();

    const {quantity, currentEvent} = useSelector(state => state.event);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10];

    const listOfPosts = arr.map(item => {
        return (
            <RegularPost isHome={true}/>
        )
    })

    useEffect(() => {
        dispatch(getEvents({quantity, currentEvent}))
    }, [])

    return (
        <main className="main">
            <div className="container">
                <h1 className={h.title}>Главная</h1>
                <HomeSlider />
            </div>
            <div className={h.posts__wrapper}>
                {listOfPosts}
            </div>
        </main>
    )
}

export default Home;