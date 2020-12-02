export const FETCH_SEARCH_PENDING = 'FETCH_SEARCH_PENDING';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_ERROR = 'FETCH_SEARCH_ERROR';

export const fetchSearchPending = () => {
    return {
        type: FETCH_SEARCH_PENDING
    }
}

export const fetchSearchError = (data) =>  {
    return {
        type: FETCH_SEARCH_ERROR,
        error: data
    }
}

export const fetchSearchSuccess = (data) =>  {
    return {
        type: FETCH_SEARCH_SUCCESS,
        payload: data
    }
}