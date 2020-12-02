import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import nowTheme from "../../constants/Theme";
import { HeaderHeight } from "../../constants/utils";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  /* Onboarding Screen */
  container: {
    backgroundColor: theme.COLORS.WHITE,
    height: height,
    width: width
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    margin: theme.SIZES.BASE,
    height: height/2
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
    width: width/2.2
  },
  buttonText: { 
    fontFamily: 'montserrat-bold', 
    fontSize: 10,
    textTransform: "capitalize" 
  },
  /* Pro Screen */
  containerPro: {
    backgroundColor: theme.COLORS.WHITE,
    height: height,
    width: width
  },
  paddedPro: {
    
  },
  buttonPro: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 2.5,
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
    marginTop: "-20%"
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
    height: 400,
    marginTop: "-20%"
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
    fontSize: 25
  },
  fonttwo: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  fontthree: {
    fontFamily: 'montserrat-bold',
    fontSize: 10
  },
  /* Policy Privacy */
  containerPrivacyPolicy:{
    marginTop: theme.SIZES.BASE*1.5,
    height: height - HeaderHeight*1.3,
    marginLeft: theme.SIZES.BASE,
    marginRight: theme.SIZES.BASE,
  },
  titlePrivacyPolicy: {
    fontSize: 14,
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
    marginTop: 10,
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 10
  },
  scrollviewContainer: {
    marginTop: 10,
    marginBottom: 15,
    height: height / 4
  },
  buttonPolicyPrivacy: {
    width: width - theme.SIZES.BASE*2,
    height: theme.SIZES.BASE*3,
    shadowRadius: 0,
    shadowOpacity: 0
  }
})