import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notificationAPI } from "../API/API";

export const getNotification = createAsyncThunk("notification/getNotification", async ({id}, thunkAPI) => {
    try {
        const res = await notificationAPI.getNotification({id});

        if(res.status === 200) {
            return res;
        } else{
            const error = await res.text();
            return thunkAPI.rejectWithValue(error); 
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

let initialState = {
    loadingOfGet: false,
    notification: null,
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getNotification.pending, state => {
                state.loadingOfGet = true;
            })
            .addCase(getNotification.fulfilled, (state, action) => {
                state.loadingOfGet = false;
                state.notification = action?.payload?.data;
            })
            .addCase(getNotification.rejected, state => {
                state.loadingOfGet = false;
            })

    }
})

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;