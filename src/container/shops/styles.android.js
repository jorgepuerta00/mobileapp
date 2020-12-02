import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { nowTheme } from '../../constants';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  home: {
    width: width,
    height: height
  },
  card: {
    margin: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE
  },
  title: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 18,
    marginLeft: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE,
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  subtitle: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 9,
    marginLeft: theme.SIZES.BASE,
    marginTop: 5,
    textTransform: "uppercase",
  },
  containerSmall:{
    width: width/4,
    height: width/4,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.SIZES.BASE*1.5
  },
  coverSmall: {
    marginBottom: 5
  },
  imageSmall: {
    width: width/4  - theme.SIZES.BASE*1.3,
    height: width/4 - theme.SIZES.BASE*1.3,
    borderRadius: 14,
    alignSelf: 'center'
  },
  containerMedium:{
    backgroundColor: nowTheme.COLORS.WHITE,
    width: width * 0.8,
    height: 100,
    borderRadius: 14,
    overflow: "visible",
    marginTop: theme.SIZES.BASE,
    marginLeft: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE
  },
  coverMedium: {
    width: "200%",
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
  },
  imageMedium: {
    width: "50%",
    height: "50%",
    position: "absolute",
    borderRadius: 14,
    top: 0,
    left: 0,
    backgroundColor: theme.COLORS.WHITE,
  },
  containerLarge:{
    backgroundColor: theme.COLORS.WHITE,
    width: 100,
    height: 100,
    overflow: "hidden",
    marginTop: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderRadius: 14
  },
  coverLarge: {
    justifyContent: "flex-end",
  },
  imageLarge: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.COLORS.WHITE
  },
  shadow: {
    elevation: 3
  },
  caption: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: theme.SIZES.BASE
  },
  subcaption: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 14,
    marginTop: 5
  },
  wrapper: {
    
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    flexGrow: 0,
  },
  image: {
    width: width,
    height: height
  },
  divider: {
    width: width - theme.SIZES.BASE*2,
    height: 0.7,
    backgroundColor: nowTheme.COLORS.LIGHT_GRAY,
    marginLeft: nowTheme.SIZES.BASE,
    marginRight: nowTheme.SIZES.BASE,
    marginTop: nowTheme.SIZES.BASE
  }
})