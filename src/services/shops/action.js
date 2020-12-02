export const FETCH_SHOPS_PENDING = 'FETCH_SHOPS_PENDING';
export const FETCH_SHOPS_SUCCESS = 'FETCH_SHOPS_SUCCESS';
export const FETCH_SHOPS_ERROR = 'FETCH_SHOPS_ERROR';

export const fetchShopsPending = () => {
    return {
        type: FETCH_SHOPS_PENDING
    }
}

export const fetchShopsError = (data) => {
    return {
        type: FETCH_SHOPS_ERROR,
        error: data
    }
}

export const fetchShopsSuccess = (data) => {
    return {
        type: FETCH_SHOPS_SUCCESS,
        payload: data
    }
}