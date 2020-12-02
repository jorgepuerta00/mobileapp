import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { nowTheme } from "../constants";
import { Block } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { isIOS, thumbMeasure } from '../constants/utils'
import PropTypes from "prop-types";
import Theme from "../constants/Theme";

const { width } = Dimensions.get('screen');

class Img extends React.Component {

  componentDidMount() {

  }

  render() {
    const {
      color,
      style,
      children,
      source,
      onPress,
      size,
      shadowless,
      ...props
    } = this.props;

    const shop = size.includes("shop")
    const avatar = size.includes("avatar")
    const full = size.includes("full")
    const small = size.includes("small")
    const creditcard = size.includes("creditcard")

    const ImageStyles = [
      shop && styles.shopStyle,
      avatar && styles.avatarStyle,
      small && styles.smallStyle,
      creditcard && styles.creditcardStyle
    ];

    const fullImageStyles = full && styles.FullStyle;
    const background = color ? { backgroundColor: nowTheme.COLORS[color.toUpperCase()] } : { backgroundColor: nowTheme.COLORS.WHITE }
    const resizeMode = isIOS ? "contain" : "cover"

    return (
      <Block>
        <TouchableWithoutFeedback style={[fullImageStyles, !shadowless && styles.shadow]} onPress={onPress}>
          <Image
            source={{ uri: source, cache: 'force-cache' }}
            resizeMode={resizeMode}
            style={[ImageStyles, fullImageStyles, background]}
          />
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Img.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'shop',
      'avatar',
      'full',
      'small',
    ])
  ]),
  source: PropTypes.string
};

const styles = StyleSheet.create({
  quote: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    borderWidth: 1,
    padding: 20
  },
  image: {
    marginBottom: 10,
    marginLeft: nowTheme.SIZES.BASE,
  },
  round: {
    width: width - nowTheme.SIZES.BASE * 12,
    height: width - nowTheme.SIZES.BASE * 12,
    borderRadius: (width - nowTheme.SIZES.BASE * 12) / 2,
  },
  raised: {
    width: width - nowTheme.SIZES.BASE * 12,
    height: width - nowTheme.SIZES.BASE * 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  shopStyle: {
    borderWidth: 3,
    borderColor: nowTheme.COLORS.WHITE,
    backgroundColor: nowTheme.COLORS.WHITE,
    width: thumbMeasure * 1.4,
    height: thumbMeasure * 1.4,
    borderRadius: 50,
  },
  smallStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: thumbMeasure * 1.3,
    height: thumbMeasure * 1.3,
    borderRadius: 50,
  },
  avatarStyle: {
    borderRadius: 50,
    width: thumbMeasure,
    height: thumbMeasure
  },
  creditcardStyle: {
    borderRadius: 50,
    width: thumbMeasure,
    height: thumbMeasure,
    backgroundColor: Theme.COLORS.AMEX
  },
  FullStyle: {
    borderRadius: 50,
    borderWidth: 0,
    borderColor: nowTheme.COLORS.WHITE,
    width: thumbMeasure * 1.5,
    height: thumbMeasure * 1.5
  },
  shadow: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 1,
    marginBottom: 5
  }
});

export default Img;