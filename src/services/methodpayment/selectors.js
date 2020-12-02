import {updateMethodPayment, deleteMethodPayment} from './action';

export function setMethodPayment(name, logo, creditcard) {
    return dispatch => {
        dispatch(updateMethodPayment(name, logo, creditcard));        
    }
}

export function clearMethodPayment() {
    return dispatch => {
        dispatch(deleteMethodPayment());
    }
}