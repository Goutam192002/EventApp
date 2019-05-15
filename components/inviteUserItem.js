import React from 'react';
import { Container, CheckBox, Body, Text } from "native-base";

export default class InviteUserItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    componentWillMount() {
        if(this.props.selected > -1) {
            this.setState({ checked: true })
        }
    }

    inviteUser = async () => {
        await this.setState({ checked: !this.state.checked });
        if(this.state.checked) {
            this.props.pushInvite(this.props.user._id)
        }
    };

    render() {
        return (
            <Container>
                <CheckBox checked={this.state.checked}
                            onPress={this.inviteUser}/>
                <Body>
                    <Text> { this.props.user.username }</Text>
                </Body>
            </Container>
        );
    }

}