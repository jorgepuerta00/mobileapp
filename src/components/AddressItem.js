import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
// galio components
import {
  Button, 
  Block, 
  Icon, 
  Text,
} from 'galio-framework';
import {nowTheme as theme} from '../constants';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

class AddressItem extends React.Component {
    render() {
        const {
            index,
            item,
            style
        } = this.props;
        const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;
        return (
            <Block row center card shadow space="between" style={styles.card}>
                <Gradient
                    start={[0.45, 0.45]}
                    end={[0.90, 0.90]}
                    colors={gradientColors}
                    style={[styles.gradient, styles.left]}
                >
                    <FontAwesome5 name="location-arrow" size={BASE_SIZE} color={COLOR_WHITE} />
                </Gradient>
                <Block flex>
                    <Text style={style.addressText}>{item}</Text>
                    <Text style={style.addressText} muted>Principal</Text>
                </Block>
                <Button style={styles.right}>
                    <Icon size={BASE_SIZE} name="chevron-right" family="FontAwesome" color={COLOR_GREY} />
                </Button>
            </Block>
        )
    }
}

export default AddressItem;

const styles = StyleSheet.create({
    card: {
      borderColor: 'transparent',
      marginHorizontal: BASE_SIZE,
      marginVertical: BASE_SIZE / 2,
      padding: BASE_SIZE,
      backgroundColor: COLOR_WHITE,
      shadowOpacity: 2,
      borderRadius: 10,
      elevation: 2
    },
    menu: {
      width: BASE_SIZE * 2,
      borderColor: 'transparent',
    },
    settings: {
      width: BASE_SIZE * 2,
      borderColor: 'transparent',
    },
    left: {
      marginRight: BASE_SIZE,
    },
    right: {
      width: BASE_SIZE * 2,
      backgroundColor: 'transparent',
      elevation: 0,
    },
    gradient: {
      width: theme.SIZES.BASE * 3,
      height: theme.SIZES.BASE * 3,
      borderRadius: (theme.SIZES.BASE * 3)/2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  