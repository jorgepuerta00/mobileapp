import React from 'react';
import { StyleSheet } from "react-native";
import { Text } from "galio-framework";
import { nowTheme } from "../constants";
import PropTypes from 'prop-types';
import { score } from 'react-native-zxcvbn';

class PasswordStrengthMeter extends React.Component {

  state = {
    strength: 0
  }

  createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return this.props.intlData.messages.PasswordStrengthMeter.strengthWeak;
      case 1:
        return this.props.intlData.messages.PasswordStrengthMeter.strengthWeak;
      case 2:
        return this.props.intlData.messages.PasswordStrengthMeter.strengthFair;
      case 3:
        return this.props.intlData.messages.PasswordStrengthMeter.strengthGood;
      case 4:
        return this.props.intlData.messages.PasswordStrengthMeter.strengthStrong;
      default:
        return this.props.intlData.messages.PasswordStrengthMeter.strengthWeak;
    }
  }

  render() {
    const { password } = this.props
    const { strength } = this.state
    let customStyle
    try{

      score(password)
        .then(result => 
          this.setState({strength:result})
        );

      switch (strength) {
        case 0: customStyle = styles.strengthWeak;
                break;
        case 1: customStyle = styles.strengthWeak;
                break;
        case 2: customStyle = styles.strengthFair;
                break;      
        case 3: customStyle = styles.strengthGood;
                break;
        case 4: customStyle = styles.strengthStrong;
                break;
        default: customStyle = styles.strengthWeak;
      }
    }
    catch{
      strength = 0;
      customStyle = styles.strengthWeak;
    }

    return (
        <Text 
          bold 
          size={12} 
          style={customStyle}> 
          {this.createPasswordLabel(strength)} 
        </Text>
      )
  }
}

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string
}

const styles = StyleSheet.create({
  strengthWeak: {
    color: nowTheme.COLORS.WEAK
  },
  strengthFair: {
    color: nowTheme.COLORS.FAIR
  },
  strengthGood: {
    color: nowTheme.COLORS.GOOD
  },
  strengthStrong: {
    color: nowTheme.COLORS.STRONG
  }
});

export default PasswordStrengthMeter;