export const FETCH_RESTAURANTS_PENDING = 'FETCH_RESTAURANTS_PENDING';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_ERROR = 'FETCH_RESTAURANTS_ERROR';

export const fetchRestaurantsPending = () => {
    return {
        type: FETCH_RESTAURANTS_PENDING
    }
}

export const fetchRestaurantsError = (data) => {
    return {
        type: FETCH_RESTAURANTS_ERROR,
        error: data
    }
}

export const fetchRestaurantsSuccess = (data) => {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: data
    }
}