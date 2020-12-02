import React from "react";
import { FlatList, View, Image } from "react-native";
import { Block, Text } from "galio-framework";
import Card from '../../components/Card';
import styles from './styles';
import { Spinner, Swiper } from '../../components';
import { capitalize } from '../../constants/utils';

import { connect } from 'react-redux';
import { fetchShops as fetchShopsAction } from '../../services/shops/selectors';
import { getShopsError, getShops, getShopsPending } from '../../services/shops';

function mapStateToProps(state) {
  return {
    cart: state.cart,
    shops: getShops(state),
    pending: getShopsPending(state),
    error: getShopsError(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchShops: (type) => dispatch(fetchShopsAction(type))
});

class Shops extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  async componentDidMount() {
    const { fetchShops } = this.props;
    await fetchShops('shop')
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  shouldComponentRender() {
    if (this.props.pending === false)
      return false;
    return true;
  }

  routeToShop = (data) => {
    const { navigation } = this.props
    const screen = capitalize(data.screen)
    navigation.navigate(screen, { dataShop: data })
  }

  _renderFooter = () => (
    <Block style={{ height: 250, paddingBotton: 10 }}>
      <Swiper style={styles.wrapper} showsButtons loop={false}>
        <View testID="Hello" style={styles.slide1}>
          <Image
            source={{ uri: banners[0].image, cache: 'force-cache' }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View testID="Beautiful" style={styles.slide2}>
          <Image
            source={{ uri: banners[1].image, cache: 'force-cache' }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View testID="Simple" style={styles.slide3}>
          <Image
            source={{ uri: banners[2].image, cache: 'force-cache' }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </Swiper>
    </Block>
  );

  _renderHeader = () => (
    <Block>
      <FlatList
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        renderItem={this._renderItembanner}
      />
      <Text style={styles.title}>{this.props.intlData.messages.home.titleshops}</Text>
      <Text style={styles.subtitle}>{this.props.intlData.messages.home.subtitleshops}</Text>
    </Block>
  );

  _renderItembanner = ({ item }) => (
    <Card
      source={item.image}
      size="medium"
      style={styles}
    />
  );

  _renderItem = ({ item }) => (
    <Card
      name={item.name}
      source={item.image}
      color={item.description}
      size="small"
      onPress={this.routeToShop.bind(this, item)}
      style={styles}
    />
  );

  renderShops = (data) => {
    return (
      <Block>
        <FlatList
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          numColumns={4}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
        />
      </Block>
    );
  };

  render() {
    const { shops, error, intlData } = this.props;

    if (this.shouldComponentRender() || shops === undefined) {
      return (
        <Spinner
          spinnerKey={"SpinnerShops"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
      )
    }

    return (
      <Block flex center>
        {  error ? <Text style={styles.card}>{intlData.messages.message.title}</Text> :
          this.renderShops(shops)
        }
      </Block>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shops);

const banners = [
  {
    image: "https://firebasestorage.googleapis.com/v0/b/pidenos-project.appspot.com/o/banners%2FPORTADA%20PIDENOS%203.jpg?alt=media&token=86fa574d-59ab-4a05-af27-43219891dea1",
    key: "0"
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/pidenos-project.appspot.com/o/banners%2FPORTADA%20PIDENOS%202.jpg?alt=media&token=4180b091-9d0a-4fb9-98ec-8aa69a1dc61c",
    key: "1"
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/pidenos-project.appspot.com/o/banners%2FPORTADA%20PIDENOS%201.jpg?alt=media&token=b397158b-12ae-4e17-9759-bddc7c086195",
    key: "2"
  }
];