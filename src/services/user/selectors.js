import Constants from "expo-constants";
import {PostUserSuccess, PostUserError, PostUserPending, clearUserLogin, currentSesion} from './action';
import { updateName, updateAvatar } from './action';
import firebase from '../../constants/firebase';

const api = Constants.manifest.extra.api.user.production
const postUser = Constants.manifest.extra.api.user.operation.post;
const getDataUser = Constants.manifest.extra.api.user.operation.get;
const token = Constants.manifest.extra.authotization.bearer;

export function setName(name) {
    return dispatch => {
        dispatch(updateName(name));        
    }
}

export function setAvatar(avatar) {
    return dispatch => {
        dispatch(updateAvatar(avatar));
    }
}

export function setUser(user) {
    return dispatch => {
        dispatch(currentSesion(user));
    }
}

export function clearUser() {
    return dispatch => {
        dispatch(clearUserLogin());
    }
}

export function createUser(data) {
    return dispatch => {
        dispatch(PostUserPending());
        fetch(api.concat(postUser), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + token,
            },
            body: JSON.stringify(data, null, 2), 
        })
        .then(response => response.json())
        .then((result) => {
            dispatch(PostUserSuccess(result))
        })
        .catch((error) => {
            dispatch(PostUserError(error));
        });
    }
}

export function getUser(user) {
    return dispatch => {
        dispatch(PostUserPending()); 
        callUserFromApi(user.id)
        .then(result => {
            if (result.id == null) {
                dispatch(createUser(user))
            }
            else {
                const avatar = user.avatar
                dispatch(PostUserSuccess({avatar, ...result}))
            }
        })
        .catch((error) => {
            dispatch(PostUserError(error));
        }); 
    }
}
  
export function currentUser() {
    return dispatch => {
        dispatch(PostUserPending());  
        try {
            var user = firebase.auth().currentUser;
            if (user) {
                callUserFromApi(user.uid)
                .then(result => {
                    const payload = {
                        id: result.id, 
                        firstName: result.firstName, 
                        lastName: result.lastName,
                        email: result.email,
                        addresses: result.addresses,
                        avatar: user.photoURL != undefined ? user.photoURL : null
                    }
                    dispatch(currentSesion(payload))
                })
                .catch((error) => {
                    dispatch(PostUserError(error));
                });
            }
        } 
        catch (error) {
            dispatch(PostUserError(error));
        }  
    }
}

async function callUserFromApi(id) {
    try {
        const response = await fetch(api.concat(getDataUser).concat(id), {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': ' Bearer ' + token,
                                    }
                                })
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
  }
  