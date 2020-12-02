import React from "react";
import OrderConfirmed from "../container/order/OrderConfirmed";

import { ConnectedComponent as connect } from '../components';

class OrderConfirmedScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.navigate("Home")
    }

    render() {
        return (
            <OrderConfirmed onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(OrderConfirmedScreen);