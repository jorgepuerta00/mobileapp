import React from "react";
import { Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import nowTheme from "../constants/Theme";
import { Block } from "galio-framework";

const MenuItem = props => (
  <Block style={props.style.containerMenuItem}>
    <Block style={props.style.iconView}>
      <Ionicons name={props.icon} size={24} color={nowTheme.COLORS.PIDENOS} />
    </Block>
    <Block style={props.style.content}>
      <Text style={props.style.title}>{props.title}</Text>
      <Text style={props.style.text}>{props.text}</Text>
    </Block>
  </Block>
);

export default MenuItem;
