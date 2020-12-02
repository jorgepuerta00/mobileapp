import { types } from './action'
import { omit } from 'lodash'

// ************************** STATE ************************** //
const initialState = {
    quantityById: {}
}

// ************************** REDUCER ************************** //
export default function cart(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.ADD: {
            let { id, name, image, price, size, shop, code } = payload.product
            let { quantity } = payload
            if (state.quantityById[id]) {
                return {
                    ...state,
                    quantityById: {
                        ...state.quantityById,
                        [id]: {
                            name,
                            size,
                            image,
                            id,
                            quantity: state.quantityById[id].quantity + quantity,
                            price,
                            shop,
                            code
                        }
                    }
                }
            }
            return {
                ...state,
                quantityById: {
                    ...state.quantityById,
                    [id]: {
                        name,
                        size,
                        image,
                        id,
                        quantity,
                        price,
                        shop,
                        code
                    }
                }
            }
        }
        case types.UPDATE: {
            let { id, name, image, price, size, shop, code } = payload.product
            let { quantity } = payload
            if (state.quantityById[id]) {
                return {
                    ...state,
                    quantityById: {
                        ...state.quantityById,
                        [id]: {
                            name,
                            size,
                            image,
                            id,
                            quantity: quantity,
                            price,
                            shop,
                            code
                        }
                    }
                }
            }
            return {
                ...state,
                quantityById: {
                    ...state.quantityById,
                    [id]: {
                        name,
                        size,
                        image,
                        id,
                        quantity,
                        price,
                        shop,
                        code
                    }
                }
            }
        }
        case types.REMOVE: {
            let { id } = payload.product.product === undefined ? payload.product : payload.product.product
            const updateRemoved = omit(state.quantityById, id)
            return {
                ...state,
                quantityById: updateRemoved
            }
        }
        case types.INCREASE_QUANTITY: {
            let { quantity } = payload.item
            let { id, name, image, size, shop, code, price } = payload.item.product
            return {
                ...state,
                quantityById: {
                    ...state.quantityById,
                    [id]: {
                        id,
                        image,
                        name,
                        size,
                        quantity: quantity + 1,
                        price,
                        shop,
                        code
                    }
                }
            }
        }
        case types.DECREASE_QUANTITY: {
            let { quantity } = payload.item
            let { id, name, image, size, shop, code, price } = payload.item.product
            if (state.quantityById[id] && quantity === 1) {
                const updateRemoved = omit(state.quantityById, id)
                return {
                    ...state,
                    quantityById: updateRemoved
                }
            }
            return {
                ...state,
                quantityById: {
                    ...state.quantityById,
                    [id]: {
                        id,
                        name,
                        size,
                        image,
                        quantity: quantity - 1,
                        price,
                        shop,
                        code
                    }
                }
            }
        }
        case types.RESET: {
            const updateReseted = {}
            return {
                ...state,
                quantityById: updateReseted
            }
        }
        case types.SET: {
            return {
                ...state,
                ...payload
            }
        }
        default: return state;
    }

}
