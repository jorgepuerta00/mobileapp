import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { nowTheme } from '../../constants';
import { HeaderHeight } from '../../constants/utils'

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: theme.SIZES.BASE*6,
        paddingLeft: theme.SIZES.BASE*4,
        color: nowTheme.COLORS.WHITE
    },
    title: {
        color: nowTheme.COLORS.BLACK,
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    subtitle: {
        color: nowTheme.COLORS.MUTED,
        fontSize: 17,
        marginTop: 5,
    },
    body: {
        flex: 8,
        paddingTop: 10,
        alignItems:'center', 
        justifyContent:'center',
        paddingBottom: 10,
    },
    orderContain: {
        width: width
    },
    shadow: {
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 1
    },
    orderItemContainer: {
        borderBottomColor: nowTheme.COLORS.BACKGROUND_APP,
        borderBottomWidth: 2,
        padding: 10
    },
    scrollViewOrders: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 10
    },
    imageOrderItem: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    orderItemCardContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1
    },
    iconContainer: {
        width: 1,
        justifyContent: "center",
        alignItems: "center",
        flex: 0.25
    },
    orderItemTitle: {
        fontWeight: "bold",
        fontSize: 14,
        paddingTop: 10
    },
    orderItemSubtitle: {
        fontWeight: "normal",
        fontSize: 16,
        paddingTop: 10
    },
    orderItemDate: {
        fontWeight: "normal",
        fontSize: 14,
        color: nowTheme.COLORS.MUTED
    },
    orderItemStatus: {
        fontWeight: "bold",
        fontSize: 14,
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
    headerOrderDetail: {
        paddingTop: 10,
        paddingBottom: theme.SIZES.BASE,
        paddingLeft: theme.SIZES.BASE,
        backgroundColor: nowTheme.COLORS.WHITE,
        flex: 0.17
    },
    orderDetailDate: {
        fontWeight: "normal",
        fontSize: 14,
        color: nowTheme.COLORS.MUTED
    },
    orderDetailStatus: {
        fontWeight: "bold",
        fontSize: 14,
    },
    touchableButton: {
        marginTop: 10
    },
    productsSummary: {
        backgroundColor: nowTheme.COLORS.WHITE,
        padding: theme.SIZES.BASE,
        flex: 1
    },
    orderDetailAddress: {
        backgroundColor: nowTheme.COLORS.WHITE,
        padding: theme.SIZES.BASE,
        flex: 1
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
        backgroundColor: nowTheme.COLORS.WHITE,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE,
        flex: 1
    },
    padding: {
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        paddingTop:10
    },
    button: {
      width: width * 0.9,
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
    buttonEmpty: {
      shadowRadius: 0,
      shadowOpacity: 0,
    },
    buttonCancel: { 
        fontWeight: 'bold',
        fontSize: 18, 
        color: "white",
        height: '100%',
        textAlign: 'center',
        paddingTop: 10
    },
    titleSection: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textSection: {
        fontSize: 16,
    },
    textProduct: {
        fontSize: 12
    },
    detailTransaction: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 10
    },
    containerCheckout: {
      paddingTop: theme.SIZES.BASE,
      backgroundColor: theme.COLORS.WHITE,
      marginTop: theme.SIZES.BASE,
      width: width,
      height: height,
      marginBottom: theme.SIZES.BASE * 2,
    },
    headerCheckout: {
      marginLeft: theme.SIZES.BASE,
      marginRight: theme.SIZES.BASE,
      marginTop: theme.SIZES.BASE*3,
      justifyContent: "space-between"
    },
    checkoutContentButtons: {
        backgroundColor: nowTheme.COLORS.WHITE,
        height: 40,
        width: width,
        flex: 2.5,
        padding: theme.SIZES.BASE
    },
    containerCartFull: {
      height: height/1.6
    },
    headerDetail: {
      padding: theme.SIZES.BASE,
      justifyContent: "space-between"
    },
    contentScreen: {
      width: width,
      height: height,
      marginTop: theme.SIZES.BASE,
    }
})