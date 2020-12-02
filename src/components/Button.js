import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { Text, Block, Button } from 'galio-framework';
import nowTheme from '../constants/Theme';
import { AntDesign } from '@expo/vector-icons';
import { isIOS } from '../constants/utils'

class ArButton extends React.Component {
  render() {
    const { 
      small,
      medium,
      gradient,
      shadowless, 
      children, 
      color, 
      style, 
      fontSize, 
      round, 
      buttonCart, 
      onPressDecrement, 
      onPressIncrement, 
      onPressRemove,
      onPress,
      quantity,
      flex,
      textAlign,
      iconContent,
      disabled,
      ...props 
    } = this.props;

    const colorStyle = color && nowTheme.COLORS[color.toUpperCase()];

    const buttonStyles = [
      small && styles.smallButton,
      medium && styles.mediumButton,
      colorStyle === 'neutral'
        ? { backgroundColor: 'rgba(0,0,0,0)' }
        : color && { backgroundColor: colorStyle },
      round && { borderRadius: nowTheme.SIZES.BASE * 2 },
      !shadowless && styles.shadow,
      { ...style }
    ];

    const isNumber = isNaN(quantity) ? false : true

    const colorText = color == 'white' ? "black" : 'white'

    return <Block>
            { buttonCart ?         
              <Block row flex={flex} style={[style, styles.shadow]}>
                <TouchableWithoutFeedback onPress={onPressDecrement}>
                  <Block style={[styles.optionsButtonLeft]}>
                    <AntDesign style={{marginLeft: 18, marginTop: 5}} name="minus" size={16} color="black" />
                  </Block>
                </TouchableWithoutFeedback>
                {isNumber ?
                  <Text style={styles.optionsButtonCenter}>{quantity}</Text>
                : 
                  <View
                    style={{
                    height: "100%",
                    borderLeftWidth: 1,
                    borderLeftColor: nowTheme.COLORS.LIGHT_GRAY,
                    }}
                  />
                }
                <TouchableWithoutFeedback onPress={onPressIncrement}>
                  <Block style={[styles.optionsButtonRight]}>
                    <AntDesign style={{marginRight: 18, marginTop: 5}} name="plus" size={16} color="black" />
                  </Block>
                </TouchableWithoutFeedback>
              </Block>     
            : 
              gradient ?
                <Block middle>
                  <LinearGradient
                    colors={disabled?[nowTheme.COLORS.LIGHT_GRAY, nowTheme.COLORS.DARK_GRAY]:[nowTheme.COLORS.PRIMARY, nowTheme.COLORS.SECONDARY]}
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={style.button}
                  >
                    <TouchableOpacity 
                      onPress={disabled?null:onPress} 
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                      {children}
                    </TouchableOpacity>
                  </LinearGradient>
                </Block>
              :
                <Button
                  style={buttonStyles}
                  shadowless
                  textStyle={[{ fontSize: fontSize || 12, fontWeight: '700', color: colorText }, textAlign]}
                  onPress={onPress}
                  {...props}
                >
                  {children}
                </Button>
            }
          </Block>
  }
}

ArButton.propTypes = {
  small: PropTypes.bool,
  shadowless: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'default',
      'primary',
      'info',
      'error',
      'success',
      'warning',
      'simple',
      'neutral',
      'pidenos',
      'white'
    ])
  ])
};

const styles = StyleSheet.create({
  smallButton: {
    width: isIOS ? 115 : 110,
    height: 30,
    borderRadius: 5
  },
  mediumButton: {
    width: 320,
  },
  blockButton: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: isIOS ? '35%' : '40%',
    height: 'auto',
  },
  shadow: {        
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3
  },
  optionsButtonLeft: {
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  optionsButtonRight: {
    marginRight: -10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  optionsButtonCenter: {
    color: nowTheme.COLORS.BLACK,
    fontSize: isIOS ? 17 : 15,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    fontSize: isIOS ? 16 : 14,
  }
});

export default ArButton;
