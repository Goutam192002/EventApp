import React from 'react';
import { Container } from 'native-base';
import {AsyncStorage} from "react-native";
import {createMaterialTopTabNavigator, createNavigationContainer} from "react-navigation";
import createdEvents from "../components/createdEvents";
import invitedEvents from "../components/invitedEvents";


const navigator = createMaterialTopTabNavigator({
    created: { screen: createdEvents},
    invited: { screen: invitedEvents}
});

const TabNavigator = createNavigationContainer(navigator);

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentWillMount() {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            if(!token) {
                this.props.navigation.navigate('login')
            }
        } catch (error) {
            console.log(error);
            this.props.navigation.navigate('login')
        }
    }

    render() {
        return (
            <Container>
                <TabNavigator/>
            </Container>
        )
    }
}