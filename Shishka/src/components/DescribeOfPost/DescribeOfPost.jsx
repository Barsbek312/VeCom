import React, { useEffect, useState } from "react";
import DOP from './DescribeOfPost.module.css'
import { useDispatch, useSelector } from "react-redux";
import { sendTheParticipation } from './../../redux/event';
import { useParams } from "react-router-dom";
import { getClickedEvent } from "./../../redux/event";
import IsSuccess from "../common/IsSuccess/IsSuccess";
import ModalWindow from "../common/ModalWindow/ModalWindow";
import Slider from "react-slick";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const DescribeOfPost = () => {

    const dispatch = useDispatch();

    const params = useParams();

    const [notification, setNotification] = useState(null);
    const [isShowAccepting, setIsShowAccepting] = useState(false);
    const [listOfImg, setListOfImg] = useState(null);
    const [sliderList, setSliderList] = useState(null);

    const { event, loadingOfSending } = useSelector(state => state.event);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        const fetchEvent = async () => {
            const id = params.id;
            const res = await dispatch(getClickedEvent({ id }));
        };

        fetchEvent();
    }, []);

    const handleClick = async (idEvent, idUser, linkOrganization) => {
        const linkOfUser = `http://127.0.0.1:8000/users/${idUser}/`;
        const linkOfEvent = `http://127.0.0.1:8000/events/${idEvent}/`;
        const organization = `${linkOrganization}`;

        const res = await dispatch(sendTheParticipation({ linkOfUser, linkOfEvent, organization }));
        if (res?.payload?.status === 201) {
            setNotification({ message: 'Successfully sent!', success: true });
        } else {
            setNotification({ message: 'Error sending!', success: false });
        }
        // Проблема: Надо добавить уведомление об успешной или неуспешной отправке
    }

    useEffect(() => {
        if (notification && notification.success !== null) {
            setTimeout(() => {
                setNotification(null);
            }, 1500);
        }
    }, [notification]);

    const settings = {
        customPaging: function (i) {
            return (
                <div className={`${DOP.pagging}`}></div>
            );
        },
        dots: true,
        dotsClass: `slick-dots slick-thumb`,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }


    useEffect(() => {
        setListOfImg([event?.image1, event?.image2, event?.image3]);
    }, [event])

    useEffect(() => {
        setSliderList(listOfImg && listOfImg.map(slide => {
            if (slide !== null) {
                return (
                    <div className={DOP.post__slide}>
                        <img src={`${slide}`} alt="slide-post" />
                    </div>
                );
            }
        }))
    }, [listOfImg])

    return (
        <main>
            <div className="container">
                <div className={DOP.describe__body}>
                    {isShowAccepting && (
                        <ModalWindow setIsShowAccepting={setIsShowAccepting} acceptFunc={handleClick} params={[params?.id, user?.id, event?.organization]}/>
                    )}
                    {notification && (
                        <IsSuccess message={notification.message} success={notification.success} />
                    )}
                    <div className={DOP.describe__images}>
                        {/* <img src="https://vsevishivki.ru/data/items/a2cbb5edf1fee6e292e0cfac6be3751a.jpg" alt="#" /> */}
                        <Slider {...settings}>
                            {sliderList}
                        </Slider>
                    </div>
                    <div className={DOP.describe__title}>
                        <h3>{event && event.name}</h3>
                    </div>
                    <div className={DOP.describe__of_post}>
                        <h2>
                            {event && event.text}
                        </h2>
                    </div>
                    <div className={DOP.describe__button}>
                        {event?.recruitmentСompleted ? <button disabled>The set is closed</button> : loadingOfSending ?
                            <button disabled style={{ background: "#333333CC" }}>A little patience😙</button> :
                            <button type="submit" onClick={() => { setIsShowAccepting(true) }}>Submit an application</button>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default compose(WithAuthRedirect)(DescribeOfPost)