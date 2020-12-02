export const types = {
    FETCH_TRANSACTION_PENDING: 'FETCH_TRANSACTION_PENDING',
    FETCH_TRANSACTION_SUCCESS: 'FETCH_TRANSACTION_SUCCESS',
    FETCH_TRANSACTION_ERROR: 'FETCH_TRANSACTION_ERROR',
    CLEAR_TRANSACTION: 'CLEAR_TRANSACTION'
}

export const fetchTransactionPending = () => {
    return {
        type: types.FETCH_TRANSACTION_PENDING
    }
}

export const fetchTransactionError = (data) => {
    return {
        type: types.FETCH_TRANSACTION_ERROR,
        error: data
    }
}

export const fetchTransactionSuccess = (data) => {
    return {
        type: types.FETCH_TRANSACTION_SUCCESS,
        payload: data
    }
}

export const clearTransaction = () => {
    return {
        type: types.CLEAR_TRANSACTION
    }
}