import { Platform } from 'react-native';
import { iosStyle } from './styles.ios';
import { androidStyle } from './styles.android'

export const styles = Platform.select({
  ios: iosStyle,
  android: androidStyle
});