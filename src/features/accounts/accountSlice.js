import { createSlice } from "@reduxjs/toolkit"

// state for account initial value
const accountInitial = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
    error: false,
    conversionError: ''
}

const accountSlice = createSlice({
    name: "account",
    initialState: accountInitial,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        loan: { 
            //we have to prepare because our automatic generated action creator doesn't take more than one argument. so to pass more than one argument we have to prepare and return a payload with the arguments that are needed.
            prepare(amount, loanPurpose) {
                return {
                    payload: { 
                        amount, 
                        loanPurpose
                    }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return null;

                state.loan = action.payload.amount
                state.loanPurpose = action.payload.loanPurpose
                state.balance = state.balance + action.payload.amount
            }
        },
        payLoan(state) {
            state.balance -= state.loan
            state.loan = 0
            state.loanPurpose = ''
        },
        currencyConversion (state) {
            state.isLoading = true 
        }
    }
})

// console.log(accountSlice)


export const {withdraw, loan, payLoan, currencyConversion} = accountSlice.actions;

// using the thunk in redux toolkit is very simple, we just have to pass in our async function, or use the createAsyncThunk function, which is a bit complex. but we will be using the first approach here. 

export function deposit(amount, currency) { 
    if (currency === 'USD')return {
        type: 'account/deposit',
        payload: amount
    }

    //https://api.frankfurter.app/latest?from=USD&to=EUR
    return async function (dispatch, getState) {
        dispatch({type: 'account/currencyConversion'})
        try {
            const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
            if(!response.ok) {
                dispatch({ type: "currency/conversionError" });
            }
            const data = await response.json()
            const convertedValue = data?.rates.USD
            // dispatch action
            dispatch({type: 'account/deposit', payload: convertedValue})
        } catch(err) {
            console.log(err)
        }
    }
}


export default accountSlice.reducer


// the accountReducer function
// export default function accountReducer(state = accountInitialValues, action) {
//     switch (action.type) {
//         case 'account/deposit':
//             return {
//                 ...state, 
//                 balance: state.balance + action.payload,
//                 isLoading: false
//             }
//         case 'account/withdraw':
//             return {
//                 ...state, 
//                 balance: state.balance - action.payload
//             }
//         case 'account/loan': 
//             if (state.loan > 0) return state
//             return {
//                 ...state, 
//                 loan: action.payload.amount, 
//                 balance: state.balance + action.payload.amount, 
//                 loanPurpose: action.payload.loanPurpose
//             }
//         case 'account/payLoan':
//             return {
//                 ...state, 
//                 loan: 0, 
//                 oanPurpose: '', 
//                 balance: state.balance - state.loan
//             }
//         case 'currency/conversion': 
//             return {
//                 ...state, isLoading: true
//             }
//         case 'currency/conversionError': 
//             return {
//                 ...state, 
//                 error: true, 
//                 conversionError: 'Error converting currency'
//             }
//         default: {
//             return state
//         }
//     }
// }

// // deposit action creator function
// function deposit(amount, currency) { 
//     if (currency === 'USD')return {
//         type: 'account/deposit',
//         payload: amount
//     }

//     //https://api.frankfurter.app/latest?from=USD&to=EUR
//     return async function (dispatch, getState) {
//         dispatch({type: 'currency/conversion'})
//         try {
//             const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//             if(!response.ok) {
//                 dispatch({ type: "currency/conversionError" });
//             }
//             const data = await response.json()
//             const convertedValue = data?.rates.USD
//             // dispatch action
//             dispatch({type: 'account/deposit', payload: convertedValue})
//         } catch(err) {
//             console.log(err)
//         }
//     }
// }

// // withdraw action creator function
// function withdraw(amount) {
//     return {
//         type: 'account/withdraw',
//         payload: amount
//     }
// }

// // loan action creator function
// function loan(amount, purpose) {
//     return {
//         type: 'account/loan',
//         payload: {
//             amount: amount,
//             loanPurpose: purpose
//         }
//     }
// }

// // payLoan action creator function
// function payLoan() {
//     return {
//         type: 'account/payLoan'
//     }
// }

// export {
//     deposit, 
//     withdraw, 
//     loan, 
//     payLoan
// }