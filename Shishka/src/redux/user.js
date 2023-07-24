import { authAPI } from "../API/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk("users/register", async (data, thunkAPI) => {

    const body = JSON.stringify(data);

    try{
        const res = await authAPI.register(body);
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

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
    const body = JSON.stringify(user);

    try{
        const res = await authAPI.login(body);
        if(res.status === 200) {
            const {dispatch} = thunkAPI;
            dispatch(getUser());
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }  
    
})

const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
    try{
        const res = await authAPI.me();

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

export const checkAuth = createAsyncThunk("users/verify", async (_, thunkAPI) => {

    try{
        const res = await authAPI.verify();
        
        if(res.status === 200) {
            const {dispatch} = thunkAPI;
            dispatch(getUser());
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }  
})

export const activate = createAsyncThunk("users/activation", async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try{
        const res = await authAPI.activate(body);
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

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {

    try{
        const res = await authAPI.logout();
        
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
    user: null,
    loading: false,
    registered: false,
    activated: false,
    isAuth: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, state => {
                state.loading = false;
            })
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(login.rejected, state => {
                state.loading = false;
            })
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(getUser.rejected, state => {
                state.loading = false;
            })
            .addCase(checkAuth.pending, state => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, state => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(checkAuth.rejected, state => {
                state.loading = false;
            })
            .addCase(activate.pending, state => {
                state.loading = true;
            })
            .addCase(activate.fulfilled, state => {
                state.loading = false;
                state.activated = true;
            })
            .addCase(activate.rejected, state => {
                state.loading = false;
            })
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(logout.rejected, state => {
                state.loading = false;
            });
    }
})

export const {resetRegistered} = userSlice.actions;
export default userSlice.reducer;