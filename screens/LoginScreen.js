import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import auth0 from 'react-native-auth0';

const auth0Domain = 'https://dev-jtz30gjo.auth0.com';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mobileNumber: ''
        };
    }

    login = async () => {
      auth0
        .webAuth
        .authorize({ scope: 'openid profile email', audience: `${auth0Domain}/userinfo`})
        .then( credentails => {
          console.log(credentails)
        }).catch( error => {
          console.log(error)
      })
    };

    render() {
        return (
          <View style={styles.container}>
            <Text>Login App</Text>
            <TextInput style={ styles.inputControl }
                        keyboardType="numeric"
                        placeholder="Enter your mobile number"
                        onChangeText={ mobileNumber => this.setState({ mobileNumber }) }>
                        { this.state.mobileNumber }
            </TextInput>
            <Button title="Login" onPress={this.login}/>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputControl: {
      width: '60%',
      margin: 15,
      height: 40,
      paddingLeft: 6,
      borderRadius: 5,
      borderColor: '#000000',
      borderWidth: 1
    }
});
