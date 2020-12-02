import React from "react";
import Profile from "../container/user/Profile";

import { ConnectedComponent as connect } from '../components';

class ProfileScreen extends React.Component {
  render() {
    return (
      <Profile {...this.props} />
    );
  }
}

export default connect(ProfileScreen);