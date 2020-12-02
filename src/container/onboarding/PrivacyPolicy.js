import React from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../../constants/';
import { Button } from '../../components'
import styles from './styles'

class PrivacyPolicy extends React.Component {

  state = {
    accepted: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._retrieveData()
  }

  componentWillUnmount() {
    this.setState = (state, callback)=>{
        return;
    };
  }

  acceptPrivacyPolicy = () => {
    this._storeData(this.state.accepted)
    this.routeToApp()
  }

  routeToApp = () => {
    const { navigation } = this.props
    navigation.goBack();
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@pidenos:privacypolicy', JSON.stringify(true, null, 2));
    }
    catch (error) {
        console.log(error)
    }
  };

  _retrieveData  = async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            let value = JSON.parse(store[i][1]);
            if (value !== null) {
              if (key == '@pidenos:privacypolicy') {
                this.setState({accepted: value})
              }
            }
          });
        });
      });
    } catch (error) {
      console.log(error)
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  render() {
    const { intlData } = this.props;
    return (
      <Block style={styles.containerPrivacyPolicy}>
        <Text style={styles.titlePrivacyPolicy}>{intlData.messages.onboarding.title}</Text>
        <ScrollView 
          style={styles.scrollviewContainer}
          onScroll={({nativeEvent}) => {
            if (!this.state.accepted && this.isCloseToBottom(nativeEvent)) {
              this.setState({accepted: true})
            }
          }}
          scrollEventThrottle={16}
        >
        {intlData.messages.onboarding.policy.map((chapter, index) => (
          <Block key={index}>
            {chapter.title != undefined ? <Text style={styles.mainTitle}>{chapter.title}</Text> : null}
            {chapter.subtitle != undefined ? <Text style={styles.subtitle}>{chapter.subtitle}</Text> : null}
            {chapter.text1 != undefined ? <Text style={styles.paragraph}>{chapter.text1}</Text> : null}
            {chapter.text2 != undefined ? <Text style={styles.paragraph}>{chapter.text2}</Text> : null}
            {chapter.text3 != undefined ? <Text style={styles.paragraph}>{chapter.text3}</Text> : null}
            {chapter.text4 != undefined ? <Text style={styles.paragraph}>{chapter.text4}</Text> : null}
            {chapter.text5 != undefined ? <Text style={styles.paragraph}>{chapter.text5}</Text> : null}
            {chapter.text6 != undefined ? <Text style={styles.paragraph}>{chapter.text6}</Text> : null}
            {chapter.text7 != undefined ? <Text style={styles.paragraph}>{chapter.text7}</Text> : null}
            {chapter.text8 != undefined ? <Text style={styles.paragraph}>{chapter.text8}</Text> : null}
            {chapter.list.map((item, index) => (
              <Block key={index}>
                {item.text != undefined ? <Text style={styles.paragraph}>{item.text}</Text> : null}
                {item.a != undefined ? <Text style={styles.paragraph}>{item.a}</Text> : null}
                {item.b != undefined ? <Text style={styles.paragraph}>{item.b}</Text> : null}
                {item.c != undefined ? <Text style={styles.paragraph}>{item.c}</Text> : null}
                {item.d != undefined ? <Text style={styles.paragraph}>{item.d}</Text> : null}
                {item.e != undefined ? <Text style={styles.paragraph}>{item.e}</Text> : null}
                {item.f != undefined ? <Text style={styles.paragraph}>{item.f}</Text> : null}
                {item.g != undefined ? <Text style={styles.paragraph}>{item.g}</Text> : null}
                {item.h != undefined ? <Text style={styles.paragraph}>{item.h}</Text> : null}
                {item.i != undefined ? <Text style={styles.paragraph}>{item.i}</Text> : null}
                {item.j != undefined ? <Text style={styles.paragraph}>{item.j}</Text> : null}
                {item.k != undefined ? <Text style={styles.paragraph}>{item.k}</Text> : null}
                {item.l != undefined ? <Text style={styles.paragraph}>{item.l}</Text> : null}
                {item.m != undefined ? <Text style={styles.paragraph}>{item.m}</Text> : null}
                {item.n != undefined ? <Text style={styles.paragraph}>{item.n}</Text> : null}
                {item.o != undefined ? <Text style={styles.paragraph}>{item.o}</Text> : null}
                {item.p != undefined ? <Text style={styles.paragraph}>{item.p}</Text> : null}
                {item.q != undefined ? <Text style={styles.paragraph}>{item.q}</Text> : null}
                {item.r != undefined ? <Text style={styles.paragraph}>{item.r}</Text> : null}
                {item.s != undefined ? <Text style={styles.paragraph}>{item.s}</Text> : null}
                {item.t != undefined ? <Text style={styles.paragraph}>{item.t}</Text> : null}
                {item.u != undefined ? <Text style={styles.paragraph}>{item.u}</Text> : null}
              </Block>
            ))}
          </Block>
        ))}   
        </ScrollView>
        <Button
          gradient
          style={styles}
          onPress={() => this.acceptPrivacyPolicy()}
          color={this.state.accepted ? nowTheme.COLORS.PIDENOS : nowTheme.COLORS.LIGHT_GRAY}
          disabled={!this.state.accepted}
        >
          <Text style={styles.buttonText} color={theme.COLORS.WHITE}>
            {intlData.messages.onboarding.privacypolicybutton}
          </Text>
        </Button>
      </Block>
    );
  }
}

export default PrivacyPolicy;