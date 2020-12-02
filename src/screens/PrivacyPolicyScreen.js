import React from "react";
import PrivacyPolicy from "../container/onboarding/PrivacyPolicy";

import { ConnectedComponent as connect } from '../components';

class PrivacyPolicyScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <PrivacyPolicy onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(PrivacyPolicyScreen);