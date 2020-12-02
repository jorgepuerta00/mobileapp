import React from 'react';
import { Animated, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Block } from 'galio-framework';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from './Swipeable';
import { nowTheme } from "../constants";
import CartItem from "./CartItem";
import AddressItem from "./AddressItem";
import PropTypes from "prop-types";

export default class SwipeableRow extends React.Component {
  
  state = {
    currentlyOpenSwipeable: null,
    isSwiping: false
  };

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  renderItem() {
    const cart = this.props.type.includes("cart")
    const address = this.props.type.includes("address")

    if (cart) {
      return <CartItem 
                item={this.props.item}       
                onPressDecrement={this.props.onPressDecrement}   
                onPressIncrement={this.props.onPressIncrement}   
                onPressRemove={this.props.onPressRemove}
                style={this.props.style}             
              />
    }
    else if (address) {
      return <AddressItem 
                item={this.props.item}       
                index={this.props.index} 
                style={this.props.style}                   
              />
    }

    return (
      <Block></Block>
    );
  };

  render() {
      const { 
          style,
          title,
      } = this.props;

      const {currentlyOpenSwipeable} = this.state;
      const itemProps = {
        onOpen: (event, gestureState, swipeable) => {
          if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
            currentlyOpenSwipeable.recenter();
          }

          this.setState({currentlyOpenSwipeable: swipeable});
        },
        onClose: () => this.setState({currentlyOpenSwipeable: null})
      };

      return (
        <ScrollView 
          scrollEnabled={!this.state.isSwiping}
          onScroll={this.handleScroll} 
        >
          <Swipeable 
            onSwipeStart={() => this.setState({isSwiping: true})}
            onSwipeRelease={() => this.setState({isSwiping: false})}
            rightButtons={[
              <RectButton style={style.rightAction} onPress={this.props.onPressRemove} >
                <Block style={style.buttonDelete}>
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color={nowTheme.COLORS.WHITE} />
                    <Animated.Text style={style.actionText}>
                        {title}
                    </Animated.Text>
                </Block>
              </RectButton>
            ]}
            onRightButtonsOpenRelease={itemProps.onOpen}
            onRightButtonsCloseRelease={itemProps.onClose}
          >
            {this.renderItem()}
          </Swipeable>
        </ScrollView>
      );
    }
  }

  SwipeableRow.propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([
        'cart',
        'address'
      ])
    ])
  };