import React from 'react';
import {Container, Text, List, ListItem, Toast, Fab, Icon} from "native-base";
import axios from 'axios';
import InviteUserItem from '../components/inviteUserItem';

export default class inviteUsersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            users: [],
            selectedUsers: []
        }
    }

    componentWillMount() {
        axios.get('http://192.168.43.166:3000/users/', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( response => {
            this.setState({ users: response.data });
        }).catch( error => {
            Toast.show({
                text: error.toString(),
                buttonText: 'HIDE'
            })
        });
    }

    addInvite = id => {
        this.setState({ selectedUsers: [ ...this.state.selectedUsers, id]});
    };

    render() {
        console.log(this.props.navigation.getParam('invites'));
        return (
            <Container>
                <Text>Invite People</Text>
                <List>
                    {
                        this.state.users.map( user => {
                            return (
                                <ListItem key={ user._id}>
                                    <InviteUserItem user={user} pushInvite={this.addInvite} selected={this.props.navigation.getParam('invites').indexOf(user._id)}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <Fab
                    active={true}
                    direction="up"
                    position="bottomRight"
                    onPress={ () => {
                        this.props.navigation.getParam('addInvite')(this.state.selectedUsers);
                        this.props.navigation.goBack();
                    }} >
                    <Icon name="md-arrow-round-forward" />
                </Fab>
            </Container>
        );
    }
}