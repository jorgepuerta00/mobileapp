import React from "react";
import ProductDetail from "../container/products/Detail";

import { ConnectedComponent as connect } from '../components';

class ProductDetailScreen extends React.Component {
  
    closeScreen = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ProductDetail 
                product={this.props.route.params.product} 
                onPressCloseScreen={this.closeScreen}
                {... this.props}
            />
        );
    }
}

export default connect(ProductDetailScreen);