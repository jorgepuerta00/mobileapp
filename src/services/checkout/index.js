import {POST_CHECKOUT_PENDING, POST_CHECKOUT_ERROR, POST_CHECKOUT_SUCCESS} from './action';

const initialState = {
    data: null,
    pending: false,
    error: false
}

export default function checkoutReducer(state = initialState, action) {
    switch(action.type) {
        case POST_CHECKOUT_PENDING: 
            return {
                ...state,
                pending: true,
                error: false,
                data: null
            }
        case POST_CHECKOUT_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: false
            }
        case POST_CHECKOUT_ERROR:
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

export const getCheckout = state => state.checkoutReducer.data;
export const getCheckoutPending = state => state.checkoutReducer.pending;
export const getCheckoutError = state => state.checkoutReducer.error;
