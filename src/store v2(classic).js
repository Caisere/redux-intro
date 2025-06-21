import { createStore, combineReducers, applyMiddleware } from "redux"
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";




// creating a root store using the combineReducer function from "redux"
const rootStore = combineReducers({
    account: accountReducer,
    customer: customerReducer
})


const store = createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)));

export default store



