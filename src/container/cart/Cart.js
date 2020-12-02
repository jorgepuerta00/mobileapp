import React from "react";
import {
    FlatList,
    TouchableWithoutFeedback,
    Text,
    Alert,
    AsyncStorage
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Button } from "galio-framework";
import { FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { nowTheme } from "../../constants";
import { currencyFormat } from '../../constants/utils';
import styles from './styles';
import { SwipeableRow, Touchable } from '../../components'
import { Spinner } from '../../components';

import { connect } from 'react-redux'
import { reset, remove, increaseQuantity, decreaseQuantity } from '../../services/cart/action'
import { totalCost, getTotalPerItem, totalItemsInCart } from '../../services/cart/selectors'

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        totalCost: totalCost(state),
        getTotalPerItem: getTotalPerItem(state),
        totalItemsInCart: totalItemsInCart(state)
    }
}

class Cart extends React.Component {

    componentWillUnmount() {
        this.setState = (state, callback)=>{
            return;
        };
    }

    routeToLogin = () => {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    routeToCheckout = async() => {
        const { navigation } = this.props
        navigation.navigate('Checkout')
    }

    routeToContactInformation = () => {
        const { navigation } = this.props
        navigation.navigate('ContactInformation')
    }

    UserAlertHandler = () => {
        Alert.alert(
            this.props.intlData.messages.message.warning.title,
            this.props.intlData.messages.cart.warningsesion,
          [
            {text: this.props.intlData.messages.cart.close, onPress: this.routeToLogin},
          ],
          { cancelable: false }
        );
    }

    ContactInformationAlertHandler = () => {
        Alert.alert(
          this.props.intlData.messages.message.warning.title,
          this.props.intlData.messages.cart.contactinformationwarning,
          [
            {text: this.props.intlData.messages.cart.yes, onPress: this.routeToContactInformation},
            {text: this.props.intlData.messages.cart.no, style: 'cancel'},
          ],
          { cancelable: false }
        );
    }

    EmptyCartAlertHandler = () => {
        Alert.alert(
          this.props.intlData.messages.message.title,
          this.props.intlData.messages.cart.emptyquestion,
          [
            {text: this.props.intlData.messages.cart.yes, onPress: this.resetCart.bind(this)},
            {text: this.props.intlData.messages.cart.no, style: 'cancel'},
          ],
          { cancelable: false }
        );
    }
    
    async removeFromCart(item) {
        const { dispatch } = this.props
        await dispatch(remove(item))
        this._storeData()
    }

    async resetCart() {
        const { dispatch } = this.props
        await dispatch(reset())
        this._storeData()
    }
    
    async increment(item) {
        const { dispatch } = this.props
        await dispatch(increaseQuantity(item))
        this._storeData()
    }
    
    async decrement(item) {
        const { dispatch } = this.props
        await dispatch(decreaseQuantity(item))
        this._storeData()
    }

    checkout = () => {
        const { user } = this.props
        if (user != null) {            
            if (user.email && user.mobile && user.firstName) {
                this.routeToCheckout()
            }
            else {
                this.ContactInformationAlertHandler()
            }
        }
        else {
            this.UserAlertHandler()
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

    _renderItem = ({item}) => (
        <SwipeableRow
            item={item}       
            onPressDecrement={this.decrement.bind(this, item)}   
            onPressIncrement={this.increment.bind(this, item)}   
            onPressRemove={this.removeFromCart.bind(this, item)}
            style={styles}
            title={this.props.intlData.messages.cart.delete}
            type="cart"
        />  
    );

    render() {
        const { user, getTotalPerItem, totalItemsInCart, totalCost, intlData, navigation } = this.props;
        const isEmpty = totalItemsInCart > 0 || totalItemsInCart === undefined ? false : true
        let address

        try {
            address = user.addresses[0]
            if (address==undefined) {
              address = intlData.messages.addresses.add
            }
          } catch {
            address = intlData.messages.addresses.add
        }

        return (
            <SafeAreaView>
            <Block style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
                <Spinner
                    spinnerKey={"SpinnerCart"}
                    visible={this.props.pending}
                    textContent={intlData.messages.loading}
                    animation="fade"
                />
                <Block style={styles.contentScreen}>
                    <Block row style={styles.headerCart}>
                        <Touchable onPress={this.props.onPressCloseScreen}>
                            <Block style={styles.circleShadow} onPress={this.props.onPressCloseScreen}>
                                <Entypo name="chevron-left" size={24} color={nowTheme.COLORS.ICON} />
                            </Block>
                        </Touchable>
                        <Block style={styles.addressContainer}>
                            <Touchable onPress={() => navigation.navigate('Addresses')}>
                                <Block row style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={styles.textAddress}>{address}</Text>
                                    <AntDesign style={styles.iconAddress} name="caretdown" size={12} color="black" />
                                </Block>
                            </Touchable> 
                        </Block>
                        <Block>
                            <Text style={styles.title}>{this.props.intlData.messages.cart.title}</Text>
                        </Block>                                             
                    </Block>                    
                    { isEmpty ? 
                        <Block style={styles.containerCartEmpty}>
                            <Block>
                                <FontAwesome name="opencart" size={150} color={nowTheme.COLORS.LIGHT_GRAY} />
                            </Block>
                        </Block>
                        :
                        <Block style={styles.containerCartFull}>
                            <Block style={styles.itemsStyle}>
                                <FlatList
                                    windowSize={5}
                                    initialNumToRender={5}
                                    maxToRenderPerBatch={10}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    legacyImplementation={false}
                                    data={ getTotalPerItem }
                                    keyExtractor={(item) => item.product.id}
                                    renderItem={this._renderItem}
                                />		
                            </Block>
                        </Block>
                    }
                    <Block flex={1} center style={[isEmpty ? styles.emptyContentButtons : styles.contentButtons]}>                        
                        <Button
                            shadowless
                            disabled = {isEmpty}
                            style={isEmpty ? styles.buttonEmpty : styles.button}
                            color={isEmpty ? nowTheme.COLORS.GRAY : nowTheme.COLORS.PIDENOS}
                            onPress={this.checkout}
                        >
                            <Block                                 
                                row 
                                flex
                                style={[isEmpty ? styles.emptyButtonPay : styles.blockButtonPay]}
                            >
                                { isEmpty ? null :
                                    <Block style={styles.badge}>
                                        <Block style={styles.circleBadge}>
                                            <Text style={styles.itemsCartGoToPay}>
                                                {totalItemsInCart}
                                            </Text>
                                        </Block>
                                    </Block>
                                }
                                <Text style={styles.buttonGoToPay}>
                                    {intlData.messages.cart.buttonpay}
                                </Text>
                                { isEmpty ? null :   
                                <Text style={styles.totalGoToPay}>
                                    {
                                        totalCost <= 0 || totalCost === undefined ? "0.00" 
                                        : 
                                        currencyFormat(totalCost)
                                    }
                                </Text>
                                }
                            </Block>
                        </Button>     
                        { isEmpty ? <Block style={styles.blockEmpty}/> : 
                            <TouchableWithoutFeedback onPress={this.EmptyCartAlertHandler}>
                                <Block row center style={styles.blockButtonEmpty}>                        
                                    <MaterialCommunityIcons name="trash-can-outline" size={17} color={nowTheme.COLORS.GRAY} />
                                    <Text style={styles.textButtonEmpty}>{intlData.messages.cart.emptycart}</Text>
                                </Block> 
                            </TouchableWithoutFeedback>
                        }
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
  )(Cart);