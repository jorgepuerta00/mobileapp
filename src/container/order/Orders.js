import React from "react";
import { FlatList } from "react-native"
import { Block, Text } from "galio-framework";
import styles from './styles';
import { Spinner, OrderItem } from '../../components';

import { connect } from 'react-redux'
import { getOrder, getOrderPending, getOrderError } from '../../services/order';
import { fetchOrders as fetchOrdersAction } from '../../services/order/selectors';

const mapStateToProps = (state) => {
  return {
    orders: getOrder(state),
    pending: getOrderPending(state),
    error: getOrderError(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (userID) => dispatch(fetchOrdersAction(userID))
});

class Orders extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus', () => {
        this.getOrders()
      });
  }

  componentWillUnmount() {
    this._unsubscribe();

    this.setState = (state, callback) => {
      return;
    };
  }

  getOrders() {
    const { fetchOrders, user } = this.props;
    if (user != null) {
      fetchOrders(user.id)
    }
  }

  shouldComponentRender() {
    if (this.props.pending === false)
      return false;
    return true;
  }

  routeToDetail = (order) => {
    const { navigation } = this.props
    navigation.navigate('OrderDetail', {
      order
    });
  }

  _renderItem = ({ item }) => (
    <OrderItem
      code={item.code}
      date={item.date}
      state={item.state}
      style={styles}
      intlData={this.props.intlData}
      onPress={this.routeToDetail.bind(this, item)}
    />
  );

  render() {
    const { orders, intlData } = this.props;

    return (
      <Block flex>
        <Spinner
          spinnerKey={"SpinnerOrder"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
        <Block flex={2} style={styles.container}>
          <Block flex style={[styles.header, styles.shadow]}>
            <Text style={styles.title}>{intlData.messages.order.title}</Text>
            <Text style={styles.subtitle}>{intlData.messages.order.subtitle}</Text>
          </Block>
          <Block flex style={styles.body}>
            <Block flex style={[styles.orderContain, styles.shadow]}>
              <FlatList
                windowSize={5}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this._renderItem}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);