import { getName, getAvatar, getUser } from './user'
import { totalItemsInCart, totalCost } from './cart/selectors'
import { totalActiveOrders } from './order/selectors'
import { getOrder } from './order'

const mapStateToProps = state => {
    return {
      intlData: state.IntlReducers,
      name: getName(state),
      avatar: getAvatar(state),
      user: getUser(state),
      totalItemsInCart: totalItemsInCart(state),
      totalActiveOrders : totalActiveOrders(state),
      totalCost: totalCost(state),
      orders: getOrder(state),
    };
  };
  export default mapStateToProps;