import Constants from "expo-constants";
import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from './action';

const api = Constants.manifest.extra.api.products.production
const token = Constants.manifest.extra.authotization.bearer;
const getProducts = Constants.manifest.extra.api.products.operation.get;

export default function fetchProducts(param) {
    return dispatch => {
        dispatch(fetchProductsPending());
        fetch(api.concat(getProducts).concat(param), {
            method: 'GET',
            headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': ' Bearer ' + token,
                }
        })
        .then(response => response.json())
        .then((data) => {
            dispatch(fetchProductsSuccess(data.data))
        })
        .catch((error) => {
            dispatch(fetchProductsError(error));
        });
    }
}