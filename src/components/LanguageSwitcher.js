import React, { Component } from 'react';
import { View, Picker } from 'react-native';

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props);
  }

  _updateLanguage = lang => {
    const { updateLanguage } = this.props;

    updateLanguage(lang);
  };

  render() {
    const { intlData } = this.props;
    const languages = [
      { code: 'en', name: intlData.messages['languageEn'] },
      { code: 'es', name: intlData.messages['languageEs'] }
    ];
    const options = languages.map(language => {
      return (
        <Picker.Item
          value={language.code}
          key={language.code}
          label={language.name}
        />
      );
    });

    return (
      <View>
        <Text>{intlData.messages['selectLanguage']}</Text>
        <Picker
          selectedValue={intlData.locale}
          onValueChange={itemValue => this._updateLanguage(itemValue)}
        >
          {options}
        </Picker>
      </View>
    );
  }
}

export default LanguageSwitcher;