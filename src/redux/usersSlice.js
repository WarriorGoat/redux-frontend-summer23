import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../lib/Axios";
import { authSuccess } from "./authSlice";

//thunk middleware
//createAsyncThunk, first parameter is the action.type, then the function
// the function takes in the payload data from the dispatch
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payloadData) => {
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
      localStorage.setItem("jwtToken", response.data.token);
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
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...action.payload,
        password: "",
      };
    },
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
        };
      })
      .addCase(registerUser.rejected, () => {
        console.log("-----registerUser Error!!-------");
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(action.payload)

        state.firstname = action.payload.user.firstname;
        state.lastname = action.payload.user.lastname;
        state.email = action.payload.user.email;
        state.message = action.payload.message;
        state.password = "";
      })
      .addCase(signin.rejected, (state, action) => {
        state.message = action.payload.data.message;
      });
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
