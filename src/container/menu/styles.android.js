import { StyleSheet, Dimensions } from "react-native"
import { theme } from "galio-framework"
import { nowTheme } from '../../constants'
import { HeaderHeight } from "../../constants/utils"

const { width, height } = Dimensions.get('screen')

export default StyleSheet.create({
  welcome: {
    fontSize: 18
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#3c4560"
  },
  block: {
    marginBottom: theme.SIZES.BASE * 2
  },
  CardStyle: {
    marginStart: theme.SIZES.BASE,
    justifyContent: "center",    
  },
  touchableOpacity: {
    marginEnd: theme.SIZES.BASE,
    alignItems: "flex-end"
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
    height: height
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
    paddingTop: theme.SIZES.BASE * 2.5,
    width: width,
    height: height - HeaderHeight*2
  },
  logo: {
    height: 40,
    width: 37
  },
  itemsStyle:{
    marginTop: theme.SIZES.BASE,
    alignItems: "stretch"
  }, 
  
    containerMenuItem: {
      flexDirection: "row",
      margin: 15,
    },
    iconView: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      paddingLeft: 20,
    },
    title: {
      color: "#3c4560",
      fontSize: 16,
      fontWeight: "bold",
    },
    text: {
      color: "#3c4560",
      fontWeight: "bold",
      opacity: 0.6,
      marginTop: 5,
      fontSize: 12,
    },
    versionContainer: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      width: width,
      height: HeaderHeight,
      backgroundColor: nowTheme.COLORS.BORDER_COLOR,
      paddingTop: 6
    },
    versiontext: {
      color: nowTheme.COLORS.MUTED,
      fontSize: 12,
      fontWeight: "bold"
    }
})
