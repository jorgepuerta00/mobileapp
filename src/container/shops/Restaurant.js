import React from "react";
import { FlatList, View, Image } from "react-native";
import { Block, Text } from "galio-framework";
import Card from '../../components/Card';
import styles from './styles';
import { Spinner, Swiper } from '../../components';

import { connect } from 'react-redux';
import { fetchRestaurants as fetchRestaurantsAction } from '../../services/restaurants/selectors';
import { getRestaurants, getRestaurantsPending, getRestaurantsError } from '../../services/restaurants';

function mapStateToProps(state) {
  return {
    restaurants: getRestaurants(state),
    pending: getRestaurantsPending(state),
    error: getRestaurantsError(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRestaurants: (type) => dispatch(fetchRestaurantsAction(type))
});

class Restaurant extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchRestaurants } = this.props;
    fetchRestaurants('restaurant')
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
    navigation.navigate('Shop', { dataShop: data })
  }

  _renderFooter = () => (
    <Block style={{ height: 250 }}>
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
        numColumns={1}
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        renderItem={this._renderItembanner}
      />
      <Text style={styles.title}>{this.props.intlData.messages.restaurant.titleshops}</Text>
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
    <Block>
      <Card
        name={item.name}
        source={item.image}
        description={item.description}
        size="large"
        onPress={this.routeToShop.bind(this, item)}
        style={styles}
        shadowless
      />
      <Block style={styles.divider} />
    </Block>
  );

  renderShops = (data) => {
    return (
      <Block>
        <FlatList
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
        />
      </Block>
    );
  };

  render() {
    const { restaurants, error, intlData } = this.props;

    if (this.shouldComponentRender() || restaurants === undefined) {
      return (
        <Spinner
          spinnerKey={"SpinnerRestaurant"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
      )
    }

    return (
      <Block flex center>
        {  error ? <Text style={styles.card}>{intlData.messages.message.title}</Text> :
          this.renderShops(restaurants)
        }
      </Block>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);

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