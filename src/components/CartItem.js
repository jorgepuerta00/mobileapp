import React from "react";
import styled from "styled-components";
import { Text, Block } from 'galio-framework';
import Button from './Button'
import { currencyFormat, thumbMeasure, unitPrice } from '../constants/utils';
import { nowTheme } from '../constants'
import CacheImage from './CacheImage'

class CartItem extends React.Component {

    componentDidMount() {
        this.setState({ count: this.props.item.quantity });
    }

    render() {
        const { 
          item,
          onPressDecrement,
          onPressIncrement,
          onPressRemove,
          style
        } = this.props;

        return (
            <Block flex row style={style.cartContainer} >
                <IconView>
                    <CacheImage
                      resizeMode="cover" 
                      uri={item.product.image} 
                      style={{
                        backgroundColor: nowTheme.COLORS.WHITE,
                        width: thumbMeasure * 1.3,
                        height: thumbMeasure * 1.3,
                      }}
                    />
                </IconView>
                <Block style={style.cardContainer}>
                    <Text numberOfLines={2} style={style.subtitle}>{item.product.name}</Text>
                    <Block flex>
                      <Text style={style.unitPrice}>{item.product.size} und ({unitPrice(item.product.price, item.product.size)}/und)</Text>
                    </Block>
                    <Block row>
                      <Text style={style.subtotal}>Precio: </Text>
                      <Text style={style.price}>{currencyFormat(item.product.price)}</Text> 
                    </Block>
                    <Block row>
                      <Text style={style.subtotal}>Subtotal: </Text>
                      <Text style={style.totalprice}>{currencyFormat(item.totalprice)}</Text> 
                    </Block>
                </Block>
                <Block style={style.blockButton}>
                  <Button 
                    buttonCart 
                    onPressDecrement={onPressDecrement} 
                    onPressIncrement ={onPressIncrement}
                    onPressRemove ={onPressRemove}
                    quantity={item.product.quantity}
                    style={style.cardButton}
                  />
                </Block>
            </Block>
        )
    }
}

export default CartItem;

const IconView = styled.View`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  background: white;
`;
