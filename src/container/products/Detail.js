import React from "react"
import { Text, AsyncStorage } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, theme, Button as GaButton } from "galio-framework"
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { nowTheme } from "../../constants"
import { Button, Touchable, CacheImage } from '../../components'
import { currencyFormat } from '../../constants/utils'
import styles from './styles';

import { connect } from 'react-redux'
import { add } from '../../services/cart/action'
import { totalCost, getTotalPerItem } from '../../services/cart/selectors'

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        totalCost: totalCost(state),
        getTotalPerItem: getTotalPerItem(state)
    }
}

class DetailProduct extends React.Component {

    state = {
        favorite: false,
        quantity: 0
    };

    componentDidMount() {
        const { cart, product } = this.props;
        const found = cart.quantityById[product.id];

        if (found === undefined){
            this.setState({
                quantity: 0
            })
        }
        else{
            this.setState({
                quantity: found.quantity
            })
        }
    }

    componentWillUnmount() {
        this._storeData()

        this.setState = (state, callback)=>{
            return;
        };
    }

    changeStatefavorite(favorite) {
        this.setState({ favorite: !favorite })
    }
    
    increment(item) {
        const { dispatch } = this.props
        const { quantity } = this.state
        this.setState({
            quantity: quantity + 1
        })
        dispatch(add(item, 1))
    }
    
    decrement(item) {
        const { dispatch } = this.props
        const { quantity } = this.state
        if (quantity > 0) {
            this.setState({
                quantity: quantity - 1
            })
            dispatch(add(item, -1))
        }
    }

    _storeData = async () => {
        try {
            if (this.props.cart) {
                await AsyncStorage.setItem('@pidenos:cart', JSON.stringify(this.props.cart, null, 2));
            }
        }
        catch (error) {
            console.log(error)
        }
    };
    
    render() {
        const { product } = this.props
        const { favorite, quantity } = this.state
        
        return (
            <SafeAreaView>
            <Block style={styles.containerDetail} forceInset={{ top: "always", horizontal: "never" }}>
                <Block style={styles.contentScreen}>
                    <Block row style={styles.header}>
                        <Touchable onPress={this.props.onPressCloseScreen}>
                            <Block style={styles.circleShadow}>
                                <Entypo name="chevron-left" size={24} color={nowTheme.COLORS.ICON} />
                            </Block>
                        </Touchable>  
                        <Touchable onPress={() => this.changeStatefavorite(this.state.favorite)}>
                            <Block style={styles.favorite}>
                                { favorite ?
                                    <AntDesign name="star" size={24} color={nowTheme.COLORS.YOUTUBE} />
                                    :
                                    <AntDesign name="staro" size={24} color={nowTheme.COLORS.LIGHT_GRAY} />                                    
                                }
                            </Block>
                        </Touchable>                          
                    </Block>
                    <Block style={styles.cardContainer}>
                        <Block middle>
                            <CacheImage 
                                resizeMode="contain" 
                                uri={product.image}
                                style={styles.horizontalImageDetail}
                            />
                        </Block> 
                    </Block>
                    <Block row style={styles.relatedProducts}>
                        <Block style={styles.productInformationContainer}>                  
                            <Text style={styles.subtitleDetail} color={theme.COLORS.BLACK}>{product.name}</Text>
                            <Text style={styles.descriptionDetail} color={theme.COLORS.BLACK}>{product.description}</Text>
                            <Block row>
                                <Text style={styles.priceDetail} color={theme.COLORS.BLACK}>{currencyFormat(product.price)}</Text>
                            </Block>
                        </Block>
                    </Block>
                    <Block row style={styles.contentButtons}>
                        <Button
                            buttonCart
                            onPressDecrement={this.decrement.bind(this, product)}   
                            onPressIncrement={this.increment.bind(this, product)} 
                            style={styles.cardButton}
                        />
                        <GaButton
                                shadowless
                                style={styles.button}
                                color={nowTheme.COLORS.PIDENOS}
                                disabled = {false}
                            >
                            <Block
                                row 
                                flex
                                >
                                <Block style={styles.badge}>
                                    <Block style={styles.circleBadge}>
                                        <Text style={styles.itemsCartGoToPay}>
                                            {quantity}
                                        </Text>
                                    </Block>
                                </Block>
                                <Block style={styles.icon}>
                                    <MaterialCommunityIcons name="cart-outline" size={28} color="white" />
                                </Block>
                            </Block>
                        </GaButton>    
                    </Block> 
                </Block>
            </Block>
            </SafeAreaView>
        );
    }
}

export default connect(
    mapStateToProps, 
    null
)(DetailProduct)