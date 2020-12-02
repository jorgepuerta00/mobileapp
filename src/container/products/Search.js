import React from "react";
import { 
    TouchableWithoutFeedback,
    Keyboard,
    Text
} from 'react-native';
import { nowTheme } from '../../constants';
import { FontAwesome } from '@expo/vector-icons'; 
import { theme, Block } from 'galio-framework';
import { Input } from '../../components';
import ProducList from './ProductList';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchSearchAction from '../../services/search/selectors';
import { getSearchError, getSearch, getSearchPending } from '../../services/search';

function mapStateToProps (state) {
  return {
    search: getSearch(state),
    pending: getSearchPending(state),
    error: getSearchError(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSearch: fetchSearchAction
}, dispatch)

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);        
    }
    
    componentDidMount() {
        this.searchProducts("")
    }

    componentWillUnmount() {
        this.setState = (state, callback)=>{
            return;
        };
      }
    
    shouldComponentRender() {
        if(this.props.pending === false) 
          return false;
        return true;
    }

    searchProducts = (searchValue) => {
        const { fetchSearch } = this.props;
        fetchSearch(searchValue)
    }

    render() {
        const { search, error, intlData } = this.props;
        return (
            <Block style={styles.containerSearch}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Block style={styles.productContainer}>
                        <Block style={styles.searchContaiter}>
                            <Input
                                right
                                color="black"
                                style={styles.search}
                                maxLength={30}
                                autoFocus={true}
                                placeholder={this.props.intlData.messages.search.search}
                                placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                iconContent={
                                    <FontAwesome name="search" size={18} color={theme.COLORS.MUTED}/>
                                }
                                onChangeText={searchValue => this.searchProducts(searchValue)}
                            />
                        </Block>
                        <Block style={styles.productslist}>
                        {   
                            this.shouldComponentRender() 
                            ? <Text style={styles.text}>{intlData.messages.loading}</Text>
                            : error 
                                ? <Text style={styles.text}>{intlData.messages.message.title}</Text> 
                            : search === undefined ? <Block/>
                                : <ProducList type={"shop"} search data={search} {... this.props}/>
                        }
                        </Block>
                    </Block>
                </TouchableWithoutFeedback>
            </Block>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search);