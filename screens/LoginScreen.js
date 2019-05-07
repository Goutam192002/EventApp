import React from 'react';
import {Toast, Container, Button, Content, Text, Input, Form, Item} from "native-base";
import axios from 'axios';

export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          error: ''
        };
    }

    login = () => {
      const baseURL = 'http://192.168.43.166:10010/users/authenticate';
      axios.post(baseURL, {
          email: this.state.password,
          password: this.state.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( response => {
        const { token } = response.data;
        console.log(token);
        this.props.navigation.navigate('')
      }).catch( error => {
        Toast.show({
            text: error.toString(),
            buttonText: 'Hide'
        });
      })
    };

    render() {
        return (
          <Container>
              <Content>
                  <Text style={ { textAlign: 'center' } }>Login App</Text>
                  <Form>
                      <Item rounded>
                          <Input keyboardType="email-address"
                                 placeholder="Enter your email address"
                                 onChangeText={ email => this.setState({ email: email }) } />
                      </Item>
                      <Item last rounded>
                          <Input secureTextEntry={true}
                                 placeholder="Enter your password"
                                 onChangeText={ password => this.setState({ password: password }) } />
                      </Item>
                  </Form>
                  <Button rounded onPress={this.login}>
                      <Text>Login</Text>
                  </Button>
                  <Button rounded onPress={ () => {this.props.navigation.navigate('signup') } } >
                      <Text>Create a new account </Text>
                  </Button>
              </Content>
          </Container>
        );
      }
}
