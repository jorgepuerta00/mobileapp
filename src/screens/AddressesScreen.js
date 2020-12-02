import React from "react";
import Addresses from "../container/user/Addresses";

import { ConnectedComponent as connect } from '../components';

class AddressesScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Addresses onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(AddressesScreen);