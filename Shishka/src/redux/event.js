import { createSlice } from "@reduxjs/toolkit";
import { eventAPI } from "../API/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getClickedEvent = createAsyncThunk("event/getClickedEvent", async (data, thunkAPI) => {
    const { id } = data;

    try {
        const res = await eventAPI.getClickedEvent({id});

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

export const sendTheEvent = createAsyncThunk("event/newPost", async (formData, thunkAPI) => {

    // const body = JSON.stringify({
    //     dateOfEnd, 
    //     dateOfStart,
    //     name, 
    //     numberOfVolunteers, 
    //     place, 
    //     text,
    //     organization,
    //     hours,
    //     image1, 
    //     image2,
    //     image3
    // })

    try {
        const res = await eventAPI.sendEvent(formData);

        if(res.status === 201) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }

})

export const sendTheParticipation = createAsyncThunk("event/partcipation", async ({linkOfUser, linkOfEvent, organization}, thunkAPI) => {
    
    const body = JSON.stringify({linkOfUser, linkOfEvent, organization});

    try{
        const res = await eventAPI.sendParticipation(body);
        if(res.status === 201) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response);
    }
})

export const acceptOfParticipant = createAsyncThunk("event/accept", async ({ dataOfUser }, thunkAPI) => {
    const body = JSON.stringify({dataOfUser});

    try {
        const res = await eventAPI.sendAccept(body);
        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error)
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const completeTheRecruitment = createAsyncThunk('event/completeRecruitment', async (data, thunkAPI) => {
    const { id } = data;
    try {
        const res = await eventAPI.sendComplete({id});
        console.log(res);
        // if(res.status === 200) {
        //     return res;
        // } else {
        //     const error = await res.text();
        //     return thunkAPI.rejectWithValue(error);
        // }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const rejectParticipant = createAsyncThunk("event/reject", async ({dataOfUser}, thunkAPI) => {
    const body = JSON.stringify({dataOfUser});

    try {
        const res = await eventAPI.sendReject(body);
        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
} )

export const acceptAllOfParticipant = createAsyncThunk("event/acceptAll", async ({event_pk, date}, thunkAPI) => {

    const body = JSON.stringify({event_pk, date});

    try {
        const res = await eventAPI.sendAcceptAll(body);
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

export const sendView = createAsyncThunk("event/sendView", async ({event, user}, thunkAPI) => {
    try {
        const res = await eventAPI.sendView({event, user});
        
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

export const sendLike = createAsyncThunk("event/sendLike", async({user, event}, thunkAPI) => {
    try {
        const res = await eventAPI.sendLike({event, user});

        if(res.status === 201) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }

    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const sendDeleteLike = createAsyncThunk("event/deleteLike", async({like_id}, thunkAPI) => {
    try {   
        
        const res = await eventAPI.sendDeleteLike({like_id});
        
        if(res.status === 204) {
            return res;
        } else {
            const error = res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

let initialState = {
    event: null,
    loadingOfEvent: false,
    loadingOfSending: false,
}

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
    
    },
    extraReducers: builder => {
        builder
        .addCase(sendTheParticipation.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(sendTheParticipation.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendTheParticipation.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendTheEvent.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(sendTheEvent.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendTheEvent.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(getClickedEvent.pending, state => {
            state.loadingOfEvent = true;
        })
        .addCase(getClickedEvent.fulfilled, (state, action) => {
            state.loadingOfEvent = false;
            state.event = action?.payload?.data;
        })
        .addCase(getClickedEvent.rejected, state => {
            state.loadingOfEvent = false;
        })
        .addCase(acceptOfParticipant.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(acceptOfParticipant.fulfilled, (state, action) => {
            state.loadingOfSending = false;
        })
        .addCase(acceptOfParticipant.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(rejectParticipant.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(rejectParticipant.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(rejectParticipant.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(completeTheRecruitment.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(completeTheRecruitment.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(completeTheRecruitment.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(acceptAllOfParticipant.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(acceptAllOfParticipant.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(acceptAllOfParticipant.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendView.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(sendView.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendView.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendLike.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(sendLike.fulfilled, (state, action) => {
            state.loadingOfSending = false;

        })
        .addCase(sendLike.rejected, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendDeleteLike.pending, state => {
            state.loadingOfSending = true;
        })
        .addCase(sendDeleteLike.fulfilled, state => {
            state.loadingOfSending = false;
        })
        .addCase(sendDeleteLike.rejected, state => {
            state.loadingOfSending = false;
        })
        
    }
})

export const {} = eventSlice.actions;
export default eventSlice.reducer;