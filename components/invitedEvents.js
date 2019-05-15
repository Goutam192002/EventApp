import React from 'react';
import {Body, Container, ListItem, Text, List, Left, Right} from "native-base";
import { AsyncStorage} from 'react-native';
import axios from 'axios';

export default class invitedEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitedEvents: []
        }
    }

    componentWillMount = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const authToken = await AsyncStorage.getItem('authToken');
        axios.get(`http://192.168.43.166:3000/users/${user.id}/invites`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( response => {
            this.setState({ invitedEvents: response.data })
        })
    };

    render() {
        return (
            <Container>
                <List>
                    {
                        this.state.invitedEvents.map( invite => {
                            return (
                                <ListItem key={invite._id}>
                                    <Left>
                                        <Body>
                                            <Text>{ invite.event.title }</Text>
                                            <Text note>{ invite.event.description }</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Text>Status: {invite.status}</Text>
                                    </Right>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Container>
        )
    }
}