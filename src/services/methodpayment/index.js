import { Images } from '../../constants';
import { types } from './action' 

const defaultMethodPayment = "Efectivo"

const initialState = {
  name: defaultMethodPayment,
  logo: Images.cash,
  creditcard: null
};

export default function methodPaymentReducer(state = initialState, action) {
    switch (action.type) {    
        case types.UPDATE_METHOD_PAYMENT:
          return { 
            ...state, 
            name: action.name,
            logo: action.logo,
            creditcard: action.creditcard 
          };
        case types.CLEAR_METHOD_PAYMENT:
            return {
                ...state,
                name: defaultMethodPayment,
                logo: Images.cash,
                creditcard: null
            }
        default:
          return state;
      }
}

export const getMethodPaymentName = state => state.methodPaymentReducer.name;
export const getMethodPaymentLogo = state => state.methodPaymentReducer.logo;
export const getMethodPaymentCreditcard = state => state.methodPaymentReducer.creditcard;