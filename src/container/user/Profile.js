import React from 'react';
import {
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Block, Text } from 'galio-framework';
import styled from "styled-components";
import { Button, SwitchSelector, Spinner, Input } from '../../components';
import { Images, nowTheme } from '../../constants';
import { isIOS } from '../../constants/utils'
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import moment from 'moment'

import { connect } from "react-redux";
import { setName, createUser as saveUserAction } from '../../services/user/selectors';
import { getUser, getUserPending, getUserError } from '../../services/user';

import { validateEmail } from '../../constants/utils';

function mapStateToProps(state) {
  return {
    user: getUser(state),
    pending: getUserPending(state),
    error: getUserError(state),
  };
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserAction(user)),
  updateName: (name) => dispatch(setName(name))
});

class Profile extends React.Component {

  constructor(props) {
    super(props);
    const { user } = this.props
    this.state = {
      show: false,
      firstName: user.firstName && user.firstName,
      lastName: user.lastName && user.lastName,
      email: user.email && user.email,
      mobile: user.mobile && user.mobile,
      gender: user.gender && user.gender,
      birthdate: user.birthdate == null ? new Date() : user.birthdate,
      gendercode: user.gender == null ? 0 : user.gender == 'F' ? 0 : 1
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  setDate = (event, date) => {
    if (date === undefined) {
      this.setState({ show: false })
    }
    else {
      if (!isIOS) {
        this.setState({ show: false })
      }
      this.setState({ birthdate: date })
    }
  };

  saveUser = () => {
    const { user, saveUser } = this.props
    const { firstName, lastName, email, mobile, gender, birthdate } = this.state

    if (this.emailValidation(email)) {
      const userUpdated = user
      userUpdated.firstName = firstName
      userUpdated.lastName = lastName
      userUpdated.email = email
      userUpdated.mobile = mobile
      userUpdated.gender = gender
      userUpdated.birthdate = birthdate

      saveUser(userUpdated)
      this.props.updateName(firstName)
    }
  };

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

  showAlert = (title, message, buttonText) => {
    Alert.alert(
      title,
      message,
      [
        { text: buttonText }
      ],
      { cancelable: false }
    )
  }

  render() {
    const { name, avatar, intlData } = this.props
    return (
      <Block flex style={styles.containerProfile}>
        <Spinner
          spinnerKey={"SpinnerProfile"}
          visible={this.props.pending}
          textContent={intlData.messages.loading}
          animation="fade"
          size="small"
        />
        <Block flex style={styles.header}>
          <Background source={Images.Header} style={styles.profileContainer} />
          <Block flex>
            <Block middle style={styles.avatarBlock}>
              <Image source={{ uri: avatar, cache: 'force-cache' }} style={styles.avatar} />
            </Block>
            <Block middle style={styles.infoProfile}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{this.state.email}</Text>
            </Block>
          </Block>
        </Block>
        <Block middle style={styles.buttonSave}>
          <Button
            color="pidenos"
            style={styles.buttonProfile}
            round
            onPress={() => this.saveUser()}
          >
            {intlData.messages.profile.save}
          </Button>
        </Block>
        <Block style={styles.blockDataUser}>
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
            <Block flex>
              <Block style={styles.userItem}>
                <Text style={styles.profileText}>{intlData.messages.profile.firstname}</Text>
                <Input
                  value={this.state.firstName}
                  onChangeText={firstName => this.setState({ firstName })}
                  placeholder={intlData.messages.profile.firstname}
                  style={styles.inputs}
                  iconContent={null}
                />
              </Block>
              <Block style={styles.userItem}>
                <Text style={styles.profileText}>{intlData.messages.profile.lastname}</Text>
                <Input
                  value={this.state.lastName}
                  onChangeText={lastName => this.setState({ lastName })}
                  placeholder={intlData.messages.profile.lastname}
                  style={styles.inputs}
                  iconContent={null}
                />
              </Block>
              <Block style={styles.userItem}>
                <Text style={styles.profileText}>{intlData.messages.profile.email}</Text>
                <Input
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  placeholder={intlData.messages.profile.email}
                  style={styles.inputs}
                  iconContent={null}
                />
              </Block>
              <Block style={styles.userItem}>
                <Text style={styles.profileText}>{intlData.messages.profile.mobile}</Text>
                <Input
                  value={this.state.mobile}
                  onChangeText={mobile => this.setState({ mobile })}
                  placeholder={intlData.messages.profile.mobile}
                  style={styles.inputs}
                  iconContent={null}
                />
              </Block>
              <Block style={styles.userItem}>
                <Text style={styles.profileText}>{intlData.messages.profile.birthdate}</Text>
                <Button
                  textAlign={styles.textAlign}
                  shadowless
                  color="white"
                  style={styles.buttonDataPicker}
                  round
                  onPress={() => this.setState({ show: !this.state.show })}
                >
                  {moment(this.state.birthdate).format('DD/MM/YYYY')}
                </Button>
                {this.state.show &&
                  <Block style={styles.containerDataPicker}>
                    <DateTimePicker
                      value={this.state.birthdate}
                      mode={'date'}
                      display="default"
                      onChange={this.setDate}
                      locale={intlData.messages.locale}
                      minimumDate={new Date(1920, 0, 1)}
                      maximumDate={new Date()}
                    />
                  </Block>
                }
              </Block>
              <Block style={styles.userItem}>
                <Text style={styles.profileText}>{intlData.messages.profile.gender}</Text>
                <SwitchSelector
                  initial={this.state.gendercode}
                  onPress={value => this.setState({ gender: value })}
                  textColor={nowTheme.COLORS.BLACK}
                  selectedColor={nowTheme.COLORS.BLACK}
                  buttonColor={nowTheme.COLORS.WHITE}
                  borderColor={nowTheme.COLORS.BACKGROUND_BUTTON}
                  backgroundColor={nowTheme.COLORS.BACKGROUND_BUTTON}
                  borderRadius={5}
                  height={50}
                  hasPadding
                  options={[
                    { label: intlData.messages.profile.female, value: "F" },
                    { label: intlData.messages.profile.male, value: "M" }
                  ]}
                />
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;