import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import eventReducer from './event.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
    },
    // devTools: true
});






