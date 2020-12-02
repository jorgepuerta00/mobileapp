const setLanguage = language => {
    let messages = {};
    switch (language) {
      case 'es':
        messages = Object.assign(messages, require(`../../i18n/es.json`));
        break;
      default:
      case 'en':
        messages = Object.assign(messages, require(`../../i18n/en.json`));
        break;
    }
    return messages;
  };
  
  const initialState = {
    locale: 'es',
    messages: setLanguage('es')
  };
  
  const intlData = (state = initialState, action) => {
    if (action === undefined) return state;
    switch (action.type) {
      case 'UPDATE_LANGUAGE':
        return {
          locale: action.language,
          messages: setLanguage(action.language)
        };
      default:
        return state;
    }
  };
  export default intlData;