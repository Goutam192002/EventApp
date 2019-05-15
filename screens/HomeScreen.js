import React from 'react';
import { Container, Fab, Icon } from 'native-base';
import {AsyncStorage} from "react-native";
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import createdEvents from "../components/createdEvents";
import invitedEvents from "../components/invitedEvents";
import AppLoading from "expo/build/launch/AppLoading";


const navigator = createMaterialTopTabNavigator({
    created: { screen: createdEvents},
    invited: { screen: invitedEvents}
});

const TabNavigator = createAppContainer(navigator);

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            if(!token || !user) {
                this.props.navigation.navigate('login')
            }
            this.setState({ loading: false})
        } catch (error) {
            console.log(error);
            this.props.navigation.navigate('login')
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