import React from 'react';
import { Container, Text, List, ListItem, Body } from "native-base";
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default class createdEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentWillMount = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const authToken = await AsyncStorage.getItem('authToken');
        axios.get(`http://192.168.43.166:3000/users/${user.id}/createdEvents`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( response => {
            this.setState({ events: response.data })
        })
    };

    render() {
        return (
        <Container>
            <List>
                {
                    this.state.events.map( event => {
                        return (
                            <ListItem key={event._id}>
                                <Body>
                                    <Text>{ event.title }</Text>
                                    <Text note>{ event.description }</Text>
                                </Body>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Container>
        )
    }
}