import React from "react";
import { StyleSheet } from "react-native";
import {
    Button, 
    Block, 
    Icon, 
    Text,
  } from 'galio-framework';
import { nowTheme as theme} from '../constants';
import { isIOS } from '../constants/utils';
import Img from '../components/Img'
import Touchable from '../components/Touchable'
import Theme from "../constants/Theme";

const BASE_SIZE = theme.SIZES.BASE*1.3;
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;
const COLOR_GREEN = theme.COLORS.SUCCESS;

class PaymentItem extends React.Component {

    render() {
        const { 
          title,
          image,
          selected,
          onPress,
          style
        } = this.props;

        const icon  = selected == undefined ? "add-circle" :  
                      selected  ? "check-circle" : null

        const color = selected == undefined ? COLOR_GREY :  
                      selected  ? COLOR_GREEN : null

        const backgroundColor = title.includes("Amex") ? "Amex" : title.includes("Efectivo") ? "Warning" : "White"

        return (
            <Touchable onPress={onPress}>
                <Block row center card shadow space="between" style={styles.card}>
                    <Block middle style={[style.imageOrderItem, style.shadow]}>
                        <Img shadowless source={image} size="creditcard" color={backgroundColor}/>
                    </Block>
                    <Block flex style={styles.left}>
                        <Block row>
                            <Text style={style.orderItemSubtitle}>{title}</Text>
                        </Block>
                    </Block>
                    <Button shadowless style={styles.right}>
                        { icon && <Icon size={BASE_SIZE} name={icon} family="FontAwesome" color={color} />}
                    </Button>
                </Block>
            </Touchable>
        )
    }
}

export default PaymentItem;

const styles = StyleSheet.create({
    card: {
      borderColor: 'transparent',
      marginHorizontal: BASE_SIZE,
      marginVertical: 3,
      padding: isIOS ? BASE_SIZE : BASE_SIZE/1.5,
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
      marginLeft: BASE_SIZE,
    },
    right: {
      width: BASE_SIZE,
      backgroundColor: 'white',
      elevation: 0
    },
    gradient: {
      width: theme.SIZES.BASE * 3,
      height: theme.SIZES.BASE * 3,
      borderRadius: (theme.SIZES.BASE * 3)/2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  