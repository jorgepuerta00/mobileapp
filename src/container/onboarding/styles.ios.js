import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import nowTheme from "../../constants/Theme";
import { HeaderHeight } from "../../constants/utils";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  /* Onboarding Screen */
  container: {
    backgroundColor: theme.COLORS.WHITE,
    marginTop: 0,
    height: height,
    width: width
  },
  padded: {
    width: width,
    height: height,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: theme.SIZES.BASE
  },
  button: {
    width: width * 0.9,
    height: theme.SIZES.BUTTON_HEIGHT,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 3
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },
  onboardingImage: {
    width: width/6
  },
  buttonText: { 
    fontFamily: 'montserrat-bold', 
    fontSize: 17,
    textTransform: "capitalize"
  },
  /* Pro Screen */
  containerPro: {
    backgroundColor: theme.COLORS.WHITE
  },
  paddedPro: {
    
  },
  buttonPro: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },
  titlePro: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 15
  },
  pro: {
    backgroundColor: nowTheme.COLORS.PIDENOS,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 10,
    marginBottom: theme.SIZES.BASE
  },
  proImage: {
    width: width/3,
    height: 400
  },
  platforms: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: width/1.5,
    height: width/3.4,
    marginBottom: theme.SIZES.BASE*5,
    borderRadius: 24
  },
  fontone: {
    fontFamily: 'montserrat-bold',
    fontSize: 30
  },
  fonttwo: {
    fontFamily: 'montserrat-bold',
    fontSize: 22,
  },
  fontthree: {
    fontFamily: 'montserrat-bold',
    fontSize: 14
  },
  /* Policy Privacy */
  containerPrivacyPolicy:{
    marginTop: theme.SIZES.BASE*4,
    marginLeft: theme.SIZES.BASE,
    marginRight: theme.SIZES.BASE
  },
  titlePrivacyPolicy: {
      fontSize: 20,
      alignSelf: 'center',
      fontWeight: "bold"
  },
  mainTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
  paragraph:{
      fontSize: 14,
      textAlign: 'justify',
      marginBottom: 10
  },
  scrollviewContainer: {
      marginTop: 10,
      marginBottom: 10,
      height: height * 0.8
  },
  buttonPolicyPrivacy: {
    width: width - theme.SIZES.BASE*2,
    height: theme.SIZES.BASE*3,
    shadowRadius: 0,
    shadowOpacity: 0
  }
})