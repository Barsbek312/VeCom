import { eventAPI } from "../API/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getEvents = createAsyncThunk("event/getEvents", async (data, thunkAPI) => {
    const {quantity, currentEvent} = data;
    
    try{
        const res = await eventAPI.getEvents({quantity, currentEvent});

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

export const sendTheParticipation = createAsyncThunk("event/partcipation", async ({}, thunkAPI) => {
    
    const body = JSON.stringify({});

    try{
        const res = await eventAPI.sendParticipation(body);
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
    events: null,
    loadingOfEvent: false,
    quantity: 8,
    currentEvent: 1,
    loadingOfSending: false,
}

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder 
            .addCase(getEvents.pending, state => {
                state.loading = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload.data;
            })
            .addCase(getEvents.rejected, state => {
                state.loading = false;
            })
            .addCase(sendTheParticipation.pending, state => {
                state.loadingOfSending = false;
            })
            .addCase(sendTheParticipation.fulfilled, state => {
                state.loadingOfSending = true;
            })
            .addCase(sendTheParticipation.rejected, state => {
                state.loadingOfSending = false;
            })
    }
})

export const {} = eventSlice.actions;
export default eventSlice.reducer;