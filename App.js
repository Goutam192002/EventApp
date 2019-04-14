import React from 'react';
// import {StyleSheet, View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import OTPVerificationScreen from './screens/OPTVerificationScreeen';
import {createStackNavigator, createAppContainer} from 'react-navigation';


const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  OTPVerify: OTPVerificationScreen
}, {
  initialRouteName: 'Login'
});

const App = createAppContainer(AppNavigator);

export default App;
