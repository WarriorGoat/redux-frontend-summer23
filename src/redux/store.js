import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"
import authReducer from "./authSlice"


export default configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer
    }
})