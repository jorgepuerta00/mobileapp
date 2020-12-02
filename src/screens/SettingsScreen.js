import React from "react";
import Settings from "../container/settings/Settings";

import { ConnectedComponent as connect } from '../components';

class SettingsScreen extends React.Component {
  render() {
    return (
      <Settings {... this.props} />
    );
  }
}

export default connect(SettingsScreen);