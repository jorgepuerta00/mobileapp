import Constants from "expo-constants"
import { fetchRestaurantsError, fetchRestaurantsSuccess, fetchRestaurantsPending } from './action'

const api = Constants.manifest.extra.api.shops.production
const token = Constants.manifest.extra.authotization.bearer
const getShopsbyType = Constants.manifest.extra.api.shops.operation.getByType

export function fetchRestaurants(type) {
    return async dispatch => {
        dispatch(fetchRestaurantsPending());
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
                dispatch(fetchRestaurantsSuccess(data.data));
            })
            .catch((error) => {
                dispatch(fetchRestaurantsError(error));
            });
    }
}