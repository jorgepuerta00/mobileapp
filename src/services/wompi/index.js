import { types } from './action'

const initialState = {
    data: [],
    pending: false,
    error: false
}

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_TRANSACTION_PENDING:
            return {
                ...state,
                data: [],
                pending: true,
                error: false
            }
        case types.FETCH_TRANSACTION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                pending: false,
                error: false
            }
        case types.FETCH_TRANSACTION_ERROR:
            return {
                ...state,
                data: action.error,
                pending: false,
                error: true
            }
        case types.CLEAR_TRANSACTION:
            return {
                ...state,
                data: [],
                pending: false,
                error: false
            }
        default:
            return state;
    }
}

export const getTransaction = state => state.transactionReducer.data;
export const getTransactionPending = state => state.transactionReducer.pending;
export const getTransactionError = state => state.transactionReducer.error;
