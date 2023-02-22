import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import authSlice from "./authSlice";
import  transactionSlice  from "./transactionSlice";



export const store=configureStore({
    reducer: combineReducers({
        auth:authSlice,
        accounts:accountSlice,
        transactions:transactionSlice
    })
})