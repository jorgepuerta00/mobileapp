// ********************** CONSTANT TYPES *********************** //
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
// ************************** ACTIONS ************************** //
export const resetPasswordSucess = (data) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: data
    }
}

export const resetPasswordPending = () => {
    return {
        type: RESET_PASSWORD_PENDING
    }
}

export const resetPasswordFail = (data) => {
    return {
        type: RESET_PASSWORD_ERROR,
        error: data
    }
}