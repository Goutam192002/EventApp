import React from 'react';
import {View, Text} from "native-base";

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

    signup = () => {};

    render() {
        return (
            <View>
                <Text>Create a new account</Text>
            </View>
        )
    }
}
