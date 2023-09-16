import React, { useEffect, useState } from "react";
import h from "./Home.module.css";
import HomeSlider from "./HomeSlider/HomeSlider";
import RegularPost from "../common/Post/RegularPost/RegularPost";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEventsInHome } from "../../redux/events";
import ContentLoader from "react-content-loader";
import Nothing from "../common/Nothing/Nothing";
import TextPost from "../common/Post/TextPost/TextPost";
import Comments from "../common/Comments/Comments";
import ModalWindow from "../common/ModalWindow/ModalWindow";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pageSize, currentEvent, loadingOfEvent, count, events } = useSelector(state => state.events);
    const [listOfPosts, setListOfPosts] = useState([]);
    const [handleClickOnUnauth, setHandleClickOnUnauth] = useState(false);

    const fetchData = async () => {

        try {
            const res = await dispatch(getEventsInHome({ pageSize, currentEvent }));
        
        } catch (err) {

            console.error(err);
        
        }
    };

    useEffect(() => {
        if(events !== null) {
            setListOfPosts(events.map(item => {
                let eventImage;
                if(!item.image1 && !item.image2 && !item.image3) {
                    eventImage = [];    
                } else {
                    eventImage = [item.image1, item.image2, item.image3];
                }
                return (
                    eventImage.length > 0 ? 
                    <div>
                        <RegularPost isHome={true}
                                dateOfAdd={item.dateOfAdd} 
                                nameOfOrg={item.nameOfOrg} 
                                title={item.name} 
                                eventId={item.id} 
                                imagesUrl={eventImage} 
                                views={item.view_count}
                                checkOfLike={item.liked_by_user}
                                like_id={item.like_id} 
                                orgUrl={item.organization}
                                setHandleClickOnUnauth={setHandleClickOnUnauth}/>
                    </div>
                    :
                    <div>
                        <TextPost dateOfAdd={item.dateOfAdd} 
                        title={item.name} 
                        nameOfOrg={item.nameOfOrg} 
                        views={item.view_count} 
                        eventId={item.id} 
                        checkOfLike={item.liked_by_user}
                        like_id={item.like_id}
                        orgUrl={item.organization}/>
                    </div>
                )
            }));
        }
    }, [events])

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(loadingOfEvent) {
            setListOfPosts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => <div className={h.loader__wrapper}><ContentLoader /></div>))
        } else if(!loadingOfEvent && !count) {
            setListOfPosts([]);
        }
    }, [loadingOfEvent, count])



    return (
        <main className="main">
            {/* <Comments /> */}
            <div className="container">
                {handleClickOnUnauth && <ModalWindow text={"Войдите в аккаунт, чтобы совершить действие"} acceptFunc={() => {navigate("/entrance")}} setIsShowAccepting={setHandleClickOnUnauth} btnText="Войти"/>}
                <h1 className={h.title}>Главная</h1>
                {/* временное комментирование  */}
                {/* <HomeSlider /> */}
                {/* временное комментирование  */}
            </div>
            <div className={h.posts__wrapper}>
                {listOfPosts.length > 0 ? listOfPosts : <Nothing />}
            </div>
        </main>
    )
}

export default Home;