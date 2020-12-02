export const POST_CHECKOUT_PENDING = 'POST_CHECKOUT_PENDING';
export const POST_CHECKOUT_SUCCESS = 'POST_CHECKOUT_SUCCESS';
export const POST_CHECKOUT_ERROR = 'POST_CHECKOUT_ERROR';

export const PostCheckoutPending = () => {
    return {
        type: POST_CHECKOUT_PENDING
    }
}

export const PostCheckoutError = (data) =>  {
    return {
        type: POST_CHECKOUT_ERROR,
        error: data
    }
}

export const PostCheckoutSuccess = (data) =>  {
    return {
        type: POST_CHECKOUT_SUCCESS,
        payload: data
    }
}