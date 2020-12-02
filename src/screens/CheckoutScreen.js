import React from "react";
import Checkout from "../container/cart/Checkout";

import { ConnectedComponent as connect } from '../components';

class CheckoutScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Checkout onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(CheckoutScreen);