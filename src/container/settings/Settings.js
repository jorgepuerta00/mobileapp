import React from "react";
import { FlatList } from "react-native";
import { Block, Text, Icon } from "galio-framework";
import { Switch, Touchable } from "../../components";
import styles from './styles';

export default class Settings extends React.Component {
  state = {};

  componentWillUnmount() {
    this.setState = (state, callback)=>{
        return;
    };
  }

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={styles.switch}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              value={this.state[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            <Touchable>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
              <Text style={styles.switch}>{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </Touchable>
          </Block>
        );
      default:
        break;
    }
  };

  render() {

    const { intlData } = this.props

    const recommended = [
      { title: intlData.messages.settings.recommended.optionone, id: "face", type: "switch" },
      { title: intlData.messages.settings.recommended.optiontwo, id: "autolock", type: "switch" },
      { title: intlData.messages.settings.recommended.optionthree, id: "NotificationsSettings", type: "button" }
    ];

    const payment = [
      { title: intlData.messages.settings.payment.optionone, id: "Payment", type: "button" },
      { title: intlData.messages.settings.payment.optiontwo, id: "gift", type: "button" }
    ];

    const privacy = [
      { title: intlData.messages.settings.privacy.optionone, id: "Agreement", type: "button" },
      { title: intlData.messages.settings.privacy.optiontwo, id: "Privacy", type: "button" },
      { title: intlData.messages.settings.privacy.optionthree, id: "About", type: "button" }
    ];

    return (
      <Block
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
        <Block center style={styles.title}>
          <Text style={styles.text}>{intlData.messages.settings.recommended.title}</Text>
          <Text style={styles.option}/>
        </Block>

        <FlatList
          scrollEnabled={false}
          data={recommended}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />

        <Block center style={styles.title}>
          <Text style={styles.text}>{intlData.messages.settings.payment.title}</Text>
          <Text style={styles.option}/>
        </Block>

        <FlatList
          scrollEnabled={false}
          data={payment}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />

        <Block center style={styles.title}>
          <Text style={styles.text}>{intlData.messages.settings.privacy.title}</Text>
          <Text style={styles.option}/>
        </Block>

        <FlatList
          scrollEnabled={false}
          data={privacy}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
      </Block>
    );
  }
}