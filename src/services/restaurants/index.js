import { FETCH_RESTAURANTS_PENDING, FETCH_RESTAURANTS_SUCCESS, FETCH_RESTAURANTS_ERROR } from './action';

const initialState = {
    data: [],
    pending: false,
    error: false
}

export default function restaurantsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_RESTAURANTS_PENDING: 
            return {
                ...state,
                pending: true,
                error: false,
                data: []
            }
        case FETCH_RESTAURANTS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: false
            }
        case FETCH_RESTAURANTS_ERROR:
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

export const getRestaurants = state => state.restaurantsReducer.data;
export const getRestaurantsPending = state => state.restaurantsReducer.pending;
export const getRestaurantsError = state => state.restaurantsReducer.error;