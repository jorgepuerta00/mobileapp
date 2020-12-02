// ********************** CONSTANT TYPES *********************** //
export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGIN_USER_CANCEL = 'LOGIN_USER_CANCEL';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
// ************************** ACTIONS ************************** //
export const loginUserPending = () => {
    return {
        type: LOGIN_USER_PENDING
    }
}

export const loginUserFail = (data) =>  {
    return {
        type: LOGIN_USER_ERROR,
        error: data
    }
}

export const loginUserSuccess = (data) =>  {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}

export const loginUserCancel = () => {
    return {
        type: LOGIN_USER_CANCEL
    }
}

export const signOutSuccess = () =>  {
    return {
        type: SIGN_OUT_SUCCESS
    }
}