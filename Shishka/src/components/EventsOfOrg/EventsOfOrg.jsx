import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextPost from "../common/Post/TextPost/TextPost";
import { getEventsOfOrg } from "../../redux/events";
import eoo from "./EventsOfOrg.module.css";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { useNavigate } from "react-router-dom";
import PostOfOrg from "../common/Post/PostForOrg/PostOfOrg";

const EventsOfOrg = () => {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    const { events } = useSelector(state => state.event);
    const [listOfEvents, setListOfEvents] = useState([]);

    const dispatch = useDispatch();

    // решить проблему с events
    // Необходимая оптимизация: поменять запрос getEventsOfOrg на me;

    const handleClick = async (id) => {
        navigate(`/participantsOfEvent/${id}`);
    }

    useEffect(() => {
        const fetchEvents = async (id) => {
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
    
            try {
                const res = await dispatch(getEventsOfOrg({ id }));
                if (res.payload.status === 200) {
                    let arr = res?.payload?.data?.events;
                    let reverseArr = [...arr].reverse();
                    setListOfEvents(reverseArr.map((item, index) => {
                        const arrOfDate = item.dateOfAdd && item.dateOfAdd.split("-");
                        const year = arrOfDate?.[0];
                        const prevYear = index > 0 && reverseArr[index-1].dateOfAdd.split("-")?.[0];
                        const month = arrOfDate && months[+arrOfDate[1]-1];
                        const day = arrOfDate?.[2];

                        console.log(item);
                        
                        return <div className={eoo.post} onClick={() => {handleClick(item.id)}}>
                            {index > 0 ? (year !== prevYear && <h2 className={eoo.year}>{year}</h2>) : <h2 className={eoo.year}>{year}</h2>}
                            <PostOfOrg dateOfAdd={item.dateOfAdd}
                                title={item.name} 
                                eventId={item.id} 
                                views={item.view_count} 
                            />
                        </div>

                    }))
                }

            } catch (err) {
                console.log(err);
            }
        }

        if(user !== null) {
            fetchEvents(user.org?.id);
        }
    }, [user])

    return (
        <main>
            <div className="container">
                <h2 className={eoo.title}>
                    Events
                </h2>

                {listOfEvents}
            </div>
        </main>
    )
}

export default compose(WithAuthRedirect)(EventsOfOrg);