import React from "react";
import {
  ScrollView,
  Text,
  Alert,
  Linking,
  Picker
} from "react-native";
import { Block, Button, Checkbox } from "galio-framework";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';

import { nowTheme } from "../../constants";
import { currencyFormat, getCryptoCode, isIOS } from '../../constants/utils';
import styles from './styles';
import { Touchable, Img, Input, Spinner } from '../../components'

import { connect } from 'react-redux'
import { getTotalPerItem } from '../../services/cart/selectors'

import { getMethodPaymentName, getMethodPaymentLogo, getMethodPaymentCreditcard } from '../../services/methodpayment';
import { clearMethodPayment as clearMethodPaymentAction } from '../../services/methodpayment/selectors'
import { getAcceptanceToken, createTransaction as createTransactionAction } from '../../services/wompi/selectors'
import { clearTransaction as clearTransactionAction } from '../../services/wompi/action'
import { getTransaction, getTransactionPending, getTransactionError } from '../../services/wompi';
import Theme from "../../constants/Theme";

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    getTotalPerItem: getTotalPerItem(state),
    transaction: getTransaction(state),
    pending: getTransactionPending(state),
    error: getTransactionError(state),
    methodPayment: getMethodPaymentName(state),
    methodPaymentLogo: getMethodPaymentLogo(state),
    methodPaymentCreditcard: getMethodPaymentCreditcard(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearMethodPayment: () => dispatch(clearMethodPaymentAction()),
  createTransaction: (checkout) => dispatch(createTransactionAction(checkout)),
  clearTransaction: () => dispatch(clearTransactionAction())
});

class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coupon: "",
      policy: false,
      acceptancetoken: null,
      installments: 1,
      pending: false
    }
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this.acceptanceToken(false)
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  shouldComponentRender() {
    if (this.state.pending === false)
      return false;
    return true;
  }

  acceptanceToken = async (policy) => {
    this.setState({ policy })
    this.props.clearTransaction()
    await getAcceptanceToken()
      .then((result) => {
        this.setState({ acceptancetoken: result.data })
      })
  }

  routeToLogin = () => {
    this.props.navigation.navigate('Login')
  }

  routeToAddresses = () => {
    this.props.navigation.navigate('Addresses')
  }

  routeToOrderConfirmed = (reference) => {
    this.setState({ pending: false })
    this.props.navigation.navigate('OrderConfirmed', { reference })
  }

  UserAlertHandler = () => {
    Alert.alert(
      this.props.intlData.messages.message.warning.title,
      this.props.intlData.messages.cart.warningsesion,
      [
        { text: this.props.intlData.messages.cart.close, onPress: this.routeToLogin },
      ],
      { cancelable: false }
    );
  }

  EmailAlertHandler = () => {
    Alert.alert(
      this.props.intlData.messages.message.warning.title,
      this.props.intlData.messages.cart.emailwarning
    );
  }

  InstallmentsAlertHandler = () => {
    Alert.alert(
      this.props.intlData.messages.message.warning.title,
      "Debes seleccionar el número de cuotas."
    );
  }

  CreditCardAlertHandler = () => {
    Alert.alert(
      this.props.intlData.messages.message.warning.title,
      "Debes seleccionar una tarjeta de crédito/débito válida."
    );
  }

  AddressesAlertHandler = () => {
    Alert.alert(
      this.props.intlData.messages.message.warning.title,
      this.props.intlData.messages.cart.warningaddress,
      [
        { text: this.props.intlData.messages.cart.yes, onPress: this.routeToAddresses },
        { text: this.props.intlData.messages.cart.no, style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  checkout = async () => {
    const { totalCost, user, createTransaction, methodPaymentCreditcard, methodPayment } = this.props
    const { acceptancetoken, installments } = this.state
    const reference = getCryptoCode()

    if (user != null) {
      const address = user.addresses[0] != undefined ? user.addresses[0] : null
      const email = user.email != undefined ? user.email : null
      if (email != null) {
        if (address != null) {
          if (methodPayment === "Efectivo") {
            this.routeToOrderConfirmed(reference)
          }
          else if (methodPayment != "Tarjeta de Crédito/Débito") {
            if (installments > 0) {
              const checkoutRequest = {
                cardtoken: methodPaymentCreditcard.id,
                acceptancetoken: acceptancetoken.presigned_acceptance.acceptance_token,
                amount: totalCost,
                customer_email: email,
                installments: installments,
                reference: reference
              }
              this.setState({ pending: true })
              await createTransaction(checkoutRequest)
                .then((result) => {
                  this.routeToOrderConfirmed(reference)
                })

            }
            else {
              this.InstallmentsAlertHandler()
            }
          }
          else {
            this.CreditCardAlertHandler()
          }
        }
        else {
          this.AddressesAlertHandler()
        }
      }
      else {
        this.EmailAlertHandler()
      }
    }
    else {
      this.UserAlertHandler()
    }
  }

  render() {
    const { user, getTotalPerItem, totalItemsInCart, totalCost, intlData, navigation, methodPayment, methodPaymentLogo, transaction } = this.props;

    const isEmpty = totalItemsInCart > 0 || totalItemsInCart === undefined ? false : true
    let address

    try {
      address = user.addresses[0]
      if (address == undefined) {
        address = intlData.messages.addresses.add
      }
    } catch {
      address = intlData.messages.addresses.add
    }

    const backgroundColor = methodPayment.includes("Amex") ? "Amex" : methodPayment.includes("Efectivo") ? "Warning" : "White"

    return (
      <SafeAreaView>
        <Spinner
          spinnerKey={"SpinnerCheckout"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
        <Block style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
          <Block style={styles.contentScreen}>
            <Block row style={styles.headerCheckout}>
              <Touchable onPress={this.props.onPressCloseScreen}>
                <Block style={styles.circleShadow} onPress={this.props.onPressCloseScreen}>
                  <Entypo name="chevron-left" size={24} color={nowTheme.COLORS.ICON} />
                </Block>
              </Touchable>
              <Block>
                <Text style={styles.title}>{this.props.intlData.messages.checkout.title}</Text>
              </Block>
            </Block>
            <ScrollView horizontal={false} style={styles.scrollViewCheckout}>
              <Block flex style={styles.orderDetailAddress}>
                <Block row space="between">
                  <Text style={styles.titleSection}>{intlData.messages.orderDetail.deliveryaddress}</Text>
                  <Touchable onPress={() => navigation.navigate('Addresses')}>
                    <Text style={styles.change}>{intlData.messages.checkout.change}</Text>
                  </Touchable>
                </Block>
                <Block style={styles.addressText}>
                  <Text style={styles.textSection}>{address}</Text>
                </Block>
              </Block>
              <Block>
                <Block style={styles.padding}>
                  <Block style={styles.productsSummary}>
                    <Text style={styles.titleSection}>{intlData.messages.orderDetail.productsummary}</Text>
                    {getTotalPerItem.map((item, index) => (
                      <Text
                        key={index}
                        style={styles.textProduct}
                      >
                        {item.product.name}
                      </Text>
                    ))}
                  </Block>
                </Block>
                <Block style={styles.padding}>
                  <Block row style={styles.orderDetailCost} space="between">
                    <Text style={styles.titleSection}>{intlData.messages.orderDetail.paydetail}</Text>
                    <Text style={styles.textSection}>{currencyFormat(totalCost)}</Text>
                  </Block>
                </Block>
                <Block style={styles.padding}>
                  <Block style={styles.productsSummary}>
                    <Block>
                      <Text style={styles.titleSection}>{intlData.messages.checkout.completepayment}</Text>
                    </Block>
                    <Text></Text>
                    <Block row style={styles.coupon}>
                      <MaterialCommunityIcons style={styles.ticket} name="ticket-percent" size={20} color={nowTheme.COLORS.MUTED} />
                      <Text style={styles.textProduct}>{intlData.messages.checkout.coupon}</Text>
                    </Block>
                    <Input
                      borderless
                      placeholder={intlData.messages.checkout.couponcode}
                      style={styles.input}
                      iconContent={null}
                    />
                  </Block>
                </Block>
                <Block style={styles.padding}>
                  <Block flex style={styles.orderDetailTrasaction}>
                    <Block row space="between">
                      <Text style={styles.titleSection}>{intlData.messages.orderDetail.transationdetail}</Text>
                      <Touchable onPress={() => navigation.navigate('Paymentmethod')}>
                        <Text style={styles.change}>{intlData.messages.checkout.change}</Text>
                      </Touchable>
                    </Block>
                    <Text></Text>
                    <Block row>
                      <Block>
                        <Img shadowless source={methodPaymentLogo} size="creditcard" color={backgroundColor} />
                      </Block>
                      <Block style={styles.detailTransaction}>
                        <Text style={styles.titleSection}>{intlData.messages.orderDetail.methodpayment}</Text>
                        <Block row space="between">
                          <Text style={styles.textSection}>{methodPayment}</Text>
                          <Text style={styles.textSection}>{currencyFormat(totalCost)}</Text>
                        </Block>
                      </Block>
                    </Block>
                    <Text></Text>
                    <Block>
                      {methodPayment != "Efectivo" ? (isIOS ? this.renderInstallmentsIos() : this.renderInstallmentsAndroid()) : null}
                    </Block>
                    <Text></Text>
                    <Block row space="between">
                      <Text style={styles.titleSection}>{intlData.messages.orderDetail.totalpay}</Text>
                      <Text style={styles.textSection}>{currencyFormat(totalCost)}</Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
            <Block flex={1} center style={styles.checkoutContentButtons}>
              <Block
                style={styles.checkbox}
                row
              >
                <Checkbox
                  initialValue={this.state.policy}
                  onChange={policy => this.acceptanceToken(policy)}
                  checkboxStyle={{
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: '#E3E3E3'
                  }}
                  color={nowTheme.COLORS.PIDENOS}
                  labelStyle={styles.checkboxlabel}
                  label={"Acepto "}
                />
                <Text> </Text>
                <Touchable>
                  <Text
                    style={styles.hyperlink}
                    onPress={() => { Linking.openURL(this.state.acceptancetoken.presigned_acceptance.permalink) }}
                  >
                    {intlData.messages.checkout.termsandconditions}
                  </Text>
                </Touchable>
                <Text style={styles.checkboxlabel}> para esta compra.</Text>
              </Block>
              <Button
                shadowless
                color={!this.state.policy ? nowTheme.COLORS.GRAY : nowTheme.COLORS.PIDENOS}
                onPress={this.checkout}
                disabled={!this.state.policy}
              >
                <Block
                  row
                  flex
                  style={isEmpty ? styles.emptyButtonPay : styles.blockButtonPay}
                >
                  <Block style={styles.badge}>
                    <Block style={styles.circleBadge}>
                      <Text style={[styles.itemsCartGoToPay, !this.state.policy && { color: nowTheme.COLORS.GRAY }]}>
                        {totalItemsInCart}
                      </Text>
                    </Block>
                  </Block>
                  <Text style={styles.buttonGoToPay}>
                    {intlData.messages.checkout.sendorder}
                  </Text>
                  <Text style={styles.totalGoToPay}>
                    {
                      totalCost <= 0 || totalCost === undefined ? "0.00"
                        :
                        currencyFormat(totalCost)
                    }
                  </Text>
                </Block>
              </Button>
            </Block>
          </Block>
        </Block>
      </SafeAreaView>
    );
  }

  renderInstallmentsIos = () => {
    return (
      <Block row space={"between"}>
        <Text style={styles.textSection}>No. de cuotas</Text>
        <Block>
          <RNPickerSelect
            value={this.state.installments}
            onValueChange={(value) => this.setState({ installments: value })}
            placeholder={{ label: "Seleccionar cuotas", value: "0" }}
            items={[
              { label: "1 cuotas", value: "1" },
              { label: "2 cuotas", value: "2" },
              { label: "3 cuotas", value: "3" },
              { label: "4 cuotas", value: "4" },
              { label: "5 cuotas", value: "5" },
              { label: "6 cuotas", value: "6" },
              { label: "7 cuotas", value: "7" },
              { label: "8 cuotas", value: "8" },
              { label: "9 cuotas", value: "9" },
              { label: "10 cuotas", value: "10" },
              { label: "11 cuotas", value: "11" },
              { label: "12 cuotas", value: "12" },
              { label: "13 cuotas", value: "13" },
              { label: "14 cuotas", value: "14" },
              { label: "15 cuotas", value: "15" },
              { label: "16 cuotas", value: "16" },
              { label: "17 cuotas", value: "17" },
              { label: "18 cuotas", value: "18" },
              { label: "19 cuotas", value: "19" },
              { label: "20 cuotas", value: "20" },
              { label: "21 cuotas", value: "21" },
              { label: "22 cuotas", value: "22" },
              { label: "23 cuotas", value: "23" },
              { label: "24 cuotas", value: "24" }
            ]}
          />
        </Block>
      </Block>
    )
  }

  renderInstallmentsAndroid = () => {
    return (
      <Block style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={styles.textSection}>No. de cuotas</Text>
        <Block
          style={{
            elevation: 3,
            marginRight: this.state.installments <= 9 ? -75 : -65
          }}
        >
          <Picker
            selectedValue={this.state.installments}
            style={{
              height: 20,
              width: 90
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ installments: itemValue })
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
            <Picker.Item label="24" value="24" />
          </Picker>
        </Block>
      </Block>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);