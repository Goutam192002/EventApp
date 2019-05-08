import React from 'react';
import {Text, Container, Content, Form, Item, Input, Button, Toast} from "native-base";
import axios from 'axios';

export default class SignupScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            username: '',
            password: ''
        }
    }

    signup = () => {
        axios.post('http://192.168.43.166:3000/users/', this.state, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( response => {
            console.log(response.data);
            this.props.navigation.navigate('login')
        }).catch( error => {
            console.log(error);
            Toast.show({
                buttonText: 'Hide',
                text: error.toString()
            })
        })
    };

    render() {
        return (
            <Container>
                <Content>
                    <Text style={ { textAlign: 'center' } }>Create an account</Text>
                    <Form>
                        <Item rounded>
                            <Input keyboardType="default"
                                   placeholder="Enter your name"
                                   onChangeText={ name => this.setState({ name: name }) } />
                        </Item>

                        <Item rounded>
                            <Input keyboardType="default"
                                   placeholder="Enter your username"
                                   onChangeText={ username => this.setState({ username: username }) } />
                        </Item>

                        <Item rounded>
                            <Input keyboardType="email-address"
                                   placeholder="Enter your email address"
                                   onChangeText={ email => this.setState({ email: email }) } />
                        </Item>
                        <Item rounded>
                            <Input secureTextEntry={true}
                                   placeholder="Enter your password"
                                   onChangeText={ password => this.setState({ password: password }) } />
                        </Item>
                        <Item last rounded>
                            <Input secureTextEntry={true}
                                   placeholder="Confirm your password"
                                   onChangeText={ password => this.setState({ password: password }) } />
                        </Item>
                    </Form>
                    <Button rounded onPress={this.signup}>
                        <Text>Continue</Text>
                    </Button>
                    <Button rounded onPress={ () => {this.props.navigation.navigate('login') } } >
                        <Text>Already have an account</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
