import React from "react";
import { Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { nowTheme, Images } from "../../constants";
import { Button } from "../../components"
import styles from './styles'

class Pro extends React.Component {

  componentWillUnmount() {
    this.setState = (state, callback)=>{
        return;
    };
  }
  
  render() {
    const { navigation, intlData } = this.props;

    return (
      <Block flex style={styles.containerPro}>
        <Block flex space="between" style={styles.paddedPro}>
          <Block flex space="around">
            <Block row middle>
                <Image 
                  resizeMode="contain"
                  source={Images.Logo} 
                  cache='force-cache'
                  style={styles.proImage}
                />
            </Block>
            <Block center style={styles.titlePro}>
              <Block>
                <Text color={nowTheme.COLORS.BLACK} style={styles.fontone}>
                  {intlData.messages.pro.textone}
                </Text>
              </Block>
              <Block middle style={styles.pro}>
                <Text color="white" style={styles.fontthree}>
                  {intlData.messages.pro.textthree}
                </Text>
              </Block>
              <Block> 
                <Text color={nowTheme.COLORS.BLACK} style={styles.fonttwo}>
                  {intlData.messages.pro.texttwo}
                </Text>
              </Block>
            </Block>
            <Button
              gradient
              style={styles}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText} color={theme.COLORS.WHITE}>
                {intlData.messages.pro.buttontext}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default Pro;