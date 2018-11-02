import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomePage from './assets/pages/WelcomePage';
import RegistrationPage from './assets/pages/RegistrationPage';
import ConversationPage from './assets/pages/ConversationPage';
import RelationshipPage from './assets/pages/RelationshipPage';
import AddFriendsPage from './assets/pages/AddFriendsPage';
import ChatPage from './assets/pages/ChatPage';
import PreferencesPage from './assets/pages/PreferencesPage';
import TranslatorPage from './assets/pages/TranslatorPage';

import { Colors } from "./assets/res/styles";
import { getStringByCode } from "./assets/res/strings"; 

const Router = props => {

    const isRegisteredUser = props.isRegisteredUser;

    const StackNavigator = createStackNavigator(
        {   
            "WelcomePage": {
                screen: WelcomePage,
                navigationOptions: {
                    title: getStringByCode("WELCOME"),
                    header: null
                }
            },
            "RegistrationPage": {
                screen: RegistrationPage,
                navigationOptions: {
                    title: getStringByCode("NEW_USER")
                }
            },
            "ConversationPage": {
                screen: ConversationPage,
                navigationOptions: {
                    title: getStringByCode("TALKS")
                }
            },
            "RelationshipPage": {
                screen: RelationshipPage,
                navigationOptions: {
                    title: getStringByCode("FRIENDS")
                }
            },
            "AddFriendsPage": {
                screen: AddFriendsPage,
                navigationOptions: {
                    title: getStringByCode("ADD_FRIEND")
                }
            },
            "ChatPage": {
                screen: ChatPage,
                navigationOptions: ({ navigation }) => {
                    const userName = navigation.state.params.userName;
                    return (
                        {
                            title: userName
                        }
                    )
                }
            },
            "PreferencesPage": {
                screen: PreferencesPage,
                navigationOptions: {
                    title: getStringByCode("PREFERENCES")
                }
            },
            "TranslatorPage": {
                screen: TranslatorPage,
                navigationOptions: {
                    title: getStringByCode("TRANSLATOR")
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
            "initialRouteName": isRegisteredUser ? "ConversationPage" : "WelcomePage"
        }   
    );

    return <StackNavigator/>;

}

export default Router;