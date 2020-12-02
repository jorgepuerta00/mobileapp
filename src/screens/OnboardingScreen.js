import React from "react";
import Onboarding from "../container/onboarding/Onboarding";

import { ConnectedComponent as connect } from '../components';

class OnboardingScreen extends React.Component {
  render() {
    return (
      <Onboarding {... this.props} />
    );
  }
}

export default connect(OnboardingScreen);