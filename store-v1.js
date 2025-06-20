import { createStore, combineReducers } from "redux"


// state for account initial value
const accountInitialValues = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
}

// state for customer initial values
const customerInitialValues = {
    fullName: '',
    nationalID: '',
    createdAt: '',
    // editedAt: ''
}

// the accountReducer function
function accountReducer(state = accountInitialValues, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state, balance: state.balance + action.payload
            }
        case 'account/withdraw':
            return {
                ...state, balance: state.balance - action.payload
            }
        case 'account/loan': 
            if (state.loan > 0) return state
            return {
                ...state, loan: action.payload.amount, balance: state.balance +action.payload.amount, loanPurpose: action.payload.loanPurpose
            }
        case 'account/payLoan':
            return {
                ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan
            }
        default: {
            return state
        }
    }
}

// the customerReducer function 
function customerReducer(state = customerInitialValues, action) {
    switch(action.type) {
        case 'customer/customerCreation':
            return {
                ...state, 
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalId,
                createdAt: action.payload.createdAt,
                // editedAt: action.payload.createdAt
            }
        case 'customer/customerDetailUpdate':
            return {
                ...state, fullName: action.payload
            }
        default: {
            return state
        }
    }
}


// store.dispatch({type: 'account/deposit', payload: 500})
// store.dispatch({type: 'account/withdraw', payload: 200})
// store.dispatch({type: 'account/loan', payload: {amount: 1000, loanPurpose: 'Buy a cheep car' }})
// store.dispatch({type: 'account/payLoan'})

// we can have action creator function instead of dynamically updating the dispatch like we did up here.
// each action will have it own action creator function.

// deposit action creator function
function deposit(amount) {
    return {
        type: 'account/deposit',
        payload: amount
    }
}

// withdraw action creator function
function withdraw(amount) {
    return {
        type: 'account/withdraw',
        payload: amount
    }
}

// loan action creator function
function loan(amount, purpose) {
    return {
        type: 'account/loan',
        payload: {
            amount: amount,
            loanPurpose: purpose
        }
    }
}

// payLoan action creator function
function payLoan() {
    return {
        type: 'account/payLoan'
    }
}

// customer action creator function
function customerCreation(fullName, nationalId) {
    return {
        type: 'customer/customerCreation',
        payload: {
            fullName: fullName,
            nationalId: nationalId,
            // note that this can also be done in the reducer function, but it will create a side effect. But remember that our Reducer function must always be a pure from. No side effect.
            createdAt: new Date().toISOString() 
        }
    }
}

// customer fullName update action creator function
function customerDetailUpdate(updatedFullName) {
    return {
        type: 'customer/customerDetailUpdate',
        payload: updatedFullName
    }
}

// creating a root store using the combineReducer function from "redux"
const rootStore = combineReducers({
    account: accountReducer,
    customer: customerReducer
})


const store = createStore(rootStore);

store.dispatch(deposit(1000))
store.dispatch(customerCreation('Omoshola E', '234124123452'))
store.dispatch(withdraw(200))
store.dispatch(loan(2000, "Rent"));
store.dispatch(loan(5000, "Holiday"));
// store.dispatch(withdraw(300));
// store.dispatch(loan(2000, 'Pay Tuition Fee'))
// store.dispatch(payLoan());



console.log(store.getState())
// console.log('Store file')

// console.log(Date.now())