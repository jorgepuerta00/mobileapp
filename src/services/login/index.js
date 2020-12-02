import { LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, SIGN_OUT_SUCCESS, LOGIN_USER_CANCEL } from './action';

const initialState = {
    payload: null,
    pending: false,
    error: false,
    signOut: false
}

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER_CANCEL: 
            return {
                ...state,
                pending: false,
                error: false,
                payload: null,
                signOut: false
            }
        case LOGIN_USER_PENDING: 
            return {
                ...state,
                pending: true,
                error: false,
                payload: null,
                signOut: false
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                error: false,
                payload: action.payload,
                signOut: false
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                payload: false,
                signOut: false
            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                pending: false,
                error: false,
                payload: null,
                signOut: true
            }
        default: 
            return state;
    }
}

export const getLoginUser = state => state.loginReducer.payload;
export const getLoginUserPending = state => state.loginReducer.pending;
export const getLoginUserError = state => state.loginReducer.error;
export const getSignOut = state => state.loginReducer.signOut;