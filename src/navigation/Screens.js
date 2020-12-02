import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { isIOS } from '../constants/utils'
// screens
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Register from '../screens/RegisterScreen';
import Settings from '../screens/SettingsScreen';
import Shop from '../screens/ShopScreen';
import Restaurant from '../screens/RestaurantScreen';
import Deals from '../screens/ProScreen';
import Search from '../screens/SearchSreen';
import Login from '../screens/LoginScreen';
import Menu from '../navigation/Menu';
import Pro from '../screens/ProScreen';
import Onboarding from '../screens/OnboardingScreen';
import Cart from '../screens/CartScreen';
import ProductDetail from '../screens/ProductDetailScreen';
import Addresses from '../screens/AddressesScreen';
import Order from '../screens/OrderScreen';
import OrderDetail from '../screens/OrderDetailScreen';
import Checkout from '../screens/CheckoutScreen';
import OrderConfirmed from '../screens/OrderConfirmedScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import Paymentmethod from '../screens/PaymentmethodScreen';
import ContactInformation from '../screens/ContactInformationScreen';
import PrivacyPolicy from '../screens/PrivacyPolicyScreen';

// header for screens
import Header from './Header';
import { nowTheme } from "../constants";

const MainStack = createStackNavigator();
const RootStack  = createStackNavigator();

const Tab = createBottomTabNavigator();

const activeColor = nowTheme.COLORS.PIDENOS;
const inactiveColor = nowTheme.COLORS.INACTIVE_ITEM;
const backgroundColor = nowTheme.COLORS.BACKGROUND_APP;

function HomeStack(props) {

  let i = 1
  try { 
    i = props.route.state.routes[0].params.dataShop && props.route.state.routes.length-1
  } catch {i = 1}

  return (
    <MainStack.Navigator mode="card" headerMode="screen">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: null,        
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              navigation={navigation}
              scene={scene}
              notification
              favorite
              home
              order
              address
            />
          ),
          cardStyle: { backgroundColor: backgroundColor }
        }}
      />
      <MainStack.Screen
        name="Shop"
        component={Shop}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              search
              shop
              data={props.route.state.routes[i].params.dataShop}
              navigation={navigation}
              scene={scene}
              notification
              favorite
              transparent
            />
          ),
          cardStyle: { backgroundColor: backgroundColor }
        }}
      />
      <MainStack.Screen
        name="Restaurant"
        component={Restaurant}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              navigation={navigation}
              scene={scene}
              notification
              favorite
              back
              address
            />
          ),
          cardStyle: { backgroundColor: backgroundColor }
        }}
      />
      <MainStack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: backgroundColor },
          headerTransparent: true
        }}
      />
      <MainStack.Screen
        name="Order"
        component={Order}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: backgroundColor },
          headerTransparent: true
        }}
      />
    </MainStack.Navigator>
  );
}

function DealsStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen 
        name="Deals" 
        component={Deals} 
        options={{
          header: ({ navigation, scene }) => (
            <Header
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: backgroundColor }
        }}
      />
    </MainStack.Navigator>
  );
}

function SearchStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen 
        name="Search" 
        component={Search} 
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Busqueda"
              navigation={navigation}
              scene={scene}
              notification
              favorite
            />
          ),
          cardStyle: { backgroundColor: backgroundColor }
        }}
      />
    </MainStack.Navigator>
  );
}

function SettingsStack() {
  return (
      <MainStack.Navigator>
        <MainStack.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title="Ayuda"
                navigation={navigation}
                scene={scene}
              />
            ),
            cardStyle: { backgroundColor: backgroundColor }
          }}
        />
    </MainStack.Navigator>
  );
}

function OnboardingStack(props) {
  return (
    <MainStack.Navigator mode="card" headerMode="none">
      <MainStack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <MainStack.Screen name="App" component={AppStack} />      
    </MainStack.Navigator>
  );
}

function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: activeColor,
        inactiveTintColor: inactiveColor,
        tabStyle: {
          borderRightColor: '#ffffff',
        },
        indicatorStyle: {
           borderBottomColor: '#ffffff',
        },
        style: {
          backgroundColor: 'white',
          padding: isIOS ? 15 : 15,
        },
        labelStyle: {
          fontSize: 14,
          fontWeight: "normal",
          marginBottom: isIOS ? -10 : 0,
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} 
        options={{
          tabBarLabel: isIOS ? 'Inicio' : '',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          )
        }}
      />
      <Tab.Screen name="Deals" component={DealsStack} 
        options={{          
          tabBarLabel: isIOS ? 'Promociones' : '',
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="shop"
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen name="Search" component={SearchStack} 
        options={{          
          tabBarLabel: isIOS ? 'Buscar' : '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={SettingsStack} 
        options={{
          tabBarLabel: isIOS ? 'Ayuda' : '',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="help-circle"
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

class App extends React.Component {
  render() {
    return (
      <RootStack.Navigator mode="modal" headerMode="none">      
        <RootStack.Screen name="App" component={OnboardingStack} />
        <RootStack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Cart" 
          component={Cart} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ProductDetail" 
          component={ProductDetail} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="OrderDetail" 
          component={OrderDetail} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Addresses" 
          component={Addresses} 
          options={{          
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' }
          }}
        />
        <RootStack.Screen 
          name="Paymentmethod" 
          component={Paymentmethod} 
          options={{          
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' }
          }}
        />
        <RootStack.Screen 
          name="ContactInformation" 
          component={ContactInformation} 
          options={{          
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' }
          }}
        />
        <RootStack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Pro" 
          component={Pro} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Checkout" 
          component={Checkout} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="OrderConfirmed" 
          component={OrderConfirmed} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="PrivacyPolicy" 
          component={PrivacyPolicy} 
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }
}

export default App;