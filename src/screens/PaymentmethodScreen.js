import React from "react";
import Paymentmethod from "../container/cart/Paymentmethod";

import { ConnectedComponent as connect } from '../components';

class PaymentmethodScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Paymentmethod onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(PaymentmethodScreen);