import React from "react";
import ContactInformation from "../container/user/ContactInformation";

import { ConnectedComponent as connect } from '../components';

class ContactInformationScreen extends React.Component {

    closeScreen = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <ContactInformation onPressCloseScreen={this.closeScreen} {...this.props}/>
        );
    }
}

export default connect(ContactInformationScreen);