import { FETCH_SHOPS_PENDING, FETCH_SHOPS_SUCCESS, FETCH_SHOPS_ERROR } from './action';

const initialState = {
    data: [],
    pending: false,
    error: false
}

export default function shopsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SHOPS_PENDING: 
            return {
                ...state,
                pending: true,
                error: false,
                data: []
            }
        case FETCH_SHOPS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: false
            }
        case FETCH_SHOPS_ERROR:
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

export const getShops = state => state.shopsReducer.data;
export const getShopsPending = state => state.shopsReducer.pending;
export const getShopsError = state => state.shopsReducer.error;