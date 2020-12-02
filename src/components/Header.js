import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button as GaButton, Block, NavBar, Text, theme } from 'galio-framework';
import { Feather, Entypo, AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import NavigationBar from 'react-native-navbar';
import { withNavigation } from '@react-navigation/compat';
import { nowTheme } from '../constants';
import Icon from '../components/Icon'
import Tabs from '../components/Tabs'
import Touchable from '../components/Touchable'
import Img from '../components/Img'
import Button from '../components/Button'
import styled from "styled-components";
import { HeaderHeight, isIOS } from '../constants/utils'
import Theme from '../constants/Theme';

const { width, height } = Dimensions.get('window');

const BellButton = ({ isWhite, style, navigation }) => (
  <Touchable style={style} onPress={() => navigation.navigate('Pro')}>
    <Block style={styles.circleShadow}>
      <AntDesign name="staro" size={24} color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']} />      
    </Block>
  </Touchable>
);

const BasketButton = ({ isWhite, style, navigation, totalItemsInCart }) => (
    <Touchable style={style} onPress={() => navigation.navigate('Cart')}>
      <Block>
        <Block style={styles.circleShadow}>
          <Feather name="shopping-cart" size={20} color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']} />
        </Block>
        { totalItemsInCart > 0 ? <Badge cartNotify={styles.cartNotify} totalItems={totalItemsInCart}/>:null }
      </Block>
    </Touchable>
);

const Badge = ({cartNotify, totalItems})=>(
  <Block style={cartNotify}>
    <Text style={styles.textNotify}>{totalItems}</Text>
  </Block>
);

const AvatarShop = ({ data, style, shop }) => (
  <Block>
    { shop?
      <Block style={style}>
        <Img source={data.logo} color={data.description} size="shop" shadowless/>
      </Block>
      : <Block />
    }
  </Block>
);

class Header extends NavBar {

  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  renderFavoriteItems = () => {
    const { navigation, white } = this.props;
    return (
      <BellButton 
        key="chat-title" 
        style={styles.button} 
        navigation={navigation} 
        isWhite={white} 
      />
    )
  }

  renderNotificationCart = () => {
    const { navigation, totalItemsInCart, white } = this.props;
    return (
      <BasketButton 
        key="basket-title" 
        style={styles.button} 
        navigation={navigation} 
        isWhite={white} 
        totalItemsInCart={totalItemsInCart} 
      />
    )
  }

  renderSearch = () => {
    const { navigation, intlData, shop } = this.props;
    return (
      <Button
        shadowless
        color="white"
        style={styles.buttonSearch} 
        round
        onPress={() => navigation.navigate('Search')}
      > 
        <Block row>
          <Text style={styles.textAlign}>
            {intlData.messages.home.search}
          </Text>
          <Block style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end"
          }}>
            <FontAwesome style={{paddingRight: 16}} name="search" size={18} color={theme.COLORS.MUTED}/>
          </Block>
        </Block>
      </Button>
    );
  };

  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;
    return (
      <Block row style={styles.options}>
        <GaButton
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={ navigation.navigate('Pro') }
        >
          <Block row middle>
            <Icon
              name="bulb"
              family="NowExtra"
              size={18}
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionLeft || 'Beauty'}
            </Text>
          </Block>
        </GaButton>
        <GaButton shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon
              size={18}
              name="bag-162x"
              family="NowExtra"
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </GaButton>
      </Block>
    );
  };

  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    if (!tabs) return null;
    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })}
      />
    );
  };

  renderBackground = () => {
    const { data } = this.props;
    return (
      <Block>
        <Background source={{ uri: data.image }} />
        <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"]}
            style={styles.linearGradient}
          />
      </Block>
    )
  };

  renderAvatarShop = () => {
    const { shop, data } = this.props;
    return (
      <Block style={styles.avatarShop}>
        <AvatarShop 
          key="chat-title" 
          shop={shop} 
          data={data} 
        />
      </Block>
    )
  }

  renderAddress = () => {
    const { user, navigation, intlData } = this.props;
    let address
    
    try {
      address = user.addresses[0]
      if (address==undefined) {
        address = intlData.messages.addresses.add
      }
    } catch {
      address = intlData.messages.addresses.add
    }
    
    return (
      <Touchable onPress={() => navigation.navigate('Addresses')}>
        <Block row>
          <Text style={styles.textAddress}>{address}</Text>
          <AntDesign style={styles.iconAddress} name="caretdown" size={12} color="black" />
        </Block>
      </Touchable>
    )
  }

  renderOrdersInProgress = () => {
    const { navigation, totalActiveOrders, intlData } = this.props;

    if (totalActiveOrders==0)
      return null;

    return (
      <Touchable onPress={()=>navigation.navigate("Order")}>
        <Block row style={[{
          marginTop: 10,
          marginLeft: Theme.SIZES.BASE,
          width: width * 0.9,
          height: theme.SIZES.BUTTON_HEIGHT,
          borderRadius: 14,
          justifyContent: "space-between"
        }, styles.shadow]}>
          <Block row
            style={{
              marginLeft: nowTheme.SIZES.BASE,
              alignItems: "center"
            }}
          >
            <Badge cartNotify={styles.orderInProgressNotify} totalItems={totalActiveOrders}/>
            <Text style={styles.textOrderInProgress}>{intlData.messages.order.ordersinprogress}</Text>
          </Block>
          <Block row
            style={{
              margin: 5,
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: nowTheme.SIZES.BASE,
            }}
          >
            <FontAwesome5 name="shipping-fast" size={20} color={theme.COLORS.MUTED} />
          </Block>
        </Block>
      </Touchable>
    );
  };

  renderBack = () => {
    const { navigation } = this.props;
    return (
      <Touchable onPress={navigation.goBack}>
        <Block style={styles.circleShadow}>
          <Entypo name="chevron-left" size={24} color={nowTheme.COLORS.ICON} />
        </Block>
      </Touchable>
    )
  }

  renderAvatarHome = () => {
    const { name, navigation, intlData } = this.props;
    const screen = name == intlData.messages.home["strager"] ? 'Login' : 'Menu'
    return (
      <Touchable>
        <Img onPress={() => navigation.navigate(screen)} source={this.props.avatar} size="avatar"/>
      </Touchable> 
    )
  }
  
  renderTitle = () => {
    const { title, name, white, titleColor } = this.props;
    const titletext = title==="Home" ? name : title
    const titleStyles = [title=="Home" ? styles.avatarTitle : styles.title]
    return (
        <Block>
            <Text style={[
            titleStyles,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'SECONDARY'] },
            titleColor && { color: titleColor }
          ]}>{titletext}</Text>
        </Block>
    )
  }

  renderHeader = () => {
    const { order, search, options, tabs, shop } = this.props;
    return (
      <Block styles={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        {order && this.renderOrdersInProgress()}
        {search && this.renderSearch()}
        {shop && this.renderAvatarShop()}
        {options && this.renderOptions()}
        {tabs && this.renderTabs()}
      </Block>
    );
  };

  renderLeft = () => {
    const { back, home, intlData, name } = this.props
    const user = name == intlData.messages.home["strager"] ? true : false
    return (
      <Block style={styles.left}>
        {back && this.renderBack()}        
        {home && this.renderAvatarHome()}
      </Block>
    );
  }
  
  renderCenter = () => {
    const { title, address, home, shop } = this.props
    return (
      <Block style={home?styles.center:styles.centerTitle}>
        {title && this.renderTitle()}
        {address && this.renderAddress()}
      </Block>
    );
  }

  renderRight = () => {
    const { favorite, notification } = this.props

    return (
      <Block style={styles.right}>
        {favorite && this.renderFavoriteItems()}        
        {!isIOS&&<Text>  </Text>}
        {notification && this.renderNotificationCart()}        
        {!isIOS&&<Text>     </Text>}
      </Block>
    );
  }
  
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      shop,
      home,
      noShadow,
      ...props
    } = this.props;

    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: theme.COLORS.TRANSPARENT } : null
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <SafeAreaView edges={['right', 'top', 'left']}>
        <Block style={[headerStyles, navbarStyles]}>
          {shop && this.renderBackground()}
          <NavigationBar
            title={this.renderCenter()}
            rightButton={this.renderRight()}
            leftButton={this.renderLeft()}
            tintColor={transparent && theme.COLORS.TRANSPARENT}
            {...props}
          >
          </NavigationBar>        
          {this.renderHeader()}
        </Block>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Header);

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height/4 - HeaderHeight}px;
`;

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute", 
    width: width, 
    height: height/4 - HeaderHeight
  },
  avatarShop: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  circleShadow:{
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 1
  },
  button: {
    padding: isIOS ? 5 : 10,
    right: nowTheme.SIZES.BASE
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: "capitalize"
  },
  iconAddress: {
    
  },
  textAddress: {
    fontSize: isIOS ? 18 : 16,
    fontWeight: 'bold',
    color: nowTheme.COLORS.BLACK
  },
  textOrderInProgress: {
    fontSize: isIOS ? 18 : 16,
    fontWeight: 'bold',
    color: nowTheme.COLORS.BLACK,
    paddingLeft: nowTheme.SIZES.BASE*2
  },
  avatarTitle: {
    width: '100%',
    fontSize: isIOS ? 25 : 20,
    fontWeight: 'bold',
    textTransform: "capitalize",
  },
  navbar: {
    justifyContent: "center",
    paddingTop: isIOS ? 0 : 20
  },
  shadow: {
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 10,
    height: theme.SIZES.BASE / 1.2,
    width: theme.SIZES.BASE / 1.2,
    position: 'absolute',
    top: -5,
    right: -5,
  },
  textNotify: {
    color: nowTheme.COLORS.WHITE,
    fontSize: isIOS ? 16 : 12
  },
  orderInProgressNotify: {
    borderRadius: 14,
    height: theme.SIZES.BASE*1.6,
    width: theme.SIZES.BASE*1.6,
    backgroundColor: nowTheme.COLORS.SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    elevation: 4
  },
  cartNotify: {
    borderRadius: 14,
    height: theme.SIZES.BASE*1.6,
    width: theme.SIZES.BASE*1.6,
    backgroundColor: nowTheme.COLORS.SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: theme.SIZES.BASE*1.3,
    left: theme.SIZES.BASE*1.3,
    elevation: 4
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    borderRadius: 14,
    borderColor: nowTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  buttonSearchShop: {
    width: width * 0.9,
    height: theme.SIZES.BUTTON_HEIGHT,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 14,
    margin: theme.SIZES.BASE,
    marginTop: isIOS ? theme.SIZES.BASE*2 : theme.SIZES.BASE*4
  },
  buttonSearch: {
    width: width * 0.9,
    height: theme.SIZES.BUTTON_HEIGHT,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 14,
    margin: theme.SIZES.BASE,
    marginLeft: nowTheme.SIZES.BASE
  },
  textAlign: {
    flex: 1,
    textAlign: "left", 
    alignSelf: 'flex-start',
    paddingLeft: theme.SIZES.BASE,
    fontSize: 14,
    fontWeight: "normal",
    color: nowTheme.COLORS.MUTED
  },
  right: {
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  center: {
    width: "65%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 0,
  },
  left: {
    flexDirection: "row", 
    alignItems: "center",
    left: nowTheme.SIZES.BASE,
    marginBottom: 10,
  },
  centerTitle: {
    width: "65%",
    height: HeaderHeight,
    justifyContent: "center",
    alignItems: "center",
  }

});