import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { useDispatch, useSelector } from "react-redux";
import { getClickedEvent, rejectParticipant } from "../../redux/event";
import { useParams } from "react-router-dom";
import pof from "./ParticipantsOfEvent.module.css";
import Participants from "./Participants/Participants";
import { acceptOfParticipant } from "../../redux/event";
import { completeTheRecruitment } from "../../redux/event";
import LoadingOnParticipants from "../common/LoadingOnParticipants/LoadingOnParticipants";
import { acceptAllOfParticipant } from "../../redux/event";

const ParticipantsOfEvent = () => {

    const [callFuncCounter, setCallFuncCounter] = useState(0);
    const [participants, setParticipants] = useState(null);
    const [lengthOfParticipants, setLengthOfParticipants] = useState(null);
    const { event, loadingOfEvent, loadingOfSending } = useSelector(state => state.event);

    const dispatch = useDispatch();
    const params = useParams();

    const handleClickAccept = async ({ dataOfUser }) => {

        const res = await dispatch(acceptOfParticipant({ dataOfUser }));
        setCallFuncCounter(prevCount => prevCount + 1);

    }

    const handleClickReject = async ({ dataOfUser }) => {

        const res = await dispatch(rejectParticipant({ dataOfUser }));
        setCallFuncCounter(prevCount => prevCount + 1);
    }

    const handleClickAcceptAll = async (event_pk) => {
        const date = new Date().toISOString();
        const res = await dispatch(acceptAllOfParticipant({ event_pk, date }));
        setCallFuncCounter(prevCount => prevCount + 1);
        console.log(res);
    }

    const handleClickComplete = async (id) => {
        const res = await dispatch(completeTheRecruitment({ id }))
        console.log(res);
    }

    useEffect(() => {
        if (event !== null) {

            const waitingParticipants = event && event?.waitingForParticipation;
            const acceptingParticipants = event && event?.participationInEvent;
            const urlOfOrg = event && event?.organization;
            const arr = waitingParticipants.concat(acceptingParticipants);
            const lengthOfwaitingParticipants = waitingParticipants.length;

            setParticipants(
                arr
                    .map((item, index) => {
                        const data = JSON.parse(JSON.stringify(item));
                        data.organization = urlOfOrg;

                        delete data.first_name;
                        delete data.url;
                        delete data.id;
                        delete data.username;

                        data.read = false;
                        data.date = new Date().toISOString();

                        if (index < lengthOfwaitingParticipants) return <Participants dataOfUser={data} url={item.url} name={item.first_name} isAccept={false} onClickAccept={handleClickAccept} onClickReject={handleClickReject} />
                        return <Participants dataOfUser={data} name={item.first_name} isAccept={true} onClickReject={handleClickReject} url={item.url} />
                    }).reverse()
            );

        }
    }, [event]);

    const fetchEvent = async (id) => {
        await dispatch(getClickedEvent({ id }));
    }

    useEffect(() => {
        fetchEvent(params.id);
    }, [callFuncCounter])


    return (
        <main>
            <LoadingOnParticipants />
            <div className={`${pof.container__wrapper} container`}>
                <h2 className={pof.title}>Кандидаты</h2>

                <div className={pof.main}>
                    <div className={pof.header}>
                        <span>участники: {participants?.length}</span>
                    </div>
                    <div className={pof.main__posts}>
                        {participants}
                    </div>
                    {participants?.length > 0 && <div className={pof.footer}>
                        <span onClick={() => { handleClickAcceptAll(event?.id) }}>принять всех</span>
                    </div>}
                </div>
                <div className={pof.end}>
                    <button className={pof.end__button} onClick={() => { handleClickComplete(event?.id) }}>Завершить набор</button>
                </div>
            </div>
        </main>
    )
}

export default compose(WithAuthRedirect)(ParticipantsOfEvent);

