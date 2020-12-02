import React from "react";
import OrderDetail from "../container/order/Detail";

import { ConnectedComponent as connect } from '../components';

class OrderDetailScreen extends React.Component {
  
    closeScreen = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <OrderDetail 
                order={this.props.route.params.order} 
                onPressCloseScreen={this.closeScreen}
                {... this.props}
            />
        );
    }
}

export default connect(OrderDetailScreen);