import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../lib/Axios";
import { authSuccess } from "./authSlice";

//thunk middleware
//createAsyncThunk, first parameter is the action.type, then the function
// the function takes in the payload data from the dispatch
//registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payloadData) => {
    //call the API/backend
    let response = await Axios.post("/users/register", payloadData);
    return response.data;
  }
);

//signin
export const signin = createAsyncThunk(
  "user/signin",
  async (userData, thunkAPI) => {
    try {
      let response = await Axios.post("/users/signin", userData);
      //see if remember me box is checked

      //   userData.isRemember &&
      localStorage.setItem("jwtToken", response.data.token);
      //dispatch authSuccess with Thunk API
      thunkAPI.dispatch(authSuccess());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    message: "",
    status: null,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...action.payload,
        password: "",
      };
    },
    resetStatus:(state)=>{
        state.status='null'
    },
    resetUser: (state)=>{
        return {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            message: 'User Logged Out!',
            status: null
        }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        // whole state replacement, use a return
        // return {
        //     email: action.payload.userObj.email,
        //     password: '',
        //     firstname: action.payload.userObj.firstname,
        //     lastname: action.payload.userObj.lastname,
        //     message: action.payload.data.message
        // }
        // modifying the state directly, use =
        //state.firstname=action.payload.firstname,
        //state.lastname=action.payload.lastname,
        //state.email=action.payload.email,
        //state.password=""
        //
        return {
          ...action.payload,
          password: "",
          status: "fulfilled",
        };
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(registerUser.rejected, (state) => {
        console.log("-----registerUser Error!!-------");
        state.status = "rejected";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.firstname = action.payload.user.firstname;
        state.lastname = action.payload.user.lastname;
        state.email = action.payload.user.email;
        state.message = action.payload.message;
        state.password = "";
        state.status = "fulfilled";
      })
      .addCase(signin.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signin.rejected, (state, action) => {
        state.message = action.payload.data.message;
        state.status = "rejected";
      })
  },
});

export const { setUser, resetStatus, resetUser } = usersSlice.actions;

export default usersSlice.reducer;
