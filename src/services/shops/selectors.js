import Constants from "expo-constants"
import { fetchShopsPending, fetchShopsSuccess, fetchShopsError } from './action'

const api = Constants.manifest.extra.api.shops.production
const token = Constants.manifest.extra.authotization.bearer
const getShopsbyType = Constants.manifest.extra.api.shops.operation.getByType

export function fetchShops(type) {
    return async dispatch => {
        dispatch(fetchShopsPending());
        await fetch(api.concat(getShopsbyType).concat(type), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then((data) => {
                dispatch(fetchShopsSuccess(data.data));
            })
            .catch((error) => {
                dispatch(fetchShopsError(error));
            });
    }
}