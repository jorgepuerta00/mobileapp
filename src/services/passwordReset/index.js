import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_PENDING, RESET_PASSWORD_ERROR } from './action';

const initialState = {
    payload: [],
    pending: false,
    error: false
}

export default function passwordResetReducer(state = initialState, action) {
    switch(action.type) {
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                pending: false,
                error: false,
                payload: action.payload,
            }
        case RESET_PASSWORD_PENDING:
            return {
                ...state,
                pending: true,
                error: false,
                payload: [],
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                pending: false,
                error: true,
                payload: action.error,
            }
        default: 
            return state;
    }
}

export const getResetPassword = state => state.passwordResetReducer.payload;
export const getResetPasswordPending = state => state.passwordResetReducer.pending;
export const getResetPasswordError = state => state.passwordResetReducer.error;
