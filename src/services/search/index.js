import {FETCH_SEARCH_PENDING, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR} from './action';

const initialState = {
    data: [],
    pending: false,
    error: false
}

export default function searchReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SEARCH_PENDING: 
            return {
                ...state,
                pending: true,
                error: false,
                data: []
            }
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: false
            }
        case FETCH_SEARCH_ERROR:
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

export const getSearch = state => state.searchReducer.data;
export const getSearchPending = state => state.searchReducer.pending;
export const getSearchError = state => state.searchReducer.error;
