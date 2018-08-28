import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegisterPage from './pages/RegisterPage';
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
            "RegisterPage": {
                screen: RegisterPage,
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
                    fontSize: 25
                }
            },
            "initialRouteName": props.isRegisteredUser ? "WelcomePage" : "WelcomePage" 
        }   
    );

    return <StackNavigator/>;

}

export default Router;