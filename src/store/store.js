import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import authSlice from "./authSlice";



export const store=configureStore({
    reducer: combineReducers({
        auth:authSlice,
        accounts:accountSlice
    })
})