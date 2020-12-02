export const ORDER_PENDING = 'ORDER_PENDING';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

export const OrderPending = () => {
    return {
        type: ORDER_PENDING
    }
}

export const OrderError = (data) =>  {
    return {
        type: ORDER_ERROR,
        error: data
    }
}

export const OrderSuccess = (data) =>  {
    return {
        type: ORDER_SUCCESS,
        payload: data
    }
}