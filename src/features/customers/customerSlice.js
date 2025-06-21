import { createSlice } from "@reduxjs/toolkit"

// state for customer initial values
const customerInitialValues = {
    fullName: '',
    nationalID: '',
    createdAt: '',
    // editedAt: ''
}

const customerSlice = createSlice({
    name: 'customer',
    initialState: customerInitialValues,
    reducers: {
        customerCreation: {
            // prepare
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createdAt: new Date().toISOString()
                    }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName
                state.nationalID = action.payload.nationalId
                state.createdAt = action.payload.createdAt
            }
        },
        customerDetailUpdate(state, action) {
            state.fullName = action.payload
        }
    }
})

export const {customerCreation, customerDetailUpdate} = customerSlice.actions

export default customerSlice.reducer


// // the customerReducer function 
// export default function customerReducer(state = customerInitialValues, action) {
//     switch(action.type) {
//         case 'customer/customerCreation':
//             return {
//                 ...state, 
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalId,
//                 createdAt: action.payload.createdAt,
//                 // editedAt: action.payload.createdAt
//             }
//         case 'customer/customerDetailUpdate':
//             return {
//                 ...state, fullName: action.payload
//             }
//         default: {
//             return state
//         }
//     }
// }

// // customer action creator function
// function customerCreation(fullName, nationalId) {
//     return {
//         type: 'customer/customerCreation',
//         payload: {
//             fullName: fullName,
//             nationalId: nationalId,
//             // note that this can also be done in the reducer function, but it will create a side effect. But remember that our Reducer function must always be a pure from. No side effect.
//             createdAt: new Date().toISOString() 
//         }
//     }
// }


// // customer fullName update action creator function
// function customerDetailUpdate(updatedFullName) {
//     return {
//         type: 'customer/customerDetailUpdate',
//         payload: updatedFullName
//     }
// }

// export {customerCreation, customerDetailUpdate}