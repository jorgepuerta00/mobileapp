import React from 'react';
import { Text, Block } from 'galio-framework';
import styled from "styled-components";
import PropTypes from "prop-types";
import { unitPrice, currencyFormat } from '../constants/utils'
import Button from './Button';
import Touchable from './Touchable'
import CacheImage from './CacheImage'

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      source,
      price,
      size,
      description,
      onPress,
      titleButton,
      onPressAdd,
      onPressDecrement, 
      onPressIncrement, 
      quantity,
      style,
      shadowless
    } = this.props;
    
    const large = size.includes("large") || size.includes("restaurant")
    const medium = size.includes("medium") 
    const small = size.includes("small") 
    const shop = size.includes("shop")
    const restaurant = size.includes("restaurant")

    const container = large ? style.containerLarge : medium ? style.containerMedium : style.containerSmall
    const cover = large ? style.coverLarge : medium ? style.coverMedium : style.coverSmall
    const imageContainer = large ? style.imageLarge : medium ? style.imageMedium : style.imageSmall
    const productItem = shop ? style.productItem : style.productShop
    const buttonCart = quantity != undefined || quantity == null ? quantity > 0 ? true : false : false
    const resizeMode = shop ? "contain" : "cover"
    const styleImage = shop ? style.horizontalImage : imageContainer

    return (
      <Block>
          {shop ?
            <Block style={productItem}>
              <Touchable style={[style.containerImageShop, !shadowless && style.shadow]} onPress={onPress}>
                  <Block style={style.imageShopContainer}>
                    <Block style={style.imageCoverShop}>
                      <CacheImage 
                        resizeMode={resizeMode} 
                        uri={source}
                        style={styleImage}
                      />
                    </Block>
                  </Block>
              </Touchable>
              <Block flex style={style.containerInformation}>
                  <Text style={style.price}>{currencyFormat(price)}</Text>
                  <Text numberOfLines={1} style={style.subtitle}>{name}</Text>
                  <Text style={style.description}>{description} und ({unitPrice(price, description)}/und)</Text>
                  <Block style={style.buttonCardProduct}>
                    <Button 
                      color="white"
                      flex
                      small
                      quantity={quantity}
                      buttonCart={buttonCart}
                      style={[style.optionsButtonProduct, !shadowless && style.shadow]}
                      onPress={onPressAdd}
                      onPressDecrement={onPressDecrement} 
                      onPressIncrement ={onPressIncrement}
                    >
                        <Text style={style.textButton}>{titleButton}</Text>
                    </Button>                                       
                  </Block>
              </Block>
          </Block>
          :
          <Block>
            <Touchable 
              onPress={onPress} 
            >
                <Block style={large && {flexDirection: 'row'}}>
                  <Block style={[container, !shadowless &&  style.shadow]}>
                      <Block style={cover}>
                        <CacheImage 
                          resizeMode={large ? "contain" : "cover"}
                          uri={source}
                          style={styleImage}
                        />
                      </Block>
                      {small&&<Title>{name}</Title>}
                  </Block>
                  { large && 
                    <Block flex>
                      <Text style={style.caption}>{name}</Text>
                      { restaurant ? <Text style={style.subcaption}>Para {description} personas</Text> : 
                        large && <Text style={style.subcaption}>{description}</Text>
                      }
                      { restaurant && 
                        <Block style={{
                          paddingTop: 20
                        }}>
                          <Button 
                            color="white"
                            small
                            style={[style.optionsButtonProduct, !shadowless && style.shadow]}
                            onPress={onPress}
                          >
                              <Text style={style.textButton}>{titleButton}</Text>
                          </Button>
                        </Block>
                      }
                    </Block>
                  }
                </Block>
            </Touchable>
          </Block>
          }
      </Block>
    );
  }
}

Card.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'small',
      'medium',
      'large',
      'product',
      'search'
    ])
  ]),
  source: PropTypes.string
};

export default Card;
  
const Content = styled.View`
    padding-left: 62px;
    justify-content: center;
    height: 75px;
    overflow: hidden;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
`;

const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    position: absolute;
    top: 20px;
    left: 20px;
    border-radius: 16px;
`;

const Title = styled.Text`
    font-size: 14px;
    color: #3c4560;
    font-weight: 500;
`;

const Subtitle = styled.Text`
    font-size: 13px;
    color: #b8bece;
    font-weight: 500;
    margin-top: 4px;
`;