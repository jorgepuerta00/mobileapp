import {ORDER_PENDING, ORDER_SUCCESS, ORDER_ERROR} from './action';

const initialState = {
    data: [],
    pending: false,
    error: false
}

export default function orderReducer(state = initialState, action) {
    switch(action.type) {
        case ORDER_PENDING: 
            return {
                ...state,
                pending: true,
                error: false,
                data: []
            }
        case ORDER_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: false
            }
        case ORDER_ERROR:
            return {
                ...state,
                pending: false,
                error: true,
                data: action.error
            }
        default: 
            return state;
    }
}

export const getOrder = state => state.orderReducer.data;
export const getOrderPending = state => state.orderReducer.pending;
export const getOrderError = state => state.orderReducer.error;
