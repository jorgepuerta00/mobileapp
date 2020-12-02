import Constants from "expo-constants";
import {OrderSuccess, OrderError, OrderPending} from './action';

const api = Constants.manifest.extra.api.order.production
const token = Constants.manifest.extra.authotization.bearer;
const getOrders = Constants.manifest.extra.api.order.operation.get;

export function fetchOrders(id) {
    return async dispatch => {
        dispatch(OrderPending());
        await fetch(api.concat(getOrders).concat(id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + token,
            }
        })
        .then(response => response.json())
        .then((result) => {
            dispatch(OrderSuccess(result.data))
        })
        .catch((error) => {
            dispatch(OrderError(error));
        });
    }
}

export const totalActiveOrders = (state) => {
    return Object.values(state.orderReducer.data).reduce((acc, item) => {
        acc += (item.state=='active'?1:0)
        return acc
    }, 0)
}