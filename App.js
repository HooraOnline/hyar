import React, { Component } from 'react';
import { I18nManager,  SafeAreaView } from 'react-native'
import { StyleProvider, Root } from 'native-base';
import nativeBaseTheme from './native-base-theme/components';
import { Provider } from 'react-redux'
import { configureStore } from './app/store'
import Nav from './app/Nav.js';
const store = configureStore({});
import { Font } from 'expo';
 
 
export default class App extends React.Component {
  constructor(props) {
    super(props)
    I18nManager.forceRTL(true);
     this.state = { connected: -1, fontLoaded: false }
  }
  componentDidMount() {
    try {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
        I18nManager.isRTL = true;
    } catch (e) {
        console.log(e);
    }

}
  async componentDidMount() {
    await Font.loadAsync({
      'iran_sans': require('./app/assets/fonts/iran_sans.ttf'),
      'iran_sans_bold': require('./app/assets/fonts/iran_sans_bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) { return null; }  
    return (
      <Provider store={store}>
        <StyleProvider style={nativeBaseTheme()}>
          <Root>
            <SafeAreaView style={{flex:1}}>
              <Nav/>
            </SafeAreaView>
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}


