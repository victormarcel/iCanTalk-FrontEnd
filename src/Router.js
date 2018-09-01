import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegistrationPage from './pages/RegistrationPage';
import WelcomePage from './pages/WelcomePage';

import { Colors } from "./styles";

const Router = props => {

    const StackNavigator = createStackNavigator(
        {   
            "WelcomePage": {
                screen: WelcomePage,
                navigationOptions: {
                    title: 'Bem-Vindo',
                    header: null
                }
            },
            "RegistrationPage": {
                screen: RegistrationPage,
                navigationOptions: {
                    title: 'Novo Usuário'
                }
            }
        },
        {
            navigationOptions: {
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#007DD6',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.appDefaultColor
                },
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 20
                }
            },
            "initialRouteName": props.isRegisteredUser ? "WelcomePage" : "WelcomePage" 
        }   
    );

    return <StackNavigator/>;

}

export default Router;