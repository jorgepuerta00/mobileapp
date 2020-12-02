import React from "react";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { Block, Text } from 'galio-framework';
import { nowTheme } from "../../constants"
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { Spinner, Root, Popup, Toast } from '../../components';
import { Input, Touchable, Button } from '../../components';
import { validateEmail } from '../../constants/utils';

import { connect } from 'react-redux';
import { setName, createUser as saveUserAction } from '../../services/user/selectors';
import { getUserPending, getUserError } from '../../services/user';

function mapStateToProps(state) {
  return {
    pending: getUserPending(state),
    error: getUserError(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserAction(user)),
  updateName: (name) => dispatch(setName(name))
});

class ContactInformation extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  state = {
    name: this.props.user != null ? this.props.user.firstName : "",
    mobile: this.props.user != null ? this.props.user.mobile : "",
    email: this.props.user != null ? this.props.user.email : "",
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

  saveUser = () => {
    const { user, saveUser, navigation } = this.props
    const { name, mobile, email } = this.state

    if (this.emailValidation(email)) {
      const userUpdated = user
      userUpdated.firstName = name
      userUpdated.email = email
      userUpdated.mobile = mobile

      saveUser(userUpdated)
      this.props.updateName(name)
      this.ToastMessage('Success', this.props.intlData.messages.message.success.welldone, this.props.intlData.messages.message.success.save)
    }
    Keyboard.dismiss()
    navigation.goBack()
  };

  emailValidation(email) {
    if (!validateEmail(email)) {
      const title = this.props.intlData.messages.message.title
      const message = this.props.intlData.messages.login.validEmail
      const buttonText = this.props.intlData.messages.message.tryAgain
      this.popupMessage('Danger', title, message, buttonText)
      return false
    }
    return true
  }

  popupMessage = (type, title, textBody, buttontext) => {
    Popup.show({
      type: type,
      title: title,
      textBody: textBody,
      buttontext: buttontext,
      callback: () => type == type ? this.props.navigation.goBack() : Popup.hide()
    })
  }

  ToastMessage = (type, title, text) => {
    Toast.show({
      title: title,
      text: text,
      type: type
    })
  }

  renderContactInformation = () => {
    const { intlData, onPressCloseScreen } = this.props;
    return (
      <Root>
        <KeyboardAvoidingView>
          <Block style={[styles.containerDetail]}>
            <Block flex style={styles.contentContactInformation}>
              <Touchable onPress={onPressCloseScreen} style={styles.touchableOpacityContactInformation}>
                <Block style={styles.circleShadow}>
                  <FontAwesome name="close" size={24} color="black" />
                </Block>
              </Touchable>
              <Block>
                <Text style={styles.titleContactInformation}>{intlData.messages.ContactInformation.title}</Text>
              </Block>
              <Block style={styles.inputContactInformation}>
                <Input
                  right
                  color="black"
                  style={styles.inputs}
                  maxLength={30}
                  placeholder={intlData.messages.ContactInformation.name}
                  placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                  iconContent={null}
                  onChangeText={name => this.setState({ name: name })}
                  value={this.state.name}
                />
                <Input
                  right
                  color="black"
                  style={styles.inputs}
                  maxLength={30}
                  placeholder={intlData.messages.ContactInformation.mobile}
                  placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                  iconContent={null}
                  onChangeText={mobile => this.setState({ mobile: mobile })}
                  value={this.state.mobile}
                />
                <Input
                  right
                  color="black"
                  style={styles.inputs}
                  maxLength={30}
                  error
                  placeholder={intlData.messages.ContactInformation.email}
                  placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                  iconContent={null}
                  onChangeText={email => this.setState({ email: email })}
                  value={this.state.email}
                />
              </Block>
              <Button
                gradient
                style={styles}
                onPress={() => this.saveUser()}
              >
                <Text style={styles.buttonText} color={nowTheme.COLORS.WHITE}>
                  {intlData.messages.ContactInformation.save}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Root>
    );
  };

  render() {
    const { user, error, intlData } = this.props;

    if (this.shouldComponentRender() || user === undefined) {
      return (
        <Spinner
          spinnerKey={"SpinnerContactInformation"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
      )
    }

    return (
      <Block flex center>
        {  error ? <Text>{intlData.messages.message.title}</Text> :
          this.renderContactInformation()
        }
      </Block>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInformation);