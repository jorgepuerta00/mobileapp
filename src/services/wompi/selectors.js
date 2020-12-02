import { fetchTransactionPending, fetchTransactionError, fetchTransactionSuccess } from './action';

const sandbox = "https://production.wompi.co"
//const test = "https://sandbox.wompi.co"
//const production = "https://production.wompi.co"

const apitokens = "/v1/tokens/cards"
const apiacceptancetoken = "/v1/merchants"
const apitransactions = "/v1/transactions"
const apipaymentsources = "/v1/payment_sources"

const pubkey = "pub_prod_oBUbdwaqLirVEukyeZCVg9rZ3g3ubOPX"
//const pubkeytest = "pub_test_wPriSQtLmagiLgSX2wQQLdHjwKbVZrwp"
//const pubkeyprod = "pub_prod_oBUbdwaqLirVEukyeZCVg9rZ3g3ubOPX"

export function createTransaction(checkout) {
    return async dispatch => {
        dispatch(fetchTransactionPending());

        await getAcceptanceToken()
            .then(async (result) => {
                const acceptancetoken = result.data 

                const request = {
                    acceptance_token: acceptancetoken.presigned_acceptance.acceptance_token,
                    amount_in_cents: checkout.amount * 100,
                    currency: "COP",
                    customer_email: checkout.customer_email,
                    reference: checkout.reference,
                    payment_source_id: checkout.payment_source_id,
                    payment_method: {
                        type: "CARD",
                        token: checkout.cardtoken,
                        installments: Number.parseInt(checkout.installments)
                    },
                }
        
                await fetch(sandbox.concat(apitransactions), {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': ' Bearer ' + pubkey
                    },
                    body: JSON.stringify(request, null, 2)
                })
                    .then(response => response.json())
                    .then((result) => {
                        dispatch(fetchTransactionSuccess(result.data))
                    })
                    .catch((error) => {
                        dispatch(fetchTransactionError(error));
                    });

            })
    }
}

export function getTransactionById(transactionId) {
    return async dispatch => {
        dispatch(fetchTransactionPending());
        await fetch(sandbox.concat(apitransactions).concat("/").concat(transactionId), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + pubkey
            }
        })
            .then(response => response.json())
            .then((result) => {
                dispatch(fetchTransactionSuccess(result.data))
            })
            .catch((error) => {
                dispatch(fetchTransactionError(error));
            });
    }
}

export function voidTransaction(transactionId) {
    return async dispatch => {
        dispatch(fetchTransactionPending());
        await fetch(sandbox.concat(apitransactions).concat("/").concat(transactionId).concat("/void"), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + pubkey
            }
        })
            .then(response => response.json())
            .then((result) => {
                dispatch(fetchTransactionSuccess(result.data))
            })
            .catch((error) => {
                dispatch(fetchTransactionError(error));
            });
    }
}

export async function getPaymentSourceToken(checkout) {
    const request = {
        acceptance_token: checkout.acceptancetoken,
        customer_email: checkout.customer_email,
        type: "CARD",
        token: checkout.cardtoken,
    }
    try {
        const response = await fetch(sandbox.concat(apipaymentsources), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + pubkey
            },
            body: JSON.stringify(request, null, 2)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getCardToken(card) {
    try {
        const response = await fetch(sandbox.concat(apitokens), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + pubkey
            },
            body: JSON.stringify(card, null, 2)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getAcceptanceToken() {
    try {
        const response = await fetch(sandbox.concat(apiacceptancetoken).concat("/").concat(pubkey), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}