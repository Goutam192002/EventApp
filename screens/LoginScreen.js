import React from 'react';
import {StyleSheet, Text, TextInput, View, Button, Modal} from 'react-native';
import axios from 'axios';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mobileNumber: '',
          showError: false,
          error: ''
        };
    }

    login = () => {
      const baseURL = 'http://192.168.43.166:10010/authenticate';
      console.log(this.state.mobileNumber);
      axios.post(baseURL, {
        mobileNumber: this.state.mobileNumber
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( response => {
        const { OTP } = response.data;
        console.log(OTP);
        this.props.navigation.navigate('verifyOTP', { OTP: OTP })
      }).catch( error => {
        this.setState({ error: error.toString()});
        this.showErrorDialog();
      })
    };

    showErrorDialog() {
      this.setState({ showError: true})
    }

    render() {
        return (
          <View style={styles.container}>
            <Text>Login App</Text>
            <TextInput style={ styles.inputControl }
                        keyboardType="numeric"
                        placeholder="Enter your mobile number"
                        onChangeText={ mobileNumber => this.setState({ mobileNumber: mobileNumber }) }>
                        { this.state.mobileNumber }
            </TextInput>
            <Button title="Login" onPress={this.login}/>
            <Modal
              animationType="slide"
              transparent={false}
              visible={ this.state.showError }>
                <Text>{ this.state.error }</Text>
            </Modal>
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
