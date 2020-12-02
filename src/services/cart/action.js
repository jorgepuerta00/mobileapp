// ********************** CONSTANT TYPES *********************** //
export const types = {
    ADD: 'CART/ADD',
    REMOVE: 'CART/REMOVE',
    INCREASE_QUANTITY: 'CART/INCREASE_QUANTITY',
    DECREASE_QUANTITY: 'CART/DECREASE_QUANTITY',
    RESET: 'CART/RESET',
    SET: 'CART/SET',
    UPDATE: 'CART/UPDATE',
}
// ************************** ACTIONS ************************** //
export function add(product, quantity) {
    return {
        type: types.ADD,
        payload: {
            product,
            quantity
        }
    }
}

export function update(product, quantity) {
    return {
        type: types.UPDATE,
        payload: {
            product,
            quantity
        }
    }
}

export function remove(product) {
    return {
        type: types.REMOVE,
        payload: {
            product
        }
    }
}

export function increaseQuantity(item) {
    return {
        type: types.INCREASE_QUANTITY,
        payload: {
            item
        }
    }
}

export function decreaseQuantity(item) {
    return {
        type: types.DECREASE_QUANTITY,
        payload: {
            item
        }
    }
}

export function reset() {
    return {
        type: types.RESET,
        payload: []
    }
}

export function setCart(data) {
    return {
        type: types.SET,
        payload: data
    }
}