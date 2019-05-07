import LoginScreen from './screens/LoginScreen';
import OTPVerificationScreen from './screens/OPTVerificationScreeen'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SuccessScreen from './screens/SuccessScreen';
import React from "react";

const AppNavigator = createStackNavigator({
  login: { screen: LoginScreen },
  verifyOTP: { screen: OTPVerificationScreen },
  success: { screen: SuccessScreen }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
