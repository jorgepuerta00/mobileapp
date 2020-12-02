import Constants from "expo-constants";
import {PostCheckoutSuccess, PostCheckoutPending, PostCheckoutError} from './action';

const api = Constants.manifest.extra.api.order.production
const token = Constants.manifest.extra.authotization.bearer;
const postCheckout = Constants.manifest.extra.api.order.operation.checkout;

export function checkoutOrder(order) {
    return async dispatch => {
        dispatch(PostCheckoutPending());
        const data = {
            address: order.address, 
            totalvalue: order.totalCost, 
            methodpayment: order.methodPaymentName, 
            customer: order.user, 
            products: order.products,
            payment: order.transaction,
            code: order.reference
        };
        await fetch(api.concat(postCheckout), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + token,
            },
            body: JSON.stringify(data, null, 2)
        })
        .then(response => response.json())
        .then((result) => {
            dispatch(PostCheckoutSuccess(result.data))
        })
        .catch((error) => {
            dispatch(PostCheckoutError(error));
        });
    }
}

export function cancelCheckout(order) {
    return dispatch => {
        dispatch(PostCheckoutPending());
        fetch(api.concat(postCheckout), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + token,
            },
            body: JSON.stringify(order, null, 2)
        })
        .then(response => response.json())
        .then((result) => {
            dispatch(PostCheckoutSuccess(result))
        })
        .catch((error) => {
            dispatch(PostCheckoutError(error));
        });
    }
}