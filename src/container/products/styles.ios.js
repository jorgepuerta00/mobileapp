import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { nowTheme } from '../../constants';
import { HeaderHeight } from '../../constants/utils'

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  home: {
    width: width
  },
  message: {
    margin: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 2
  },
  titlecategory: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 22,
    paddingTop: theme.SIZES.BASE,
    textTransform: "capitalize",
    fontWeight: "500"
  },
  card: {
      marginLeft: theme.SIZES.BASE
  },
  horizontalImage: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 14,
  },
  shadow: {
    shadowColor: '#c6c6c6',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
  },
  title: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 22,
    marginLeft: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 0.5,
    textTransform: "capitalize",
    fontWeight: "500"
  },
  subtitle: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 15,
    marginTop: 5,
    textTransform: "capitalize",
  },
  price: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "600"
  },
  promotion: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 18,
    marginLeft: 10,
    textTransform: "uppercase",
    textDecorationLine: "line-through"
  },
  description: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 12,
    marginTop: 5,
  },
  discount: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 12,
    textTransform: "uppercase",
    textAlign: "center",
    margin: 1
  },
  optionsButton: {
    width: 'auto',
    height: '70%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 5
  },
  containerImageShop: {
    
  },
  containerInformation: {
    marginTop: theme.SIZES.BASE,
    width: width/3.5
  },
  imageShopContainer: {
    backgroundColor: "white",
    height: width/3.5,
    width: width/3.5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14
  },
  imageCoverShop:{
    height: '100%',
    width: '100%',
    backgroundColor: "white",
    borderRadius: 14,
  },  
  text: {
    margin: theme.SIZES.BASE,
  },
  container: {
    width: width,
    height: height,
  },
  textButtonDetail: {
    fontFamily: 'montserrat-bold', 
    fontSize: 22, 
    color: nowTheme.COLORS.WHITE
  },
  cardButton: {
    marginLeft: theme.SIZES.BASE,
    marginRight: 0,
    backgroundColor: nowTheme.COLORS.WHITE,
    width: '55%',
    height: HeaderHeight,
    justifyContent: "space-around",
    borderRadius: 14,
    borderColor: nowTheme.COLORS.LIGHT_GRAY,
    borderWidth: 1,
    alignItems: "center"
  },
  productInformationContainer: {
    width: "100%",
    height: "100%"
  },
  relatedProducts: {
    flex: 1,
    padding: theme.SIZES.BASE,
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  cardContainer: {
    backgroundColor: nowTheme.COLORS.WHITE,
    flex: 0.5,
    justifyContent: "center",
  },
  horizontalImageDetail: {
    height: "80%",
    width: "80%",
    backgroundColor: theme.COLORS.WHITE,
  },
  contentButtons: {
    backgroundColor: theme.COLORS.WHITE,
    width: width,
    height: HeaderHeight*2,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: theme.SIZES.BASE,
    flex: 0.4
  },
  buttonCard: {
   marginBottom: 10 
  },
  button: {
    width: width / 2,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: -90,
    borderRadius: 10
  },
  header: {
    marginRight: theme.SIZES.BASE,
    marginLeft: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    justifyContent: "space-between",
  },
  circleShadow: {
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
  containerDetail: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: width,
    height: height,
  },
  contentScreen: {
    height: height,
    width: width,
    marginTop: theme.SIZES.BASE * 2,
    paddingBottom: theme.SIZES.BASE * 3.5,
  },
  subtitleDetail: {
      color: nowTheme.COLORS.BLACK,
      fontSize: 28,
      textTransform: "capitalize",
      fontWeight: "600",
  },
  priceDetail: {
      color: nowTheme.COLORS.BLACK,
      fontSize: 20,
      textTransform: "uppercase",
      fontWeight: "600",
      marginTop: theme.SIZES.BASE,
  },
  promotionDetail: {
      color: nowTheme.COLORS.GRAY,
      fontSize: 20,
      marginLeft: 10,
      textTransform: "uppercase",
      textDecorationLine: "line-through",
      margin: theme.SIZES.BASE,
  },
  descriptionDetail: {
      color: nowTheme.COLORS.GRAY,
      fontSize: 21,
      textTransform: "capitalize",
      marginTop: 15,
  },
  discountDetail: {
      color: nowTheme.COLORS.WHITE,
      fontSize: 17,
      textAlign: "center",
      margin: 2,
      padding: 2
  },
  box: {    
      backgroundColor: nowTheme.COLORS.RED,
      borderRadius: 14,
      height: 25,
      width: 45,
      marginTop: 10
  },
  badge: {
    width: '50%', height: '100%',
    marginTop: 6
  },
  icon: {
    width: '50%', height: '100%',
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circleBadge: {
    backgroundColor: nowTheme.COLORS.WHITE,
    width: '40%', height: '70%',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 5
  },
  itemsCartGoToPay: {
    fontFamily: 'montserrat-bold', 
    fontSize: 22, 
    color: nowTheme.COLORS.PIDENOS,
    textAlign: 'center'
  },
  productShop: {
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE
  },
  buttonCardProduct: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 40
  },
  optionsButtonProduct: {
    width: '100%',
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  textButton: {
    color: nowTheme.COLORS.PIDENOS,
    fontSize: 16
  },
  /* Search Screen */
  productslist: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.SIZES.BASE
  },
  containerSearch: {
    width: width
  },
  productContainer: {
    width: "100%",
    height: "100%",
  },
  searchContaiter: {
    alignItems: "center"
  },
  search: {
    borderWidth: 1,
    borderRadius: 14,
    width: width - (theme.SIZES.BASE*3),
    height: 48,
  },
  productItem: {
    paddingTop: theme.SIZES.BASE,
    paddingRight: 10,
    paddingLeft: 1
  },
  productList: {
    flexWrap: 'wrap'
  },
  imageCoverSearch: {
    width: 150,
    borderRadius: 10,
    height: '100%'
  },
  imageSearchContainer: {
    height: 120,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    elevation: 2,
    margin: 5,
    marginLeft: theme.SIZES.BASE,
  },
  containerLarge:{
    backgroundColor: theme.COLORS.WHITE,
    width: 100,
    height: 100,
    overflow: "hidden",
    marginTop: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderRadius: 14,
    marginLeft: 1
  },
  coverLarge: {
    justifyContent: "flex-end"
  },
  imageLarge: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    width: width - theme.SIZES.BASE*1.5,
    height: 0.5,
    backgroundColor: nowTheme.COLORS.LIGHT_GRAY,
    marginRight: nowTheme.SIZES.BASE,
    marginTop: nowTheme.SIZES.BASE
  },
  caption: {
    color: nowTheme.COLORS.BLACK,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: theme.SIZES.BASE,
    textTransform: "capitalize"
  },
  subcaption: {
    color: nowTheme.COLORS.GRAY,
    fontSize: 14,
    marginTop: 5,
    textTransform: "capitalize"
  }
})