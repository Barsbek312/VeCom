import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileAPI } from "../API/API";


export const getProfileOrg = createAsyncThunk("profileOfOrg/getProfile", async ({id}, thunkAPI) => {
    try {
        const res = await profileAPI.getProfileOfOrg({id});

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

export const changeDescriptionOfVol = createAsyncThunk("profileOfVol/changeDescription", async ({id, description}, thunkAPI) => {
    const data = JSON.stringify(description);
    try {
        const res = await profileAPI.changeDescription({id, data});
        console.log(res);
        if(res.status === 200) {
            return res;
        } else {
            const error = res.text();
            return thunkAPI.rejectWithValue(error)
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const changeAvaOfVol = createAsyncThunk("profileOfVol/changeAvaOfVol", async ({id, avatar}, thunkAPI) => {
    // const image = avatar;
    // image.append("avatar", avatar);

    try {
        const res = await profileAPI.changeAva({id, avatar});

        if(res.status === 200) {
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
    loadingOfRequest: false,
    profile: null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getProfileOrg.pending, state => {
                state.loadingOfRequest = true;
            })
            .addCase(getProfileOrg.fulfilled, (state, action) => {
                state.loadingOfRequest = true;
                state.profile = action.payload.data;
            })
            .addCase(getProfileOrg.rejected, state => {
                state.loadingOfRequest = false;
            })
            .addCase(changeDescriptionOfVol.pending, state => {
                state.loadingOfRequest = true;
            })
            .addCase(changeDescriptionOfVol.fulfilled, state => {
                state.loadingOfRequest = false;
            })
            .addCase(changeDescriptionOfVol.rejected, state => {
                state.loadingOfRequest = false;
            })
            .addCase(changeAvaOfVol.pending, state => {
                state.loadingOfRequest = true;
            })
            .addCase(changeAvaOfVol.fulfilled, state => {
                state.loadingOfRequest = false;
            })
            .addCase(changeAvaOfVol.rejected, state => {
                state.loadingOfRequest = false;
            })
    }
})

export const {} = profileSlice.actions;
export default profileSlice.reducer;