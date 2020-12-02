import React from "react";
import {
  ScrollView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Alert
} from "react-native";
import { Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome'
import { CreditCardInput } from "react-native-credit-card-input";

import { nowTheme, Images } from "../../constants"
import { PaymentItem, Touchable, Spinner, Button } from '../../components';

import { connect } from 'react-redux';
import { setMethodPayment as setMethodPaymentAction, clearMethodPayment as clearMethodPaymentAction } from '../../services/methodpayment/selectors';
import { getMethodPaymentName, getMethodPaymentLogo, getMethodPaymentCreditcard } from '../../services/methodpayment';
import { getCardToken } from '../../services/wompi/selectors'

function mapStateToProps(state) {
  return {
    methodPayment: getMethodPaymentName(state),
    methodPaymentLogo: getMethodPaymentLogo(state),
    methodPaymentCreditcard: getMethodPaymentCreditcard(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMethodPayment: (name, logo, creditcard) => dispatch(setMethodPaymentAction(name, logo, creditcard)),
  clearMethodPayment: () => dispatch(clearMethodPaymentAction())
});

class Paymentmethod extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      availablepaymentsmethod: [
        {
          title: this.props.methodPayment,
          image: this.props.methodPaymentLogo,
          selected: true
        }
      ],
      ready: false,
      SlideInLeft: new Animated.Value(0),
      slideUpValue: new Animated.Value(1),
      containerCreditCard: styles.containerCreditcard,
      formData: {},
      role: null,
      paymentsmethod: [
        {
          title: "Efectivo",
          image: Images.cash,
          selected: false
        },
        {
          title: "Tarjeta de Crédito/Débito",
          image: Images.creditcard,
          selected: false
        }
      ],
      pending: false
    }
  }

  componentDidMount() {
    this.setState({ paymentsmethod: this.state.paymentsmethod })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  updateMethodPayment = (item) => {
    const { setMethodPayment } = this.props

    setMethodPayment(item.title, item.image, null)

    this.setState({
      availablepaymentsmethod: [
        {
          title: item.title,
          image: item.image,
          selected: true
        }
      ]
    })

    if (item.title !== "Efectivo") {
      this._start()
    }
  }

  setCreditcard = async () => {
    const { setMethodPayment } = this.props
    const { formData } = this.state

    if (formData.valid) {

      const creditcard = this.getCreditcardImage(formData.values.type)
      const numberCreditcard = formData.values.number.replace(/\s/g, '')
      const lastNumbers = numberCreditcard.substr(numberCreditcard.length - 4)
      const title = creditcard.title.concat(" •••• ").concat(lastNumbers)
      const expiry = formData.values.expiry.split("/")

      const card = {
        number: numberCreditcard,
        cvc: formData.values.cvc,
        exp_month: expiry[0],
        exp_year: expiry[1],
        card_holder: formData.values.name
      }

      this.setState({ pending: true })

      await getCardToken(card)
        .then((result) => {
          if (result.status === 'CREATED') {
            setMethodPayment(title, creditcard.image, result.data)
            this.setState({ availablepaymentsmethod: [{ title: title, image: creditcard.image, selected: true }] })
            this.setState({ pending: false })
            this.props.navigation.goBack()
          }
          else {
            try {
              this.AlertMessage(result.error.messages.number[0])
            }
            catch {
              this.AlertMessage("La tarjeta de crédito no es válida.")
            }
          }
        })
        .catch((error) => {
          this.AlertMessage("La tarjeta de crédito no es válida.")
        });
    }
    else {
      this.AlertMessage("La tarjeta de crédito no es válida.")
    }
  }

  AlertMessage = (message) => {
    Alert.alert(
      this.props.intlData.messages.message.title,
      message,
      [
        { text: this.props.intlData.messages.message.tryAgain, onPress: () => this.updateStatus() },
      ],
      { cancelable: false }
    );
  }

  updateStatus() {
    this.setState({ pending: false })
  }

  render() {
    const { intlData } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <Spinner
            spinnerKey={"SpinnerPayment"}
            visible={this.state.pending}
            textContent={intlData.messages.loading}
            animation="fade"
          />
          <View style={styles.container}>
            <View style={styles.card}>
              {this.renderPaymentMethod()}
              {this.renderCreditCard()}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderPaymentMethod() {
    const { availablepaymentsmethod, slideUpValue } = this.state
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-600, 0]
              })
            }
          ]
        }}
      >
        <View style={styles.touchableOpacity}>
          <Touchable onPress={() => this.props.navigation.goBack()}>
            <View style={styles.circleShadow}>
              <Icon name="close" size={24} color="black" />
            </View>
          </Touchable>
        </View>
        <Text style={styles.titlePayment}>Escoge un método de pago</Text>
        <Text style={styles.subtitlePayment}>Método de pago</Text>
        <View>
          {availablepaymentsmethod.length > 0 ?
            <View>
              {availablepaymentsmethod.map((item, index) => (
                <PaymentItem
                  key={index}
                  title={item.title}
                  image={item.image}
                  selected={item.selected}
                  style={styles}
                />
              ))}
            </View>
            :
            <View>
              <Text style={styles.noMethodpayment}>Aún no tiene métodos de pago configurados</Text>
            </View>
          }
        </View>
        <View style={{ marginTop: 30, marginBottom: 16 }}>
          <View style={styles.divider} />
        </View>
        <View>
          <Text style={styles.subtitlePayment}>Adicionar método de pago</Text>
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
            <View>
              {this.state.paymentsmethod.map((item, index) => (
                <PaymentItem
                  key={index}
                  title={item.title}
                  image={item.image}
                  style={styles}
                  onPress={this.updateMethodPayment.bind(this, item)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    )
  }

  renderCreditCard() {
    const { SlideInLeft } = this.state
    return (
      <Animated.View
        style={[{
          transform: [
            {
              translateY: SlideInLeft.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0]
              })
            }
          ]
        },
        this.state.containerCreditCard]}
      >
        <View style={styles.touchableBack}>
          <Touchable onPress={() => this._back()}>
            <View style={styles.circleShadow}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </Touchable>
        </View>
        <View>
          <CreditCardInput
            requiresName
            requiresCVC
            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onChange={this._onChange}
            labels={{
              number: "NÚMBERO TARJETA",
              expiry: "FECHA",
              cvc: "CVC/CCV",
              postalCode: "CÓDIGO POSTAL",
              name: "NOMBRE COMPLETO"
            }}
            placeholders={{
              name: "Nombre Completo",
              number: "1234 5678 1234 5678",
              expiry: "MM/YY",
              cvc: "CVC",
              postalCode: "34567",
            }}
          />
        </View>
        <View style={{
          marginTop: nowTheme.SIZES.BASE,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Button
            small
            style={{ backgroundColor: nowTheme.COLORS.PIDENOS }}
            onPress={() => this.setCreditcard()}
          >
            <Text style={styles.name}>Validar</Text>
          </Button>
        </View>
      </Animated.View>
    )
  }

  _onChange = (formData) => this.setState({ formData: formData });

  _start = () => {
    this.setState({ containerCreditCard: styles.containerAbsolute })
    return Animated.parallel([
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.slideUpValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  };

  _back = () => {
    Keyboard.dismiss()
    this.setState({ containerCreditCard: styles.containerCreditcard })
    return Animated.parallel([
      Animated.timing(this.state.SlideInLeft, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.slideUpValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  };

  getCreditcardImage(type) {
    switch (type) {
      case 'visa':
        return {
          title: "Visa",
          image: Images.visaIcon
        };
      case 'american-express':
        return {
          title: "Amex",
          image: Images.amexIcon
        };
      case 'diners-club':
        return {
          title: "Diners Club",
          image: Images.dinersclubIcon
        };
      case 'master-card':
        return {
          title: "Mastercard",
          image: Images.mastercardIcon
        };
      case 'discover':
        return {
          title: "Discover",
          image: Images.discoverIcon
        };
      case 'jcb':
        return {
          title: "JCB",
          image: Images.jcbIcon
        };
      case 'unionpay':
        return {
          title: "Union Pay",
          image: Images.unionpayIcon
        };
      default: return {
        title: "Tarjeta de Crédito/Débito",
        image: Images.creditcard
      };
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paymentmethod);

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: nowTheme.SIZES.WIDHT,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: nowTheme.SIZES.BASE * 2
  },
  container: {
    flex: 1
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    flex: 0.8,
    width: nowTheme.SIZES.WIDHT - (nowTheme.SIZES.BASE * 3)
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginLeft: nowTheme.SIZES.BASE
  },
  noMethodpayment: {
    color: nowTheme.COLORS.MUTED,
    fontSize: 14,
    marginTop: nowTheme.SIZES.BASE * 2,
    alignSelf: "center"
  },
  titlePayment: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: nowTheme.SIZES.BASE
  },
  subtitlePayment: {
    color: nowTheme.COLORS.PIDENOS,
    fontSize: 14,
    fontWeight: "bold",
    padding: nowTheme.SIZES.BASE
  },
  circleShadow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3
  },
  touchableOpacity: {
    margin: nowTheme.SIZES.BASE,
    alignItems: "flex-end"
  },
  touchableBack: {
    margin: nowTheme.SIZES.BASE,
    alignItems: "flex-start"
  },
  containerAbsolute: {
    backgroundColor: nowTheme.COLORS.WHITE,
    position: "absolute",
    borderRadius: 14
  },
  containerCreditcard: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 14
  },
  label: {
    color: "black",
    fontSize: 10,
  },
  input: {
    fontSize: 14,
    color: "black"
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff',
    textTransform: "capitalize",
  }
});    