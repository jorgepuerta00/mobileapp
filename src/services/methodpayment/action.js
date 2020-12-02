export const types = {
    UPDATE_METHOD_PAYMENT: 'UPDATE_METHOD_PAYMENT',
    CLEAR_METHOD_PAYMENT: 'CLEAR_METHOD_PAYMENT'
}

export function updateMethodPayment(name, logo, creditcard) {
    return {
        type: types.UPDATE_METHOD_PAYMENT,
        name,
        logo,
        creditcard
    }
}

export function deleteMethodPayment() {
    return {
        type: types.CLEAR_METHOD_PAYMENT
    }
}