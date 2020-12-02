import React from "react";
import { ScrollView } from "react-native";
import { Text, Block, Button } from 'galio-framework';
import { Entypo } from '@expo/vector-icons';
import { Images, nowTheme } from '../../constants';
import { Img, Touchable, Root, Toast } from '../../components'
import styles from "./styles";
import moment from 'moment'
import { currencyFormat } from '../../constants/utils';
import { Spinner } from '../../components';

import { connect } from 'react-redux'
import { getCheckoutPending, getCheckoutError } from '../../services/checkout';
import { cancelCheckout as cancelCheckoutAction } from '../../services/checkout/selectors';

const mapStateToProps = (state) => {
  return {
    pending: getCheckoutPending(state),
    error: getCheckoutError(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  cancelCheckout: (order) => dispatch(cancelCheckoutAction(order))
});

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);

    this.state = {
      state: props.order.state
    };
  }

  shouldComponentRender() {
    if (this.props.pending === false)
      return false;
    return true;
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  cancelCheckout() {
    const { cancelCheckout, order, error, pending, intlData } = this.props;
    cancelCheckout(order)

    let title
    let message
    let type

    if (!error && !pending) {
      title = intlData.messages.message.warning.title
      message = intlData.messages.orderDetail.message
      type = 'Success'
      this.setState({
        state: 'inactive'
      })
    }
    else {
      title = intlData.messages.message.errors.title
      message = intlData.messages.message.errors.message
      type = 'Error'
    }

    this.ToastMessage(type, title, message)

  }

  ToastMessage = (type, title, text) => {
    Toast.show({
      title: title,
      text: text,
      type: type
    })
  }

  render() {
    const { order, intlData } = this.props
    const { code, date, payment, methodpayment } = order
    const { state } = this.state

    let method
    let paymentmethod
    let paymentStatus
    let colorStatus

    const active = state == 'active' ? true : false

    const color = state == 'active' ? nowTheme.COLORS.INFO :
      state == 'inactive' ? nowTheme.COLORS.ORANGE :
        state == 'delivered' ? nowTheme.COLORS.SUCCESS : nowTheme.COLORS.ERROR

    const image = state == 'active' ? Images.active :
      state == 'inactive' ? Images.inactive :
        state == 'delivered' ? Images.delivered : Images.unknown

    const message = state == 'active' ? intlData.messages.order.active :
      state == 'inactive' ? intlData.messages.order.inactive :
        state == 'delivered' ? intlData.messages.order.delivered : intlData.messages.order.unknown

    if (methodpayment !== "Efectivo") {
      paymentmethod = payment.payment_method.extra.brand == 'VISA' ? Images.visaIcon :
        payment.payment_method.extra.brand == 'MASTERCARD' ? Images.mastercardIcon :
          payment.payment_method.extra.brand == 'AMEX' ? Images.amexIcon :
            payment.payment_method.extra.brand == 'DINERSCLUB' ? Images.dinersclubIcon : Images.creditcard

      paymentStatus = payment.status == 'DECLINED' ? 'Rechazado' :
        payment.status == 'VOIDED' ? 'Anulada' :
          payment.status == 'APPROVED' ? 'Aprobado' :
            payment.status == 'ERROR' ? 'Error' :
              payment.status == 'PENDING' ? 'Pendiente' : payment.status

      colorStatus = payment.status == 'DECLINED' || payment.status == 'ERROR' ? nowTheme.COLORS.DANGER :
        payment.status == 'APPROVED' ? nowTheme.COLORS.SUCCESS :
          payment.status == 'PENDING' ? nowTheme.COLORS.WARNING : nowTheme.COLORS.BLACK

      method = methodpayment
    }
    else {
      paymentmethod = Images.cash
      paymentStatus = 'Pendiente'
      colorStatus = nowTheme.COLORS.WARNING
      method = methodpayment
    }

    const backgroundColor = methodpayment.includes("Amex") ? "Amex" : methodpayment.includes("Efectivo") ? "Warning" : "White"

    return (
      <Root>
        <Block style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
          <Spinner
            spinnerKey={"SpinnerDetail"}
            visible={this.shouldComponentRender()}
            textContent={intlData.messages.loading}
            animation="fade"
          />
          <Block style={styles.contentScreen}>
            <Block row style={styles.headerDetail}>
              <Touchable onPress={this.props.onPressCloseScreen}>
                <Block style={styles.circleShadow} onPress={this.props.onPressCloseScreen}>
                  <Entypo name="chevron-left" size={24} color={nowTheme.COLORS.ICON} />
                </Block>
              </Touchable>
              <Block>
                <Text style={styles.title}>{this.props.intlData.messages.orderDetail.title}</Text>
              </Block>
            </Block>
            <ScrollView horizontal={false} style={styles.containerCartFull}>
              <Block flex style={styles.headerOrderDetail}>
                <Block row>
                  <Block left middle style={[styles.imageOrderItem, styles.shadow]}>
                    <Img shadowless source={image} size="small" />
                  </Block>
                  <Block flex style={{ marginLeft: nowTheme.SIZES.BASE }}>
                    <Block row>
                      <Text style={[styles.orderDetailStatus, { color: color }]}>
                        {message}{' '}
                      </Text>
                      <Text style={styles.orderDetailDate}>
                        {moment(date).format('DD/MM/YYYY')}
                      </Text>
                    </Block>
                    <Text style={styles.title}>{intlData.messages.order.order} N°</Text>
                    <Text style={styles.title}>{code}</Text>
                  </Block>
                </Block>
              </Block>
              <Block>
                <Block style={styles.padding}>
                  <Block style={styles.productsSummary}>
                    <Text style={styles.titleSection}>{intlData.messages.orderDetail.productsummary}</Text>
                    {order.products.map((product, index) => (
                      <Text
                        key={index}
                        style={styles.textProduct}
                      >
                        {product.name}
                      </Text>
                    ))}
                  </Block>
                </Block>
                <Block style={styles.padding}>
                  <Block row style={styles.orderDetailAddress} space="between">
                    <Text style={styles.titleSection}>{intlData.messages.orderDetail.deliveryaddress}</Text>
                    <Text style={styles.textSection}>{order.address}</Text>
                  </Block>
                </Block>
                <Block style={styles.padding}>
                  <Block row style={styles.orderDetailCost} space="between">
                    <Text style={styles.titleSection}>{intlData.messages.orderDetail.paydetail}</Text>
                    <Text style={styles.textSection}>{currencyFormat(order.totalvalue)}</Text>
                  </Block>
                </Block>
                <Block style={styles.padding}>
                  <Block flex style={styles.orderDetailTrasaction}>
                    <Block flex>
                      <Text style={styles.titleSection}>{intlData.messages.orderDetail.transationdetail}</Text>
                    </Block>
                    <Text></Text>
                    <Block row>
                      <Block>
                        <Img shadowless source={paymentmethod} size="creditcard" color={backgroundColor} />
                      </Block>
                      <Block style={styles.detailTransaction}>
                        <Text style={styles.titleSection}>{intlData.messages.orderDetail.methodpayment}</Text>
                        <Block row space="between">
                          <Text style={styles.textSection}>{method}</Text>
                          <Text style={styles.textSection}>{currencyFormat(order.totalvalue)}</Text>
                        </Block>
                      </Block>
                    </Block>
                    <Text></Text>
                    <Block row space="between">
                      <Text style={styles.titleSection}>{intlData.messages.orderDetail.status}</Text>
                      <Text style={[styles.textSection, { color: colorStatus, fontWeight: 'bold' }]}>{paymentStatus}</Text>
                    </Block>
                    <Text></Text>
                    <Block row space="between">
                      <Text style={styles.titleSection}>{intlData.messages.orderDetail.totalpay}</Text>
                      <Text style={styles.textSection}>{currencyFormat(order.totalvalue)}</Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
            <Block style={styles.checkoutContentButtons}>
              <Button
                shadowless
                disabled={!active}
                color={!active ? nowTheme.COLORS.GRAY : nowTheme.COLORS.PIDENOS}
                onPress={() => this.cancelCheckout()}
              >
                <Text style={styles.buttonCancel}>{intlData.messages.orderDetail.cancelorder}</Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Root>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);