import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../lib/Axios";
import { checkAuthToken } from "../lib/checkAuthToken"
import { setUser, resetUser } from "./usersSlice";


export const logout = createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
    await localStorage.removeItem('jwtToken')
    thunkAPI.dispatch(resetUser())
})

export const authCheck = createAsyncThunk('auth/authCheck', async(_, thunkAPI)=>{
    try{
        checkAuthToken()
        let response = Axios.post('/users/authtoken')
        console.log(response.data)
        thunkAPI.dispatch(setUser(response.data))
        return response.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response)

    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuth: false
    },
    reducers: {
        authSuccess: (state)=>{state.isAuth=true },
        authFailure: (state)=>{state.isAuth=false},
    },
    extraReducers: builder=> {
        builder
            .addCase(authCheck.fulfilled, (state)=>{
                state.isAuth=true
            })
            .addCase(authCheck.rejected, (state, action)=>{
                state.isAuth=false
                console.log("------Auth Check------")
                console.log(action.payload)
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.isAuth=false
            })
    }
})
export const {authSuccess, authFailure}=authSlice.actions
export default authSlice.reducer