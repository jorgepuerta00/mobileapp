import {
    TouchableOpacity,
    TouchableWithoutFeedback,
  } from "react-native";
import { isIOS } from '../constants/utils'

export default isIOS
    ? TouchableOpacity
    : TouchableWithoutFeedback;