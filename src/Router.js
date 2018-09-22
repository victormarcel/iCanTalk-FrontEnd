import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomePage from './assets/pages/WelcomePage';
import RegistrationPage from './assets/pages/RegistrationPage';
import ConversationPage from './assets/pages/ConversationPage';
import RelationshipPage from './assets/pages/RelationshipPage';
import AddFriendsPage from './assets/pages/AddFriendsPage';
import ChatPage from './assets/pages/ChatPage';
import PreferencesPage from './assets/pages/PreferencesPage';

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
            },
            "RelationshipPage": {
                screen: RelationshipPage,
                navigationOptions: {
                    title: 'Amigos'
                }
            },
            "AddFriendsPage": {
                screen: AddFriendsPage,
                navigationOptions: {
                    title: 'Adicionar Amigos'
                }
            },
            "ChatPage": {
                screen: ChatPage,
                navigationOptions: {
                    title: 'Nome Amigo'
                }
            },
            "PreferencesPage": {
                screen: PreferencesPage,
                navigationOptions: {
                    title: 'Preferências'
                }
            }
        },
        {
            navigationOptions: {
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.appDefaultColor,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.appDefaultColor
                },
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 20
                }
            },
            "initialRouteName": props.isRegisteredUser ? "PreferencesPage" : "WelcomePage" 
        }   
    );

    return <StackNavigator/>;

}

export default Router;