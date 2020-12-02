import React from "react";
import { Switch } from "react-native";
import { isIOS } from '../constants/utils'
import nowTheme from "../constants/Theme";

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor =
      isIOS
        ? nowTheme.COLORS.PIDENOS
        : !isIOS && value
        ? nowTheme.COLORS.PIDENOS
        : nowTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={[
          value === true
            ? nowTheme.COLORS.PIDENOS
            :'#ffffff'
        ]}
        ios_backgroundColor={"#D8D8D8"}
        trackColor={{
          true: "#d3d3d3",
          false: isIOS ? "#d3d3d3" : "#333"
        }}
        {...props}
      />
    );
  }
}

export default MkSwitch;
