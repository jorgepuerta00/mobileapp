import React from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Screens from './src/navigation/Screens';
import { Images, nowTheme } from './src/constants';
import { Provider } from "react-redux";
import createStore from "./src/store/createStore";

const store = createStore();

// cache app images
const assetImages = [
  Images.icon,
  Images.init,
  Images.cardback,
  Images.cardfront,
  Images.background,
  Images.Logo,
  Images.RegisterBackground,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfileEmpty,
  Images.LoginLogo,
  Images.Header,
  Images.active,
  Images.inactive,
  Images.delivered,
  Images.unknown,
  Images.cash,
  Images.visa,
  Images.mastercard,
  Images.bitcoin,
  Images.Success,
  Images.Error,
  Images.Warning,
  Images.close,
  Images.tick,
  Images.alert,
  Images.checkout,
  Images.amex,
  Images.creditcard,
  Images.preview,
  Images.dinersclub,
  Images.discover,
  Images.jcb,
  Images.unionpay,
  Images.cashIcon,
  Images.visaIcon,
  Images.mastercardIcon,
  Images.amexIcon,
  Images.dinersclubIcon,
  Images.discoverIcon,
  Images.jcbIcon,
  Images.unionpayIcon
];

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <SafeAreaProvider>
          <Provider store={store}>
            <NavigationContainer>
              <GalioProvider theme={nowTheme}>
                <Block flex>
                  <Screens />
                </Block>
              </GalioProvider>
            </NavigationContainer>
          </Provider>
        </SafeAreaProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: this.state.fontLoaded });
  };
}
