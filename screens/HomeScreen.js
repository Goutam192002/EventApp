import React from 'react';
import { Container, Fab, Icon } from 'native-base';
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import createdEvents from "../components/createdEvents";
import invitedEvents from "../components/invitedEvents";
import AppLoading from "expo/build/launch/AppLoading";
import {connect} from "react-redux";


const navigator = createMaterialTopTabNavigator({
    created: { screen: createdEvents},
    invited: { screen: invitedEvents}
});

const TabNavigator = createAppContainer(navigator);

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        const user = this.props.user.user;
        if(user) {
            this.setState({ loading: false});
        } else {
            this.props.navigation.navigate('login');
        }
    }

    render() {
        if(this.state.loading) {
            return <AppLoading />
        } else {
            return (
                <Container>
                    <TabNavigator />
                    <Fab
                        active={true}
                        direction="up"
                        position="bottomRight"
                        onPress={ () => this.props.navigation.navigate('createEvent') } >
                        <Icon name="md-add" />
                    </Fab>
                </Container>
            )
        }
    }
}

const mapStateToProps = state => {
    const { user } = state;
    return user
};

export default connect(mapStateToProps)(HomeScreen)