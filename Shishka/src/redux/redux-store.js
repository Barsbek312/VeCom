import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import eventsReducer from './events';
import eventReducer from './event';
import notificationReducer from "./notification";
import notificationsReducer from "./notifications";
import profileReducer from "./profile";

export const store = configureStore({
    reducer: {
        user: userReducer,
        events: eventsReducer,
        event: eventReducer,
        notifications: notificationsReducer,
        notification: notificationReducer,
        profile: profileReducer,
    },
    // devTools: true
});






