import { StyleSheet } from "react-native";
import { theme } from "galio-framework";
import nowTheme from "../../constants/Theme";

export default StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2
  },
  switch: {
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    color:"#525F7F",
  },
  text: {
    fontFamily: 'montserrat-bold',
    fontSize: 12, 
    color:nowTheme.COLORS.TEXT
  },
  option: {
    fontFamily: 'montserrat-regular',
    fontSize: 9, 
    color:nowTheme.COLORS.TEXT
  }
})