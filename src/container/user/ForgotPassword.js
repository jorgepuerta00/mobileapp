import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ImageBackground,
} from 'react-native';
import { Block, Text } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';
import { Spinner } from '../../components';
import { Button, Icon, Input, Touchable } from '../../components';
import { Images, nowTheme } from '../../constants';
import styles from './styles';
import { validateEmail } from '../../constants/utils';

import { connect } from "react-redux";
import { resetPassword as resetPasswordAction } from '../../services/passwordReset/selectors';
import { getResetPassword, getResetPasswordPending, getResetPasswordError } from '../../services/passwordReset';

function mapStateToProps(state) {
  return {
    payload: getResetPassword(state),
    pending: getResetPasswordPending(state),
    error: getResetPasswordError(state)
  };
}

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (email) => dispatch(resetPasswordAction(email))
});

const { width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class ForgotPassword extends React.Component {

  state = {
    email: ""
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  closeLogin = () => {
    this.props.navigation.navigate("Home");
  }

  successLogin() {
    this.showAlert(
      this.props.intlData.messages.message.success.resetpassword,
      this.props.intlData.messages.passwordreset.successmessage,
      this.props.intlData.messages.message.close
    )
  }

  showAlert = (title, message, buttonText) => {
    Alert.alert(
      title,
      message,
      [
        { text: buttonText },
      ],
      { cancelable: false },
    )
  }

  render() {
    const { intlData } = this.props
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            cache='force-cache'
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block style={styles.loading}>
              <Spinner
                spinnerKey={"SpinnerForgotPassword"}
                visible={this.props.pending}
                textContent={intlData.messages.loading}
                animation="fade"
              />
            </Block>
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block middle style={styles.buttonClose}>
                  <Touchable onPress={() => this.props.navigation.goBack()}>
                    <Block style={[styles.circleShadow]}>
                      <FontAwesome name="close" size={24} color="black" />
                    </Block>
                  </Touchable>
                </Block>
                <Block flex>
                  <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      {intlData.messages.passwordreset.title}
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              right
                              onChangeText={email => this.setState({ email })}
                              placeholder={intlData.messages.passwordreset.email}
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  name="email-852x"
                                  family="NowExtra"
                                />
                              }
                            />
                          </Block>
                        </Block>
                        <Button
                          gradient
                          style={styles}
                          onPress={this.passwordResetFirebase}
                        >
                          <Text style={styles.buttonText} color={nowTheme.COLORS.WHITE}>
                            {intlData.messages.passwordreset.resetpasswordbutton}
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }

  passwordResetFirebase = (e) => {
    e.preventDefault();

    const { email } = this.state;

    if (this.fieldsValidation(email) && this.emailValidation(email)) {
      this.props.resetPassword(email)
        .then(response => {
          const { error } = this.props
          if (!error) {
            this.successLogin()
          }
        })
        .catch(function (error) {
          var errorMessage = error.message;
          Alert.alert("Reset Password Firebase", errorMessage)
        });
    }
  };

  fieldsValidation(email) {
    if (!email) {
      const title = this.props.intlData.messages.message.title
      const message = this.props.intlData.messages.register.fieldRequired
      const buttonText = this.props.intlData.messages.message.tryAgain
      this.showAlert(title, message, buttonText)
      return false
    }
    return true
  }

  emailValidation(email) {
    if (!validateEmail(email)) {
      const title = this.props.intlData.messages.message.title
      const message = this.props.intlData.messages.login.validEmail
      const buttonText = this.props.intlData.messages.message.tryAgain
      this.showAlert(title, message, buttonText)
      return false
    }
    return true
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);