import React from "react";
import Pro from "../container/onboarding/Pro";

import { ConnectedComponent as connect } from '../components';

class OnboardingScreen extends React.Component {
  render() {
    return (
      <Pro {... this.props} />
    );
  }
}

export default connect(OnboardingScreen);