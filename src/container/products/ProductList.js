import React from "react"
import { ScrollView, AsyncStorage, FlatList } from "react-native"
import { Text, Block } from 'galio-framework'
import Card from '../../components/Card'
import styles from './styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as cartAction from '../../services/cart/action'

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch) => ({
    cartAction: bindActionCreators(cartAction, dispatch)
})

class ProductList extends React.Component {

    state = {
        quantityById: {}
    }

    componentWillUnmount() {
        this.setState = (state, callback)=>{
            return;
        };
    }

    async handleAddCart(product) {
        const quantity = parseInt(this.state.quantityById[product.id]) || 1
        await this.props.cartAction.add(product, quantity)
        this._storeData()
    }

    async increment(product) {
        await this.props.cartAction.add(product, 1)
        this._storeData()
    }
    
    async decrement(product) {
        const quantity = parseInt(this.state.quantityById[product.id]) || 1
        if (quantity > 0) {
            await this.props.cartAction.add(product, -1)
            this._storeData()
        }
    }

    getQuantityPerProduct = (product) => {
        const { cart } = this.props;
        try{
            const found = cart.quantityById[product.id];
            return found.quantity;
        }
        catch {
            return 0;
        }
    }

    routeToDetail = (product) => {
        const { navigation } = this.props
        navigation.navigate('ProductDetail', { product })
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

    _renderItemCategory = ({item}) => (
        <Block>
            <Text style={styles.titlecategory}>{item.name}</Text>
            {   this.props.type == "restaurant" ?
                <FlatList
                    windowSize={5}
                    initialNumToRender={2}
                    maxToRenderPerBatch={5}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    legacyImplementation={false}
                    data={ item.products }
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this._renderItem}
                />
                :
                <FlatList
                    windowSize={5}
                    initialNumToRender={2}
                    maxToRenderPerBatch={5}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    legacyImplementation={false}
                    horizontal
                    data={ item.products }
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this._renderItem}
                />
            }
        </Block>
    );

    _renderItem = ({item}) => (
        <Block>
            <Card
                name={item.name}
                source={item.image}
                color={item.description}
                price={item.price} 
                description={item.size}
                size={this.props.type}
                quantity={this.getQuantityPerProduct(item)}
                onPress={this.routeToDetail.bind(this, item)}
                onPressAdd={this.handleAddCart.bind(this, item)}
                onPressIncrement={this.increment.bind(this, item)}
                onPressDecrement={this.decrement.bind(this, item)}
                titleButton={this.props.intlData.messages.products.buttonadd}
                style={styles}
            />
            {this.props.type == "restaurant" && <Block style = {styles.divider}/>}
        </Block>
    );

    render() {
        const { data, search } = this.props
        return (
            <Block> 
                { !search ?
                    <FlatList
                        windowSize={5}
                        initialNumToRender={2}
                        maxToRenderPerBatch={5}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        legacyImplementation={false}
                        data={ data }
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this._renderItemCategory}
                    />
                    :
                    <FlatList
                        windowSize={5}
                        initialNumToRender={2}
                        maxToRenderPerBatch={5}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        legacyImplementation={false}
                        numColumns={3}
                        data={ data }
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this._renderItem}
                    />
                }
            </Block>
        );
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ProductList)