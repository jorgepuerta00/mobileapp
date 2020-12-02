// ********************** CONSTANT TYPES *********************** //
export const types = {
    UPDATE_NAME: 'UPDATE_NAME',
    UPDATE_AVATAR: 'UPDATE_AVATAR',
    CURRENT_SESSION: 'CURRENT_SESSION',
    POST_USER_PENDING: 'POST_USER_PENDING',
    POST_USER_SUCCESS: 'POST_USER_SUCCESS',
    POST_USER_ERROR: 'POST_USER_ERROR',
    CLEAR_USER_LOGIN: 'CLEAR_USER_LOGIN'
}
// ************************** ACTIONS ************************** //
export function updateName(name) {
    return {
        type: types.UPDATE_NAME,
        name: name
    }
}

export function updateAvatar(avatar) {
    return {
        type: types.UPDATE_AVATAR,
        avatar: avatar
    }
}

export function currentSesion(data) {
    return {
        type: types.CURRENT_SESSION,
        payload: data
    }
}

export function PostUserSuccess(data) {
    return {
        type: types.POST_USER_SUCCESS,
        payload: data
    }
}

export function PostUserPending() {
    return {
        type: types.POST_USER_PENDING
    }
}

export function PostUserError(data) {
    return {
        type: types.POST_USER_ERROR,
        error: data
    }
}

export function clearUserLogin() {
    return {
        type: types.CLEAR_USER_LOGIN
    }
}