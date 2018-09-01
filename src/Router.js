import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomePage from './assets/pages/WelcomePage';
import RegistrationPage from './assets/pages/RegistrationPage';
import ConversationPage from './assets/pages/ConversationPage';

import { Colors } from "./assets/res/styles";

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
            },
            "ConversationPage": {
                screen: ConversationPage,
                navigationOptions: {
                    title: 'Conversas'
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
            "initialRouteName": props.isRegisteredUser ? "ConversationPage" : "WelcomePage" 
        }   
    );

    return <StackNavigator/>;

}

export default Router;