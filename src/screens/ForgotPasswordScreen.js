import React from "react";
import ForgotPassword from "../container/user/ForgotPassword";

import { ConnectedComponent as connect } from '../components';

class ForgotPasswordScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <ForgotPassword onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(ForgotPasswordScreen);