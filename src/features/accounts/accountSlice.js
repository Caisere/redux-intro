// state for account initial value
const accountInitialValues = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
    error: false,
    conversionError: ''
}

// the accountReducer function
export default function accountReducer(state = accountInitialValues, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state, 
                balance: state.balance + action.payload,
                isLoading: false
            }
        case 'account/withdraw':
            return {
                ...state, 
                balance: state.balance - action.payload
            }
        case 'account/loan': 
            if (state.loan > 0) return state
            return {
                ...state, 
                loan: action.payload.amount, 
                balance: state.balance + action.payload.amount, 
                loanPurpose: action.payload.loanPurpose
            }
        case 'account/payLoan':
            return {
                ...state, 
                loan: 0, 
                oanPurpose: '', 
                balance: state.balance - state.loan
            }
        case 'currency/conversion': 
            return {
                ...state, isLoading: true
            }
        case 'currency/conversionError': 
            return {
                ...state, 
                error: true, 
                conversionError: 'Error converting currency'
            }
        default: {
            return state
        }
    }
}

// deposit action creator function
function deposit(amount, currency) { 
    if (currency === 'USD')return {
        type: 'account/deposit',
        payload: amount
    }

    //https://api.frankfurter.app/latest?from=USD&to=EUR
    return async function (dispatch, getState) {
        dispatch({type: 'currency/conversion'})
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

export {
    deposit, 
    withdraw, 
    loan, 
    payLoan
}