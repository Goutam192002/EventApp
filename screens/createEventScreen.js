import React from 'react';
import {Button, Container, Form, Input, Item, Text, Textarea} from "native-base";
import { AsyncStorage } from 'react-native';

export default class createEventScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            authToken: '',
            title: '',
            description: '',
            createdBy: '',
            invites: []
        };
    }

    async componentWillMount() {
        try {
            const user = await AsyncStorage.getItem('user');
            const authToken = await AsyncStorage.getItem('authToken');
            this.setState({ user: user});
            this.setState({ authToken: authToken});
        } catch (error) {
            console.log(error)
        }
    }

    createEvent () {}

    addInvite = async username => {
        await this.setState({
            invites: [...this.state.invites, username]
        });
    };
    render() {
        return (
            <Container>
                <Text>Create An Event </Text>
                <Form>
                    <Item rounded>
                        <Input keyboardType="default"
                               placeholder="Enter the event title"
                               onChangeText={ title => this.setState({ title: title }) } />
                    </Item>

                    <Item rounded>
                        <Textarea keyboardType="default"
                               placeholder="Enter the event description"
                               onChangeText={ description => this.setState({ description: description }) } />
                    </Item>
                </Form>
                <Button rounded onPress={ () => { this.props.navigation.navigate('invitePeople', {
                    addInvite: this.addInvite
                }) }}>
                    <Text>Invite People</Text>
                </Button>
                <Button rounded onPress={this.createEvent}>
                    <Text>Create Event</Text>
                </Button>
            </Container>
        )
    }
}


