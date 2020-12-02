import React from "react";
import Cart from "../container/cart/Cart";

import { ConnectedComponent as connect } from '../components';

class CartScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Cart onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(CartScreen);