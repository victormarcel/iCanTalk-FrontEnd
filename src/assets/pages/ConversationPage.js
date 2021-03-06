import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import firebase from 'react-native-firebase';

import SearchInputTop from "../components/SearchInputTop";
import ConversationItem from "../components/ConversationItem";
import FooterButtons from "../components/FooterButtons";

import { 
    getUserinfosOnDeviceLocalStorage,
    fcmOnMessage,
    getItemOnDeviceLocalStorage,
    removeItemOnDeviceLocalStorage,
    fcmOnNotificationClick,
    getConversationByUserId
} from "../utils";
import { 
    setUserInfos,
    setConversations,
    setCurrentConversation
} from "../../redux/actions";
import { getStringByCode } from "../res/strings";

import HeaderIcons from "../components/HeaderIcons";

import socialNetworksIcon from "../res/images/baseline_public_black_18dp.png";
import friendsListIcon from "../res/images/round_view_list_black_18dp.png";
import headerOptionsIcon from "../res/images/baseline_more_vert_white_18dp.png";

const conversationsMock = [
    {
        "SECONDARY_USER_ID": "2",
        "NAME": "Luis",
        "PICTURY_URL": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png",
        "FCM_TOKEN": "TESTE",
        "LAST_MESSAGE": "Vou olhar se consigo pegar para você",
        "LAST_MESSAGE_HOUR": "12:53",
        "MESSAGES": [
            {
                "messageText": "Você vai me emprestar?",
                "messageHour": "12:50",
                "isMyMessage": true
            },
            {
                "messageText": "Vou olhar se consigo pegar para você.",
                "messageHour": "09:40",
                "isMyMessage": false
            }
        ]
    }
]

class ConversationPage extends Component {

    static navigationOptions = ({ navigation }) => {
        return{
            headerRight: (
                <HeaderIcons
                    buttons = {
                        [
                            {
                                onPress: () => navigation.navigate("SettingsPage"),
                                icon: headerOptionsIcon
                            }
                        ]
                    }
                />
            )
        }
    };

    constructor(props){
    
        super(props);

    }

    componentDidMount() {

        firebase.messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
                console.log(fcmToken);
            } else {
                console.log("Novo token: " + fcmToken);
            } 
        });

        this.fcmOnNotificationClick = firebase.notifications().onNotificationOpened((response) => {

            let data = response.notification.data;
            const conversation = getConversationByUserId(data.senderId);

            this.navigateToChat(conversation);

        });

        this.setState({conversations: this.props.conversations});

    }

    componentWillMount() {

        this.setUserInfosOnReducer();
        this.setConversationsOnReducer();

    }

    setUserInfosOnReducer() {

        if(this.props.userInfos.name === ""){

            getUserinfosOnDeviceLocalStorage().then(userInfos => {

                let userInfosAsJson = JSON.parse(userInfos);
                this.props.setUserInfos(userInfosAsJson);
                
            })

        }
    
    }

    setConversationsOnReducer() {

        getItemOnDeviceLocalStorage("conversations").then(value => {

            if(value){
                
                const conversationsAsJson = JSON.parse(value);
                this.props.setConversations(conversationsAsJson);
                
            }

        });

    }
    
    componentWillUnmount() {
        fcmOnMessage();
        fcmOnNotificationClick();

    }

    navigateToChat(conversation) {

        this.props.setCurrentConversation(conversation);
        this.props.navigation.navigate("ChatPage", {userName: conversation.NAME})

    }

    render() {

        return (
            <View style = { styles.container }>
                <ScrollView>
                    <FlatList
                        styles = { styles.flatList }
                        data = { this.props.conversations }
                        renderItem = { ({item}) => ( 
                            <ConversationItem 
                                conversation = { item }
                                onNavigate = { () => this.navigateToChat(item) }/>
                        )}
                        keyExtractor = { item => item.SECONDARY_USER_ID }
                    />
                </ScrollView>
                <FooterButtons buttons = { 
                    [
                        {
                            icon: friendsListIcon,
                            label: getStringByCode("CONVERSATION_FRIENDS_BUTTON_LABEL"),
                            onNavigate: () => this.props.navigation.navigate("RelationshipPage")
                        },
                        {
                            icon: socialNetworksIcon,
                            label: getStringByCode("CONVERSATION_SOCIAL_NETWORK_BUTTON_LABEL"),
                            onNavigate: () => this.props.navigation.navigate("SocialNetwork")
                        }
                    ] 
                }/>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatList: {
        marginBottom: 5,
        marginTop: 50
    }
});

const mapDispatchToProps = {
    setUserInfos,
    setConversations,
    setCurrentConversation
}

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos,
        conversations: state.conversations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);

