import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  AsyncStorage
} from 'react-native';
import { Block, Text } from 'galio-framework';
import { BlurView } from 'expo-blur';
import styled from "styled-components";
import { Button, Input, SocialButtons, Icon, Spinner, Root, Popup } from '../../components';
import { Images, nowTheme } from '../../constants';
import styles from './styles';
import { validateEmail, isIOS } from '../../constants/utils';

import { connect } from "react-redux";
import { getUser } from '../../services/user'
import { setName, setAvatar, getUser as getUserAction } from '../../services/user/selectors';
import { getLoginUser, getLoginUserError, getLoginUserPending } from '../../services/login';
import {
  loginFacebook as loginFacebookAction,
  loginFirebase as loginFirebaseAction,
  loginGoogle as loginGoogleAction
} from '../../services/login/selectors';

function mapStateToProps(state) {
  return {
    user: getUser(state),
    profile: getLoginUser(state),
    pending: getLoginUserPending(state),
    error: getLoginUserError(state)
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateName: (name) => dispatch(setName(name)),
  updateAvatar: (avatar) => dispatch(setAvatar(avatar)),
  loginFacebook: () => dispatch(loginFacebookAction()),
  loginFirebase: (email, password) => dispatch(loginFirebaseAction(email, password)),
  loginGoogle: () => dispatch(loginGoogleAction()),
  getUser: (userid) => dispatch(getUserAction(userid)),
});

const { width } = Dimensions.get('screen');

class Login extends React.Component {

  state = {
    email: "",
    password: ""
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  tapBackground = () => {
    Keyboard.dismiss();
    this.closeLogin();
  };

  _storeData = async (user) => {
    try {
      if (user) {
        await AsyncStorage.setItem('@pidenos:user', JSON.stringify(user, null, 2));
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  render() {
    const { intlData } = this.props

    return (
      <Root>
        <ImageBackground source={Images.RegisterBackground} cache='force-cache' style={styles.container}>
          <Spinner
            spinnerKey={"SpinnerLogin"}
            visible={this.props.pending}
            textContent={intlData.messages.loading}
            animation="fade"
          />
          <Block flex middle>
            <TouchableWithoutFeedback onPress={this.tapBackground}>
              <BlurView
                tint="default"
                intensity={250}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              />
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={isIOS ? "padding" : "height"}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Block style={styles.backContainer}>
                  <Block style={styles.loginContainer}>
                    <Block>
                      <Block>
                        <Block flex={0.8} style={styles.socialConnect}>
                          <Block middle>
                            <IconView>
                              <Image
                                source={Images.Logo}
                                cache='force-cache'
                                resizeMode="contain"
                                style={styles.horizontalImage}
                              />
                            </IconView>
                          </Block>
                          <Block flex={1} row middle>
                            <SocialButtons
                              signInWithFacebook={this.signInWithFacebook}
                              signInWithGoogle={this.signInWithGoogle}
                              style={styles}
                            />
                          </Block>
                        </Block>
                        <Block flex={0.1}>
                          <Text style={styles.text}>{intlData.messages.login.signbyemail}</Text>
                        </Block>
                        <Block flex={1} middle space="between">
                          <Block center flex={0.9}>
                            <Block flex space="between">
                              <Block>
                                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                  <Input
                                    right
                                    onChangeText={email => this.setState({ email })}
                                    placeholder={intlData.messages.login.email}
                                    style={styles.inputs}
                                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                    iconContent={
                                      <Icon
                                        size={16}
                                        name="email-852x"
                                        family="NowExtra"
                                      />
                                    }
                                  />
                                </Block>
                                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                  <Input
                                    password
                                    viewPass
                                    onChangeText={password => this.setState({ password })}
                                    placeholder={intlData.messages.login.password}
                                    style={styles.inputs}
                                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                    iconContent={null}
                                  />
                                </Block>
                                <Block style={styles.containerSignUp}>
                                  <Text style={styles.text} onPress={() => this.props.navigation.navigate("Register")}> {intlData.messages.login.register} </Text>
                                  <Text style={styles.text} onPress={() => this.props.navigation.navigate("ForgotPassword")}> {intlData.messages.login.forgotpassword} </Text>
                                </Block>
                              </Block>
                              <Button
                                gradient
                                style={styles}
                                onPress={this.signInWithFirebase}
                              >
                                <Text style={styles.buttonText} color={nowTheme.COLORS.WHITE}>
                                  {intlData.messages.login.loginin}
                                </Text>
                              </Button>
                            </Block>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </Block>
        </ImageBackground>
      </Root>
    );
  }

  signInWithFacebook = async (e) => {
    e.preventDefault();
    await this.props.loginFacebook()

    const { profile, error } = this.props
    if (!error && profile != null) {
      const firstName = profile.user.firstName
      const avatar = profile.user.avatar;
      this.props.updateName(firstName);
      this.props.updateAvatar(avatar);
      await this.props.getUser(profile.user)
      this.successLogin()
    }
    else if (error) {
      var errorMessage = error.message;
      this.errorLogin(errorMessage)
    }
  };

  signInWithGoogle = async (e) => {
    e.preventDefault();
    await this.props.loginGoogle()

    const { profile, error } = this.props
    if (!error && profile != null) {
      const firstName = profile.user.firstName
      const avatar = profile.user.avatar;
      this.props.updateName(firstName);
      this.props.updateAvatar(avatar);
      await this.props.getUser(profile.user)
      this.successLogin()
    }
    else if (error) {
      var errorMessage = error.message;
      this.errorLogin(errorMessage)
    }
  };

  signInWithFirebase = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (this.emailValidation(email)) {
      await this.props.loginFirebase(email, password)

      const { profile, error } = this.props
      if (!error && profile != null) {
        const firstName = profile.user.firstName
        this.props.updateName(firstName);
        await this.props.getUser(profile.user)
        this.successLogin()
      }
      else if (error) {
        var errorMessage = error.message;
        this.errorLogin(errorMessage)
      }
    }
  };

  errorLogin(errorMessage) {
    this.popupMessage(
      'Danger',
      this.props.intlData.messages.message.title,
      errorMessage,
      this.props.intlData.messages.message.tryAgain
    )
  }

  successLogin() {
    this.popupMessage(
      'Success',
      this.props.intlData.messages.message.success.title,
      this.props.intlData.messages.login.successmessage,
      this.props.intlData.messages.message.close
    )
  }

  emailValidation(email) {
    if (!validateEmail(email)) {
      this.popupMessage(
        'Warning',
        this.props.intlData.messages.message.title,
        this.props.intlData.messages.login.validEmail,
        this.props.intlData.messages.message.tryAgain,
      )
      return false
    }
    return true
  }


  closeLogin = () => {
    const { profile, user } = this.props
    if (user) {
      const currentUser = user
      currentUser.avatar = profile.user.avatar
      this._storeData(currentUser)
    }
    this.props.navigation.navigate("Home");
  }

  popupMessage = (type, title, textBody, buttontext) => {
    Popup.show({
      type: type,
      title: title,
      textBody: textBody,
      buttontext: buttontext,
      callback: () => type == "Success" ? this.closeLogin() : Popup.hide()
    })
  }
}

const IconView = styled.View`
  width: 90px;
  height: 90px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  background: white;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);