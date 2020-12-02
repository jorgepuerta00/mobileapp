import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import { Block, Checkbox, Text } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';
import { Spinner } from '../../components';
import { Button, Icon, Input, Touchable, SocialButtons, Root, Popup } from '../../components';
import { Images, nowTheme } from '../../constants';
import styles from './styles';
import { validateEmail } from '../../constants/utils';

import { connect } from "react-redux";

import {
  setName,
  setAvatar,
  getUser as getUserAction
} from '../../services/user/selectors';

import {
  loginFacebook as loginFacebookAction,
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordAction,
  loginGoogle as loginGoogleAction
} from '../../services/login/selectors';

import { getLoginUser, getLoginUserError, getLoginUserPending } from '../../services/login';

function mapStateToProps(state) {
  return {
    profile: getLoginUser(state),
    pending: getLoginUserPending(state),
    error: getLoginUserError(state)
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateName: (name) => dispatch(setName(name)),
  updateAvatar: (avatar) => dispatch(setAvatar(avatar)),
  loginFacebook: () => dispatch(loginFacebookAction()),
  createUserWithEmailAndPassword: (email, password) => dispatch(createUserWithEmailAndPasswordAction(email, password)),
  loginGoogle: () => dispatch(loginGoogleAction()),
  getUser: (userid) => dispatch(getUserAction(userid)),
});

const { width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {

  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    privatePolicy: false,
    pending: false
  };

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this._retrieveData()
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  shouldComponentRender() {
    if (this.props.pending === false)
      return false;
    return true;
  }

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

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@pidenos:privacypolicy');
      if (value !== null) {
        var isTrueSet = (value === 'true');
        this.setState({ privatePolicy: isTrueSet })
      }
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    const { intlData } = this.props
    return (
      <Root>
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
                  spinnerKey={"SpinnerRegister"}
                  visible={this.shouldComponentRender()}
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
                    <Block flex={0.3} style={styles.socialConnect}>
                      <Block flex={0.3} middle>
                        <Text style={styles.titleRegister} muted>
                          {intlData.messages.register.title}
                        </Text>
                      </Block>
                      <Block flex={1} row middle>
                        <SocialButtons
                          signInWithFacebook={this.signInWithFacebook}
                          signInWithGoogle={this.signInWithGoogle}
                          style={styles}
                        />
                      </Block>
                    </Block>
                    <Block flex={0.1} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        muted
                        size={16}
                      >
                        {intlData.messages.register.signbyemail}
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
                                placeholder={intlData.messages.register.email}
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
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                password
                                viewPass
                                onChangeText={password => this.setState({ password })}
                                placeholder={intlData.messages.register.password}
                                style={styles.inputs}
                                placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                iconContent={null}
                              />
                            </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                password
                                viewPass
                                onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                                placeholder={intlData.messages.register.passwordconfirm}
                                style={styles.inputs}
                                placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                iconContent={null}
                              />
                            </Block>
                            {/* <Block row style={styles.passwordCheck}>
                                <Text style={styles.passwordStrength}>{intlData.messages.register.passwordStrength}</Text>
                                <PasswordStrengthMeter intlData={intlData} password={this.state.password}/>
                              </Block> */}
                            <Block
                              style={styles.checkbox}
                              row
                            >
                              <Checkbox
                                initialValue={this.state.privatePolicy}
                                onChange={privatePolicy => this.setState({ privatePolicy })}
                                checkboxStyle={{
                                  borderWidth: 1,
                                  borderRadius: 2,
                                  borderColor: '#E3E3E3'
                                }}
                                color={nowTheme.COLORS.PIDENOS}
                                labelStyle={styles.checkboxlabel}
                                label={intlData.messages.register.termsandconditions}
                              />
                              <Text> </Text>
                              <Touchable>
                                <Text
                                  style={styles.hyperlink}
                                  onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
                                >
                                  {intlData.messages.register.checkboxlabel}
                                </Text>
                              </Touchable>
                            </Block>
                          </Block>
                          <Button
                            gradient
                            style={styles}
                            onPress={this.signUpWithFirebase}
                          >
                            <Text style={styles.buttonText} color={nowTheme.COLORS.WHITE}>
                              {intlData.messages.register.signup}
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
      </Root>
    );
  }

  signInWithFacebook = async (e) => {
    e.preventDefault();
    const { privatePolicy } = this.state;

    if (this.privacyPolicyValidation(privatePolicy)) {
      await this.props.loginFacebook()

      const { profile, error } = this.props
      if (!error && profile) {
        const firstName = profile.user.firstName
        const avatar = profile.user.avatar;
        this.props.updateName(firstName);
        this.props.updateAvatar(avatar);
        this.props.getUser(profile.user)
        this.successLogin()
      }
      else if (error) {
        var errorMessage = error.message;
        this.errorLogin(errorMessage)
      }
    }
  };

  signInWithGoogle = async (e) => {
    e.preventDefault();
    const { privatePolicy } = this.state;

    if (this.privacyPolicyValidation(privatePolicy)) {
      await this.props.loginGoogle()

      const { profile, error } = this.props
      if (!error && profile) {
        const firstName = profile.user.firstName
        const avatar = profile.user.avatar;
        this.props.updateName(firstName);
        this.props.updateAvatar(avatar);
        this.props.getUser(profile.user)
        this.successLogin()
      }
      else if (error) {
        var errorMessage = error.message;
        this.errorLogin(errorMessage)
      }
    }
  };

  signUpWithFirebase = async (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm, privatePolicy } = this.state;

    if (this.fieldsValidation(email, password, passwordConfirm) &&
      this.emailValidation(email) &&
      this.privacyPolicyValidation(privatePolicy) &&
      this.passwordValidation(password, passwordConfirm)
    ) {
      await this.props.createUserWithEmailAndPassword(email, password)

      const { profile, error } = this.props
      if (!error && profile !== undefined) {
        const firstName = profile.user.firstName
        this.props.updateName(firstName);
        this.props.getUser(profile.user)
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

  privacyPolicyValidation(privatePolicy) {
    if (!privatePolicy) {
      const message = this.props.intlData.messages.register.privacyPolicyRequired
      this.errorLogin(message)
      return false
    }
    return true
  }

  passwordValidation(password, passwordConfirm) {
    if (password != passwordConfirm) {
      const message = this.props.intlData.messages.register.passwordvalidation
      this.errorLogin(message)
      return false
    }
    return true
  }

  fieldsValidation(email, password, passwordConfirm) {
    if (!email || !password || !passwordConfirm) {
      const message = this.props.intlData.messages.register.fieldRequired
      this.errorLogin(message)
      return false
    }
    return true
  }

  emailValidation(email) {
    if (!validateEmail(email)) {
      const message = this.props.intlData.messages.login.validEmail
      this.showAlert(message)
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
      callback: () => type == 'Success' ? this.closeLogin() : Popup.hide()
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);