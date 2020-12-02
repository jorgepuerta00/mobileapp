import Constants from "expo-constants"
import { fetchSearchPending, fetchSearchSuccess, fetchSearchError } from './action'

const api = Constants.manifest.extra.api.products.production
const token = Constants.manifest.extra.authotization.bearer
const getSearchByName = Constants.manifest.extra.api.products.operation.search

export default function fetchSearch(param) {
    return dispatch => {
        dispatch(fetchSearchPending());
        fetch(api.concat(getSearchByName).concat(param), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then((data) => {
                dispatch(fetchSearchSuccess(data.data))
            })
            .catch((error) => {
                dispatch(fetchSearchError(error));
            });
    }
}