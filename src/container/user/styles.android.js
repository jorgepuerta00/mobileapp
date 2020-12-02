import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { nowTheme } from '../../constants';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    zIndex: 1,
    backgroundColor: nowTheme.COLORS.BACKGROUND_APP,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backContainer: {
    marginLeft: theme.SIZES.BASE * 2,
    width: width,
  },
  registerContainer: {
    borderRadius: 14,
    width: width - (theme.SIZES.BASE * 2),
    height: width * 1.2,
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.ORANGE,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 5,
    color: nowTheme.COLORS.LIGHT_GRAY,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: theme.SIZES.BASE,
    backgroundColor: nowTheme.COLORS.PIDENOS
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  textButton: {
    fontFamily: 'montserrat-bold',
    fontSize: 14,
    color: nowTheme.COLORS.WHITE,
    fontWeight: 'bold',
  },
  text: {
    color: nowTheme.COLORS.PLACEHOLDER,
    textAlign: 'center',
    fontSize: 14
  },
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.7 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  profileContainer: {
    width,
    height: height * 0.3,
    marginTop: -230
  },
  profileBackground: {
    width,
    height: height * 0.5
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  socialProfile: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  },
  containerDetail: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentScreen: {
    backgroundColor: "white",
    borderRadius: 14,
    flex: 0.75
  },
  touchableOpacity: {
    margin: theme.SIZES.BASE,
    alignItems: "flex-start"
  },
  circleShadow:{
    margin: theme.SIZES.BASE,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3
  },
  titleRegister: {
    textAlign: 'center',
    fontSize: 18
  },
  title: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginLeft: theme.SIZES.BASE
  },
  search: {
      borderWidth: 1,
      borderRadius: 30,
      borderColor: nowTheme.COLORS.BORDER,
      width: width - theme.SIZES.BASE * 2,
      height: 48,
  },
  input: {
    margin: theme.SIZES.BASE
  },
  containerAddresses: {
    marginTop: theme.SIZES.BASE
  },
  itemsStyle: {
      
  },
  addressContainer: {
    backgroundColor: theme.COLORS.WHITE,
    margin: 1,
    alignItems: "center",
    width: width,
  },
  cardContainer: {
    backgroundColor: theme.COLORS.WHITE,
    padding: theme.SIZES.BASE,
    width: '40%',
    height: 'auto',
  },
  subtitle: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 17,
    marginTop: 5,
    textTransform: "capitalize",
  },
  description: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 17,
    textTransform: "capitalize",
    marginTop: 5,
  },
  buttonDelete: {
    alignItems: "center",
  },
  rightAction: {
    backgroundColor: nowTheme.COLORS.ERROR,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BACKGROUND_APP,
    right: 0,
    width: "20%",
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    padding: 4,
  },
  buttonNewAddress: {
    marginBottom: theme.SIZES.BASE,
    flex: 0.08,
    alignItems: "center"
  },
  buttonAdress: {
    width: 260
  },
  newAddressText: {
    color: 'white',
    fontSize: 14,
    padding: 4,
    alignSelf: "center",
    fontWeight: "bold"
  },
  noAddresses: {
    color: 'black',
    fontSize: 16,
    marginTop: theme.SIZES.BASE*4,
    alignSelf: "center",
    fontWeight: "bold"
  },
  horizontalImage: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.COLORS.WHITE,
  },
  loginContainer: {
    borderRadius: 14,
    width: width - (theme.SIZES.BASE * 2),
    height: width * 1.2,
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: nowTheme.COLORS.BLACK,
    elevation: 3,
    alignItems: "center",
  },
  containerSignUp: {  
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonClose: {
    padding: theme.SIZES.BASE,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  passwordStrength: {
    backgroundColor: 'transparent',
    color:"#8898AA",
    fontSize: 12,
  },
  userItem: {
   padding: 10
  },
  profileText: {
   fontWeight: "bold",
   paddingBottom: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color:'#ffffff',
    textTransform: "capitalize",
    marginTop: -5
  },
  email: {
    color:"white",
    marginTop: -5,
    lineHeight: 20,
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.8
  },
  avatarBlock: { 
    top: -140
  },
  infoProfile: { 
    top: -60
  },
  header: {
    
  },
  buttonSave: { 
    width: width,
    marginTop: -25
  },
  blockDataUser: { 
    padding: theme.SIZES.BASE,
    height: "100%"
  },
  buttonProfile: { 
    width: 100, 
    height: 40, 
    elevation: 3,
    fontSize: 16
  },
  containerProfile: {
    width: width,
    height: height,
    marginTop: 230
  },
  containerDataPicker: {
    flex: 1,
    justifyContent: 'center'
  },
  textAlign: {
    textAlign: "left", 
    alignSelf: 'stretch',
    paddingLeft: theme.SIZES.BASE,
    fontSize: 14,
    fontWeight: "normal"
  },
  inputAddresses: {
    margin: theme.SIZES.BASE
  },
  searchAddresses: {
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    width: width - theme.SIZES.BASE * 6,
    height: 48,
  },
  addressText: {
    fontSize: 12
  },
  hyperlink: {
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.PIDENOS,
    fontSize: 12
  },
  checkbox: { 
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: theme.SIZES.BASE
  },
  checkboxlabel: {
    color: nowTheme.COLORS.HEADER,
    fontFamily: 'montserrat-regular',
    fontSize: 12
  },
  /* Addresses Screen */
  button: {
    width: width * 0.75,
    height: theme.SIZES.BUTTON_HEIGHT,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 3
  },
  buttonText: { 
    fontFamily: 'montserrat-bold', 
    fontSize: 10,
    textTransform: "capitalize"
  },
  /* Contact Information */
  containerContactInformation: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContactInformation: {
    backgroundColor: "white",
    borderRadius: 14,
    flex: 0.75,
    width: width - (theme.SIZES.BASE*4)
  },
  touchableOpacityContactInformation: {
    margin: theme.SIZES.BASE,
    alignItems: "flex-start"
  },
  titleContactInformation: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: theme.SIZES.BASE
  },
  inputContactInformation: {
    margin: theme.SIZES.BASE
  },
  searchContactInformation: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    width: width - theme.SIZES.BASE * 6,
    height: 48,
  },
  buttonContainerContactInformation: {
    marginBottom: theme.SIZES.BASE,
    flex: 0.08,
    alignItems: "center"
  },
  buttonContactInformation: {
    width: width - (theme.SIZES.BASE*10)
  },
  labelContactInformation: {
    color: 'white',
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "bold"
  },
  scrollViewContactInformation: {
    paddingTop: theme.SIZES.BASE
  },
  itemsStyleContactInformation: {
    
  },
  noContactInformation: {
    color: 'black',
    fontSize: 16,
    marginTop: theme.SIZES.BASE*4,
    alignSelf: "center",
    fontWeight: "bold"
  }
})