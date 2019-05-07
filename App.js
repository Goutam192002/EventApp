import LoginScreen from './screens/LoginScreen';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import React from "react";
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from "expo/build/launch/AppLoading";
import { Root } from "native-base";
import SignupScreen from "./screens/SignupScreen";

const AppNavigator = createStackNavigator({
  login: { screen: LoginScreen },
  signup: { screen: SignupScreen }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ loading: false })
  }
  render() {
    if(this.state.loading) {
      return <AppLoading />
    } else {
      return (
        <Root>
          <AppContainer />
        </Root>
      )
    }
  }
}
