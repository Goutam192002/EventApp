import React from 'react';
import { Container, Button, Text, Form, Input, Item } from "native-base";

export default class inviteUsersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    addInvite = username => {
        const addInvite = this.props.navigation.getParam(`addInvite`, () => {
            alert('No function was passed');
        });

        addInvite(username);
    };
    render() {
        return (
            <Container>
                <Text>Invite People</Text>
                <Form>
                    <Item rounded>
                        <Input keyboardType="default"
                               placeholder="Enter the username"
                               onChangeText={ username => { this.setState({ username: username })}} />
                    </Item>
                </Form>
                <Button rounded onPress={ () => { this.addInvite(this.state.username) }}>
                    <Text>Submit</Text>
                </Button>
            </Container>
        );
    }
}