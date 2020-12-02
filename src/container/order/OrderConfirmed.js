import React from 'react';
import { Image, AsyncStorage, Alert } from 'react-native';
// galio components
import { Text, Block } from 'galio-framework';
import { nowTheme as theme, Images } from '../../constants';
import { Touchable, Button, Spinner } from '../../components'
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

import { connect } from 'react-redux'
import { fetchOrders as fetchOrdersAction } from '../../services/order/selectors';
import { checkoutOrder } from '../../services/checkout/selectors'
import { getCheckout, getCheckoutPending, getCheckoutError } from '../../services/checkout'
import { getTotalPerItem } from '../../services/cart/selectors'
import { reset as resetAction } from '../../services/cart/action'
import { getTransaction } from '../../services/wompi';
import { getTransactionById as getTransactionByIdAction } from '../../services/wompi/selectors';
import { getMethodPaymentName, getMethodPaymentLogo, getMethodPaymentCreditcard } from '../../services/methodpayment';

const mapStateToProps = (state) => {
  return {
    order: getCheckout(state),
    pending: getCheckoutPending(state),
    error: getCheckoutError(state),
    transaction: getTransaction(state),
    getTotalPerItem: getTotalPerItem(state),
    methodPaymentName: getMethodPaymentName(state),
    methodPaymentLogo: getMethodPaymentLogo(state),
    methodPaymentCreditcard: getMethodPaymentCreditcard(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetAction()),
  checkout: (order) => dispatch(checkoutOrder(order)),
  getTransactionById: (transactionId) => dispatch(getTransactionByIdAction(transactionId)),
  fetchOrders: (userID) => dispatch(fetchOrdersAction(userID))
});

class OrderConfirmed extends React.Component {

  intervalID = 0;

  constructor(props) {
    super(props);
    this.state = {
      currenttransaction: {
        pending: true,
        status: 'PENDING',
        payment_method_type: this.props.methodPaymentName,
        reference: this.props.route.params.reference,
        currency: 'COP'
      }
    }
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    if (this.props.methodPaymentName === "Efectivo") {
      this.handlerPayment(this.state.currenttransaction)
    }
    else {
      this.loadData()
      this.intervalID = setInterval(this.loadData.bind(this), 1000)
    }
  }

  async componentWillUnmount() {
    const { fetchOrders, user } = this.props
    await fetchOrders(user.id)
    this.setState = (state, callback) => {
      return;
    };
  }

  shouldComponentRender() {
    if (this.state.pending === false)
      return false;
    return true;
  }

  loadData = async () => {
    const { transaction, getTransactionById } = this.props
    try {
      await getTransactionById(transaction.id)
      if (transaction.status === "APPROVED") {
        clearInterval(this.intervalID);
        await this.handlerPayment(transaction)
      }
      else if (transaction.status === "DECLINED" || transaction.status === "ERROR") {
        clearInterval(this.intervalID);
        this.setState({ pending: false })
      }
    } catch { }
  }

  handlerPayment = async (transaction) => {
    const { user, getTotalPerItem, checkout, reset, totalCost, methodPaymentName } = this.props
    const { reference } = this.props.route.params

    const address = user.addresses[0]
    const products = getTotalPerItem.map((item) => (
      {
        id: item.product.id,
        code: item.product.code,
        image: item.product.image,
        name: item.product.name,
        description: item.product.size,
        price: item.product.price,
        quantity: item.product.quantity,
        shop: item.product.shop,
        totalprice: item.totalprice
      }
    ))

    const order = { address, totalCost, methodPaymentName, user, products, transaction, reference }

    await checkout(order)
    await reset()
    this._storeData()
    this.setState({ pending: false })
  }

  _storeData = async () => {
    try {
      if (this.props.cart) {
        await AsyncStorage.setItem('@pidenos:cart', JSON.stringify(this.props.cart, null, 2));
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  routeToHome() {
    const { transaction, navigation } = this.props
    if (transaction.status === "DECLINED" || transaction.status === "ERROR") {
      navigation.goBack();
    }
    else if (transaction.status === "APPROVED" || transaction.status === "PENDING") {
      navigation.navigate('Home')
    }
  }

  routeToOrderDetail() {
    const { navigation } = this.props;
    this.setState({ pending: false })
    navigation.navigate("Order");
  }

  render() {
    const { intlData, transaction } = this.props;
    const { currenttransaction } = this.state

    if (this.shouldComponentRender()) {
      return (
        <Spinner
          spinnerKey={"SpinnerOrderConfirmed"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
      )
    }

    const payment = this.getInformationPayment(currenttransaction, transaction)

    return (
      <Block safe flex>
        <Block row style={styles.headerCheckout}>
          <Touchable onPress={() => this.routeToHome()}>
            <Block style={styles.circleShadow} onPress={this.props.onPressCloseScreen}>
              <Entypo name="chevron-left" size={24} color={theme.COLORS.ICON} />
            </Block>
          </Touchable>
          <Block>
            <Text style={styles.title}>{this.props.intlData.messages.cart.title}</Text>
          </Block>
        </Block>
        <Block flex center style={styles.containerCheckout}>
          <Block center flex={2}>
            <Block center style={{ marginBottom: theme.SIZES.BASE * 2 }}>
              <Image
                source={payment.image}
                cache='force-cache'
                style={{ marginBottom: theme.SIZES.BASE * 2 }}
              />
            </Block>
            <Block row style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text
                size={theme.SIZES.FONT * 1.675}
                bold
              >
                Su transacción fue&nbsp;
              </Text>
              <Text
                size={theme.SIZES.FONT * 1.675}
                bold
                color={payment.color}
              >
                {payment.status}&nbsp;
              </Text>
            </Block>
            <Block
              flex
              middle
              color={theme.COLORS.BLACK}
              style={{
                margin: theme.SIZES.BASE * 2
              }}
            >
              {transaction.status === "DECLINED" || transaction.status === "ERROR" ?
                <Text size={theme.SIZES.FONT * 1.2}>
                  La order aún no ha sido creada, por favor utilice otro medio de pago.
                </Text>
                :
                <Block>
                  <Text
                    size={theme.SIZES.FONT * 1.675}
                    bold
                  >
                    #{this.state.currenttransaction.reference}&nbsp;
              </Text>
                  <Text>
                    {intlData.messages.cart.ordernumber}
                  </Text>
                  <Text color={theme.COLORS.INFO} onPress={() => this.routeToOrderDetail()}>
                    {intlData.messages.cart.trackorder}
                  </Text>
                </Block>
              }
            </Block>
          </Block>
          <Button
            gradient
            style={styles}
            onPress={() => this.routeToHome()}
          >
            <Text style={styles.buttonText} color={theme.COLORS.WHITE}>
              {intlData.messages.pro.buttontext}
            </Text>
          </Button>
        </Block>
      </Block>
    )
  }

  getInformationPayment = (currenttransaction, transaction) => {
    if (currenttransaction.payment_method_type === "Efectivo") {
      return {
        status: 'Pendiente',
        color: theme.COLORS.WARNING,
        reference: currenttransaction.reference,
        icon: 'exclamationcircle',
        payment_method_type: currenttransaction.payment_method_type,
        currency: 'COP',
        image: Images.Warning
      }
    }
    else {
      const status = transaction.status
      return {
        status: status === 'APPROVED' ? 'aprobada' : status === 'DECLINED' ? 'declinada' : status === 'VOIDED' ? 'anulada' : status === 'ERROR' ? 'rechazada' : status,
        color: status === 'APPROVED' ? theme.COLORS.SUCCESS : status === 'DECLINED' ? theme.COLORS.ERROR : status === 'VOIDED' ? theme.COLORS.INFO : status === 'ERROR' ? theme.COLORS.ERROR : theme.COLORS.BLACK,
        icon: status === 'APPROVED' ? 'checkcircle' : status === 'DECLINED' ? 'closecircle' : status === 'VOIDED' ? 'exclamationcircle' : status === 'ERROR' ? 'exclamationcircle' : 'minuscircle',
        reference: currenttransaction.reference,
        payment_method_type: transaction.payment_method_type,
        currency: transaction.currency,
        image: status === 'APPROVED' ? Images.Success : status === 'DECLINED' ? Images.Error : status === 'VOIDED' ? Images.Error : status === 'ERROR' ? Images.Error : Images.Warning,
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderConfirmed);