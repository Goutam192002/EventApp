import React from 'react';
import {Button, Container, Form, Input, Item, Text, Textarea} from "native-base";
import { AsyncStorage, StyleSheet } from 'react-native';
import axios from 'axios';

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
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const authToken = await AsyncStorage.getItem('authToken');
            this.setState({ createdBy: user.id });
            this.setState({ user: user});
            this.setState({ authToken: authToken});
        } catch (error) {
            console.log(error)
        }
    }

    createEvent =  () => {
        axios.post('http://192.168.43.166:3000/events',{
            title: this.state.title,
            description: this.state.description,
            createdBy: this.state.createdBy,
            invites: this.state.invites
        }, {
            headers: {
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${this.state.authToken}`
            }
        }).then( response => {
            console.log(response.data);
            this.props.navigation.navigate('home')
        }).catch( error => {
            console.log(error)
        })
    };

    addInvite = async users => {
        await this.setState({
            invites: [...this.state.invites, ...users]
        });
    };
    render() {
        return (
            <Container style={styles.space}>
                <Text>Create An Event </Text>
                <Form>
                    <Item rounded style={styles.space}>
                        <Input keyboardType="default"
                               placeholder="Enter the event title"
                               onChangeText={ title => this.setState({ title: title }) } />
                    </Item>

                    <Item rounded style={styles.space}>
                        <Textarea keyboardType="default"
                               placeholder="Enter the event description"
                               onChangeText={ description => this.setState({ description: description }) } />
                    </Item>
                </Form>
                <Button style={styles.space} rounded onPress={ () => { this.props.navigation.navigate('invitePeople', {
                    addInvite: this.addInvite,
                    invites: this.state.invites
                }) }}>
                    <Text>Invite People</Text>
                </Button>
                <Button style={styles.space} rounded onPress={this.createEvent}>
                    <Text>Create Event</Text>
                </Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    space: {
        margin: 5,
    }
});

