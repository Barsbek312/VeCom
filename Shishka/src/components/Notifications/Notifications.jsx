import React, { useEffect, useState } from "react";
import ns from './Notifications.module.css';
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification/Notification";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import Placeholder from "../common/Placeholder/Placeholder";
import ContentLoaderInNotifications from './../common/ContentLoaderInNotifications/ContentLoaderInNotifications';

const Notifications = () => {
    const { user, loading } = useSelector(state => state.user);
    const [arr, setArr] = useState([]);
    const [listOfArr, setListOfArr] = useState([]);

    useEffect(() => {
        if (user !== null) {
            const acceptedUsers = user.user_in_event ? user.user_in_event : [];
            const rejectedUsers = user.rejectence_in_event ? user.rejectence_in_event : [];
            const allArr = acceptedUsers.concat(rejectedUsers);
            
            setArr(allArr);
            const lengthAccepted = acceptedUsers.length;

            const mappedList = allArr.map((item, index) => {
                if (index < lengthAccepted) {
                    return <div className={ns.container_of_notification}><Notification isAccepted={true} nameOfOrg={item.first_name} isPopUp={false} /></div>;
                }
                return <div className={ns.container_of_notification}><Notification isAccepted={false} nameOfOrg={item.first_name} isPopUp={false} /></div>;
            });

            setListOfArr(mappedList);
        }
    }, [user]);


    useEffect(() => {
        if(loading) {
            setListOfArr([1, 2 , 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                return <div className={ns.wrapper__loader}><ContentLoaderInNotifications /></div>
            }))
        }
    }, [loading])
    
    
    return (
        <main>
            <div className="container">
                <h2 className={ns.title}>Notifications</h2>
                <div className={ns.main}>
                    {listOfArr}
                </div>
            </div>
        </main>
    )
}


export default compose(WithAuthRedirect)(Notifications);