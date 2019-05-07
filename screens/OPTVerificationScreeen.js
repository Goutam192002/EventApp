import React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Modal} from 'react-native';

export default class OPTVerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredOTP: '',
      showErrorDialog: false
    };
  }

  verify = () => {
    if(this.state.enteredOTP == this.props.navigation.getParam('OTP')) {
      this.props.navigation.navigate('success')
    } else {
      this.setState({ showErrorDialog: true })
    }
  };

  render() {
    return (
      <View style={ styles.container }>
        <Text>We have send an OTP to your mobile Number. Please enter the 4-digit OTP below</Text>
        <TextInput style={ styles.inputControl }
                        keyboardType="numeric"
                        placeholder="OTP"
                        onChangeText={ enteredOTP => this.setState({ enteredOTP: enteredOTP }) }>
                        { this.state.enteredOTP }
            </TextInput>
        <Button title="Verify" onPress={ this.verify}/>
        <Modal
              animationType="slide"
              transparent={false}
              visible={ this.state.showErrorDialog }>
                <Text>Wrong OTP entered...Please try again</Text>
            </Modal>
      </View>
    )
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
