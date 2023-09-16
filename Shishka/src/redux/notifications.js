import { createSlice } from "@reduxjs/toolkit";
import { notificationsAPI } from "../API/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNotifications = createAsyncThunk("notifications/getNotifications", async ({url}, thunkAPI) => {
    try{
        const res = await notificationsAPI.getNotifications({url});

        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

let initialState = {
    loadingOfGet: false,
    notifications: null,
}

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getNotifications.pending, state => {
                state.loadingOfGet = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loadingOfGet = false;
                
            })
            .addCase(getNotifications.rejected, state => {
                state.loadingOfGet = false;
            })
    }
})

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;