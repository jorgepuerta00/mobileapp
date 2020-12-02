import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from "react-native";
import { Block, Text } from 'galio-framework';
import { nowTheme } from "../../constants"
import { FontAwesome, Entypo } from '@expo/vector-icons';
import styles from './styles';
import { Spinner } from '../../components';
import { Input, SwipeableRow, Touchable, Button } from '../../components';

import { connect } from 'react-redux';
import { createUser as saveAddressesAction } from '../../services/user/selectors';
import { getUserPending, getUserError } from '../../services/user';

function mapStateToProps(state) {
  return {
    pending: getUserPending(state),
    error: getUserError(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveAddresses: (newUser) => dispatch(saveAddressesAction(newUser))
});

class Addresses extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  state = {
    addressValue: "",
    addresses: this.props.user != null ? this.props.user.addresses : [],
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  shouldComponentRender() {
    if (this.props.pending === false || this.props.user == null)
      return false;
    return true;
  }

  saveAddresses = () => {
    const { user, saveAddresses } = this.props
    const { addresses, addressValue } = this.state

    if (addressValue != "") {
      if (addresses.every((item) => item.toLowerCase() !== addressValue.toLowerCase())) {
        addresses.push(addressValue);
      }
      else {
        Alert.alert(this.props.intlData.messages.message.warning.title, this.props.intlData.messages.addresses.addressexist)
      }
    }

    if (user != null) {
      if (addressValue) {
        const newUser = user
        newUser.addresses = addresses
        saveAddresses(newUser)
      }
    }
    else {
      Alert.alert(this.props.intlData.messages.message.warning.title, this.props.intlData.messages.addresses.addresswarning)
      this.props.navigation.navigate('Login')
    }

    Keyboard.dismiss()
  };

  removeAddress = (item) => {
    const { user, saveAddresses } = this.props
    const { addresses } = this.state

    var array = [...addresses];
    var index = array.indexOf(item)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ addresses: array });
    }
    const newUser = user
    newUser.addresses = array
    saveAddresses(newUser)
  };

  renderAddresses = () => {
    const { intlData, onPressCloseScreen } = this.props;
    const { addresses } = this.state

    return (
      <KeyboardAvoidingView>
        <Block
          style={[styles.containerDetail]}
        >
          <Block
            flex
            style={styles.contentScreen}
          >
            <Touchable onPress={onPressCloseScreen} style={styles.touchableOpacity}>
              <Block style={styles.circleShadow}>
                <FontAwesome name="close" size={24} color="black" />
              </Block>
            </Touchable>
            <Block>
              <Text style={styles.title}>{intlData.messages.addresses.title}</Text>
            </Block>
            <Block style={styles.inputAddresses}>
              <Input
                right
                color="black"
                style={styles.searchAddresses}
                maxLength={30}
                placeholder={intlData.messages.addresses.search}
                placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                iconContent={
                  <Entypo name="location-pin" size={24} color="black" />
                }
                onChangeText={addressValue => this.setState({ addressValue: addressValue })}
              />
            </Block>
            <Button
              gradient
              style={styles}
              onPress={() => this.saveAddresses()}
            >
              <Text style={styles.buttonText} color={nowTheme.COLORS.WHITE}>
                {intlData.messages.addresses.add}
              </Text>
            </Button>
            <Block safe flex >
              <ScrollView horizontal={false} style={styles.containerAddresses} showsVerticalScrollIndicator={false}>
                {addresses.length > 0 ?
                  <Block style={styles.itemsStyle}>
                    {addresses.map((item, index) => (
                      <SwipeableRow
                        key={index}
                        item={item}
                        style={styles}
                        title={intlData.messages.cart.delete}
                        onPressRemove={() => this.removeAddress(item)}
                        type="address"
                      />
                    ))}
                  </Block>
                  :
                  <Block>
                    <Text style={styles.noAddresses}>{intlData.messages.addresses.noaddresses}</Text>
                  </Block>
                }
              </ScrollView>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  };

  render() {
    const { user, error, intlData } = this.props;

    if (this.shouldComponentRender() || user === undefined) {
      return (
        <Spinner
          spinnerKey={"SpinnerAddress"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
      )
    }

    return (
      <Block flex center style={styles.home}>
        {  error ? <Text style={styles.card}>{intlData.messages.message.title}</Text> :
          this.renderAddresses()
        }
      </Block>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addresses);