import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import {
    Button, 
    Block, 
    Icon, 
    Text,
  } from 'galio-framework';
import { Images, nowTheme as theme} from '../constants';
import Img from '../components/Img'
import moment from 'moment'

const BASE_SIZE = theme.SIZES.BASE;
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

class OrderItem extends React.Component {

    render() {
        const { 
          code,
          date,
          state,
          intlData,
          onPress,
          style
        } = this.props;

        const color = state == 'active'    ? theme.COLORS.INFO : 
            	        state == 'inactive'  ? theme.COLORS.ORANGE : 
                      state == 'delivered' ? theme.COLORS.SUCCESS : theme.COLORS.ERROR

        const image = state == 'active'    ? Images.active :  
                      state == 'inactive'  ? Images.inactive : 
                      state == 'delivered' ? Images.delivered : Images.unknown

        const message = state == 'active'    ? intlData.messages.order.active :   
                        state == 'inactive'  ? intlData.messages.order.inactive : 
                        state == 'delivered' ? intlData.messages.order.delivered : intlData.messages.order.unknown

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <Block row center card shadow space="between" style={styles.card}>
                    <Block middle style={[style.imageOrderItem, style.shadow]}>
                        <Img shadowless source={image} size="small"/>
                    </Block>
                    <Block flex style={styles.left}>
                        <Block row>
                            <Text style={[style.orderItemTitle]}>{intlData.messages.order.order} </Text>
                            <Text style={style.orderItemSubtitle}>{code}</Text>
                        </Block>
                        <Block row>
                            <Text bold color={color} size={BASE_SIZE * 0.875}>{message}{' '}</Text>
                            <Text size={BASE_SIZE * 0.875} muted>{moment(date).format('DD/MM/YYYY')}</Text>
                        </Block>
                    </Block>
                    <Button style={styles.right}>
                        <Icon size={BASE_SIZE} name="chevron-right" family="FontAwesome" color={COLOR_GREY} />
                    </Button>
                </Block>
            </TouchableWithoutFeedback>
        )
    }
}

export default OrderItem;

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
      marginLeft: BASE_SIZE,
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
  