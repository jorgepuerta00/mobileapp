import React from "react";
import Orders from "../container/order/Orders";

import { ConnectedComponent as connect } from '../components';

class OrderScreen extends React.Component {
    render() {
        return (
            <Orders {...this.props}/>
        );
    }
}

export default connect(OrderScreen);