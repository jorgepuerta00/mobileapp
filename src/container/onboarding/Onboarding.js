import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Block } from 'galio-framework';
import styled from "styled-components";

import { Images } from '../../constants';
import { Touchable } from '../../components';
import styles from './styles'

import { connect } from 'react-redux';
import { getUser as setUserAction } from '../../services/user/selectors';
import { getUserPending, getUserError } from '../../services/user';
import { setCart as setCartAction } from '../../services/cart/action'
import { fetchOrders as fetchOrdersAction } from '../../services/order/selectors';

function mapStateToProps(state) {
  return {
    pending: getUserPending(state),
    error: getUserError(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCart: (cart) => dispatch(setCartAction(cart)),
  setUser: (user) => dispatch(setUserAction(user)),
  fetchOrders: (userID) => dispatch(fetchOrdersAction(userID))
});

class Onboarding extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  async componentDidMount() {
    await this._retrieveData()
    this.routeToApp()
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  getOrders(user) {
    const { fetchOrders } = this.props;
    if (user != null) {
      fetchOrders(user.id)
    }
  }

  shouldComponentRender() {
    if (this.props.pending === false)
      return false;
    return true;
  }

  routeToApp = () => {
    const { navigation } = this.props
    navigation.navigate('App');
  }

  _retrieveData = async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            let value = JSON.parse(store[i][1]);
            if (value !== null) {
              if (key == '@pidenos:cart') {
                this.setCart(value)
              }
              else if (key == '@pidenos:user') {
                this.setUser(value)
              }
            }
          });
        });
      });
    } catch (error) {
      console.log(error)
    }
  };

  async setUser(data) {
    const { setUser } = this.props
    await setUser(data)
    await this.getOrders(data)
  }

  setCart(data) {
    const { setCart } = this.props
    setCart(data)
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  render() {
    return (
      <Touchable onPress={() => this.props.navigation.navigate('App')}>
        <Block style={styles.container}>
          <Background source={Images.init} style={styles.profileContainer} />
          <Block flex>
            <Block space="between" style={styles.padded}>
              <Block middle>
                {/* <Image
                  resizeMode="contain"
                  source={Images.icon}
                  cache='force-cache'
                  style={styles.onboardingImage}
                /> */}
              </Block>
            </Block>
          </Block>
        </Block>
      </Touchable>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;