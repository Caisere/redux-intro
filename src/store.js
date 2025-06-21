// import { createStore, combineReducers, applyMiddleware } from "redux"
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";


// Move from classic redux to Redux Toolkit
const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})


export default store



