import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage
} from "react-native";
import { Block } from "galio-framework";
import { FontAwesome } from '@expo/vector-icons';
import Constants from "expo-constants";

import styles from './styles';
import { MenuItem, Img, Touchable } from "../../components";

import { connect } from "react-redux";
import { setName, setAvatar, clearUser as clearUserAction, } from '../../services/user/selectors';
import { signOut as signOutAction } from '../../services/login/selectors';
import { getSignOut } from '../../services/login';

const version = Constants.manifest.version;

function mapStateToProps (state) {
  return {
    signOut: getSignOut(state)
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateName: (name) => dispatch(setName(name)),
  updateAvatar: (avatar) => dispatch(setAvatar(avatar)),
  signOut: () => dispatch(signOutAction()),
  clearUser: (name) => dispatch(clearUserAction(name))
});

class Menu extends React.Component {

  constructor(props){
    super(props);
    this.signOutFirebase = this.signOutFirebase.bind(this);
  }

  componentWillUnmount() {
    this.setState = (state, callback)=>{
        return;
    };
  }

  routeToPro = () => {
    this.props.navigation.navigate("Pro");
  }

  routeToProfile = () => {
    this.props.navigation.navigate("Profile");
  }

  routeToOrder = () => {
    this.props.navigation.navigate("Order");
  }

  routeToHome = () => {
    this.props.navigation.navigate("Home");
  }

  closeLogin() {
    this.routeToHome()
    this.props.clearUser();
  }

  async signOutFirebase() {
    await this.props.signOut()
    const { signOut } = this.props
    if (signOut){ 
      this.closeLogin()
      this._removeData()
    }
    else if (error) {
      var errorMessage = error.message;
      Alert.alert("Sign out Error", errorMessage)
    }
  }

  handleMenu = index => {
    if (index ===  0) {
      this.routeToProfile()
    }
    else if (index === 2) {
      this.routeToOrder()
    }
    else if (index === 4) {
      this.signOutFirebase();
    }
    else {
      this.routeToPro()
    }
  };

  _removeData  = async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiRemove(keys, (err) => {
        });
      });
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    const {
      drawerPosition,
      navigation,
      profile,
      focused,
      state,
      intlData,
      ...props
    } = this.props;    
    return (
        <Block style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
          <Block style={styles.header}>
            <Block style={styles.block}>
              <Block style={styles.touchableOpacity}>
              <Touchable onPress={this.routeToHome}>
                <Block style={[styles.circleShadow]}>
                  <FontAwesome name="close" size={24} color="black" />
                </Block>
              </Touchable>  
              </Block>
              <Block row>
                <TouchableWithoutFeedback>
                  <Img source={this.props.avatar} size="full" shadowless/>
                </TouchableWithoutFeedback>
                <Block flex={1} style={styles.CardStyle}>
                  <Text style={styles.welcome}>{intlData.messages.menu.title}</Text>
                  <Text style={styles.name}>{this.props.name}</Text>
                </Block>
              </Block>
            </Block>
              <Block style={styles.itemsStyle}>
                { screens.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.handleMenu(index);
                    }}
                  >
                    <MenuItem 
                        icon={item.icon} 
                        title={intlData.messages.menu[item.key].title} 
                        text={intlData.messages.menu[item.key].text}
                        style={styles}
                    />
                  </TouchableOpacity>
                ))}
              </Block>
          </Block>
          <Block style={styles.versionContainer}>
            <Text style={styles.versiontext}>Version {version}</Text>
          </Block>
        </Block>
    );
  }
}

export default connect(
                mapStateToProps,
                mapDispatchToProps
              )(Menu);

const screens = [
  {
    icon: "ios-person",
    key: "settings"
  },
  {
    icon: "ios-card",
    key: "payment"
  },
  {
    icon: "ios-compass",
    key: "orders"
  },
  {
    icon: "ios-settings",
    key: "help"
  },
  {
    icon: "ios-exit",
    key: "logout"
  }
];
