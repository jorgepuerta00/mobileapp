import React from "react";
import { Text } from "react-native";
import { Block } from "galio-framework";
import ProducList from './ProductList';
import styles from './styles';
import { Spinner } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchProductsAction from '../../services/products/selectors';
import { getProductsError, getProducts, getProductsPending } from '../../services/products';

function mapStateToProps(state) {
  return {
    products: getProducts(state),
    pending: getProductsPending(state),
    error: getProductsError(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts: fetchProductsAction
}, dispatch)

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    const dataShop = this.props.route.params.dataShop;
    fetchProducts(dataShop.id)
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

  render() {
    const { products, error, intlData } = this.props;
    const { type } = this.props.route.params.dataShop

    if (this.shouldComponentRender() || products === undefined) {
      return (
        <Spinner
          spinnerKey={"SpinnerProduct"}
          visible={this.shouldComponentRender()}
          textContent={intlData.messages.loading}
          animation="fade"
        />
      )
    }

    return (
      <Block style={{
        marginLeft: 10,
      }}>
        {   error ? <Text style={styles.message}>{intlData.messages.message.title}</Text> :
          <ProducList horizontal data={products} type={type} {... this.props} />
        }
      </Block>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);