import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { nowTheme } from '../../constants';
import { HeaderHeight } from '../../constants/utils'

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  title: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  emptyButtonPay: {
  
  },
  blockButtonPay: {

  },
  badge: {
    width: '33%', height: '100%',
    marginTop: 6
  },
  circleBadge: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: '40%', height: '70%',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 5
  },
  buttonGoToPay: { 
    fontFamily: 'montserrat-bold', 
    fontSize: 22, 
    color: "white",
    width: '33%', height: '100%',
    textAlign: 'center',
    paddingTop: 10,
  },
  totalGoToPay: {       
    fontFamily: 'montserrat-bold', 
    fontSize: 22, 
    color: "white",
    width: '33%', height: '100%',
    paddingTop: 10,
    paddingLeft: 10,
  },
  itemsCartGoToPay: {
    fontFamily: 'montserrat-bold', 
    fontSize: 22, 
    color: nowTheme.COLORS.PIDENOS,
    textAlign: 'center',
  },
  emptyContentButtons: {
    backgroundColor: nowTheme.COLORS.WHITE,
    paddingTop: 0,
    width: width,
    margin: theme.SIZES.BASE,
    flex: 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentButtons: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: width,
    marginTop: theme.SIZES.BASE,
    flex: 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonEmpty: {
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  textButtonEmpty: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 17,
  },
  blockEmpty: {
    marginBottom: theme.SIZES.BASE,
  },
  blockButtonEmpty: {
    width: width,
    height: HeaderHeight,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: nowTheme.COLORS.WHITE
  },
  containerCartEmpty: {
    alignItems: "center",
    height: '70%',
    paddingTop: width/3,
  },
  containerCartFull: {
    height: height/1.4
  },
  itemsStyle: {
      
  },
  headerCart: {
    paddingLeft: theme.SIZES.BASE,
    paddingRight: theme.SIZES.BASE,
    flex: 0.3,
    justifyContent: "center",
    alignItems: "baseline"
  },
  headerCheckout: {
    padding: theme.SIZES.BASE,
    justifyContent: "space-between",
  },
  circleShadow:{
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
  container: {
    backgroundColor: nowTheme.COLORS.BACKGROUND_APP,
    width: width,
    height: height,
  },
  contentScreen: {
    height: height,
    width: width,
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
  rectButton: {
    width:'100%',
    height: 80,
    backgroundColor: nowTheme.COLORS.WHITE,
  },  
  cardButton:{
    backgroundColor: nowTheme.COLORS.WHITE,
    margin: theme.SIZES.BASE,
    width: 'auto',
    justifyContent: "space-around",
    borderRadius: 5,
    borderColor: nowTheme.COLORS.LIGHT_GRAY,
    borderWidth: 1,
    alignItems: "center",
    height: 30
  },
  blockButton: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: '35%',
  },
  cartContainer: {
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
  subtotal: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 17,
    marginTop: 5,
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  price: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 17,
    fontWeight: "600",
    marginTop: 5,
  },
  unitPrice: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 14,
    marginTop: 5,
  },
  totalprice: {
    color: nowTheme.COLORS.SECONDARY,
    fontSize: 17,
    textTransform: "uppercase",
    marginTop: 5,
    fontWeight: "600",
  },
  description: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 17,
    textTransform: "capitalize",
    marginTop: 5,
  },
  horizontalImage: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.COLORS.WHITE,
  },
  iconAddress: {
    paddingTop: theme.SIZES.BASE-5,
  },
  textAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: theme.SIZES.BASE,
    color: nowTheme.COLORS.BLACK
  },
  addressContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  checkoutContainer: {
    padding: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    width: width,
    height: HeaderHeight*1.2
  },
  checkoutContentButtons: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: width,
    flex: 1,
    padding: theme.SIZES.BASE
  },
  body: {
    width: width,
  },
  addressTitle: {
    fontSize: 12,
    color: nowTheme.COLORS.GRAY,
    fontWeight: "bold"
  }, 
  address: {
    fontSize: 20,
    color: nowTheme.COLORS.BLACK,
    fontWeight: "400"
  },
  iconCheckout: {
    marginRight: 10
  },
  productsSummary: {
    backgroundColor: nowTheme.COLORS.WHITE,
    padding: theme.SIZES.BASE,
    flex: 1
  },
  productsSummary: {
      backgroundColor: nowTheme.COLORS.WHITE,
      padding: theme.SIZES.BASE,
      flex: 1
  },
  orderDetailAddress: {
      backgroundColor: nowTheme.COLORS.WHITE,
      paddingTop: theme.SIZES.BASE,
      paddingRight: theme.SIZES.BASE,
      paddingLeft: theme.SIZES.BASE,
      flex: 1
  },
  addressText: {
      backgroundColor: nowTheme.COLORS.WHITE,
      paddingBottom: theme.SIZES.BASE,
  },
  orderDetailCost: {
      backgroundColor: nowTheme.COLORS.WHITE,
      padding: theme.SIZES.BASE,
      flex: 1
  },
  orderDetailTrasaction: {
      backgroundColor: nowTheme.COLORS.WHITE,
      padding: theme.SIZES.BASE,
      flex: 1
  },
  orderDetailButton: {
      backgroundColor: nowTheme.COLORS.BLACK,
      width: width,
      height: 60
  },
  padding: {
      flex:1,
      flexDirection:"row",
      justifyContent:'space-between',
      paddingTop:10
  },
  buttonCancel: { 
    fontWeight: 'bold', 
    fontSize: 22, 
    color: "white",
    height: '100%',
    textAlign: 'center',
    paddingTop: 10
  },
  titleSection: {
      fontSize: 20,
      fontWeight: "bold"
  },
  textSection: {
      fontSize: 18,
  },
  textProduct: {
      fontSize: 16
  },
  detailTransaction: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 10
  },
  ticket: {
    paddingRight: 10
  },
  coupon: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  input: {
    alignSelf: 'center',
    borderBottomColor: theme.COLORS.BLACK,
    borderWidth: theme.SIZES.BASE * 0.04,
    borderRadius: 0,
    paddingHorizontal: 0,
    fontWeight: "bold",
    color: "black"
  },
  change: {
    color: nowTheme.COLORS.PIDENOS,
    fontSize: 14
  },
  containerDetail: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentPayment: {
    backgroundColor: "white",
    borderRadius: 14,
    flex: 0.75,
    width: width - (theme.SIZES.BASE*3)
  },
  inputPayment: {
    margin: theme.SIZES.BASE
  },
  searchPayment: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    width: width - theme.SIZES.BASE * 6,
    height: 48,
  },
  buttonNewPayment: {
    marginBottom: theme.SIZES.BASE,
    flex: 0.08,
    alignItems: "center"
  },
  containerPaymentItems: {
    
  },
  noMethodpayment: {
    color: 'black',
    fontSize: 20,
    marginTop: theme.SIZES.BASE*4,
    alignSelf: "center",
    fontWeight: "bold"
  },
  newPaymentText: {
    color: 'white',
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold"
  },
  touchableOpacity: {
    margin: theme.SIZES.BASE,
    alignItems: "flex-start"
  },
  titlePayment: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: theme.SIZES.BASE
  },
  subtitlePayment: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: theme.SIZES.BASE,
    marginBottom: 10
  },
  scrollViewCheckout:{
    height: height * 0.6
  },
  hyperlink: {
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.PIDENOS,
    fontSize: 14
  },
  checkbox: { 
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: theme.SIZES.BASE
  },
  checkboxlabel: {
    color: nowTheme.COLORS.HEADER,
    fontFamily: 'montserrat-regular',
    fontSize: 14
  },
})