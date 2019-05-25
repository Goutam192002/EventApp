import LoginScreen from './screens/LoginScreen';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import React from "react";
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from "expo/build/launch/AppLoading";
import { Root } from "native-base";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import createEventScreen from "./screens/createEventScreen";
import inviteUsersScreen from "./screens/inviteUsersScreen";

import {connect, Provider} from 'react-redux';
import {bindActionCreators, createStore} from "redux";
import userReducer from "./reducers/userReducer";
import {addUser} from "./actions/userActions";


const AppNavigator = createStackNavigator({
  login: { screen: LoginScreen },
  signup: { screen: SignupScreen },
  home: { screen: HomeScreen },
  createEvent: { screen: createEventScreen },
  invitePeople: { screen: inviteUsersScreen}
}, {
  initialRouteName: "home"
});


const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser
    }, dispatch)
);

const AppContainer = connect(mapDispatchToProps)(createAppContainer(AppNavigator));

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.store = createStore(userReducer);
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
        <Provider store={this.store}>
          <Root>
            <AppContainer />
          </Root>
        </Provider>
      )
    }
  }
}

