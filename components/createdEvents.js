import React from 'react';
import { Container, Text, List, ListItem, Body } from "native-base";
import axios from 'axios';
import {connect} from "react-redux";

class createdEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentWillMount = async () => {
        const user = this.props.user.user;
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

const mapStateToProps = state => {
    const { user } = state;
    return user;
};

export default connect(mapStateToProps)(createdEvents);