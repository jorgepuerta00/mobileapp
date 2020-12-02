import { combineReducers } from "redux";
import productsReducer from './products';
import cart from './cart';
import indicator from './indicator';
import shopsReducer from './shops';
import userReducer from './user';
import searchReducer from './search';
import { reducers as IntlReducers } from './Intl';
import loginReducer from './login';
import orderReducer from './order';
import checkoutReducer from './checkout'
import passwordResetReducer from './passwordReset'
import restaurantsReducer from './restaurants'
import methodPaymentReducer from './methodpayment'
import transactionReducer from './wompi'

export default combineReducers({
    cart,
    indicator,
    userReducer,
    shopsReducer,
    productsReducer,
    searchReducer,
    IntlReducers,
    loginReducer,
    orderReducer,
    checkoutReducer,
    passwordResetReducer,
    restaurantsReducer,
    methodPaymentReducer,
    transactionReducer
})
