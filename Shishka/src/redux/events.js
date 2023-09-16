import { eventsAPI } from "../API/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEventsInHome = createAsyncThunk("events/getEventsInHome", async (data, thunkAPI) => {
    const {pageSize, currentEvent} = data;
    
    try{
        const res = await eventsAPI.getEventsInHome({pageSize, currentEvent});

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

export const getEventsOfOrg = createAsyncThunk("events/getEventsOfOrg", async (data, thunkAPI) => {
    const { id } = data;

    try {
        const res = await eventsAPI.getEventsOfOrg({id});

        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})



let initialState = {
    events: null,
    loadingOfEvent: false,
    pageSize: 8,
    count: 0,
    currentEvent: 1,
    loadingOfSending: false,
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        changeLikeIdInEvents: (state, action) => {
            const event = state.events.find(item => item.id === action?.payload?.eventId);
            event.like_id = action?.payload?.likeId;
        }
    },
    extraReducers: builder => {
        builder 
            .addCase(getEventsInHome.pending, state => {
                state.loadingOfEvent = true;
            })
            .addCase(getEventsInHome.fulfilled, (state, action) => {
                state.loadingOfEvent = false;
                state.events = action?.payload?.data?.results;
                state.count = action?.payload?.data?.count;
            })
            .addCase(getEventsInHome.rejected, state => {
                state.loadingOfEvent = false;
            })
            .addCase(getEventsOfOrg.pending, state => {
                state.loadingOfEvent = true;
            })
            .addCase(getEventsOfOrg.fulfilled, (state, action) => {
                state.loadingOfEvent = false;
                state.events = action?.payload?.data?.events;
                state.count = action?.payload?.data?.events?.length;
            })  
            .addCase(getEventsOfOrg.rejected, state => {
                state.loadingOfEvent = false;
            })
    }
})

export const {changeLikeIdInEvents} = eventsSlice.actions;
export default eventsSlice.reducer;