import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';

import SearchInputTop from "../components/SearchInputTop";
import ConversationItem from "../components/ConversationItem";
import FooterButtons from "../components/FooterButtons";

import { returnStringByCode } from "../res/strings";

import headerOptionsIcon from "../res/images/baseline_more_vert_white_18dp.png";
import socialNetworksIcon from "../res/images/baseline_public_black_18dp.png";
import friendsListIcon from "../res/images/round_view_list_black_18dp.png";

const conversationsMock = [
    {
        "id": "1",
        "user": {
            "name": "Rafaelle",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Até Mais",
        "lastMessageHour": "09:00"
    },
    {
        "id": "2",
        "user": {
            "name": "Carlos",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Estou aguardando sua resposta Estou aguardando sua resposta",
        "lastMessageHour": "12:42"
    },
    {
        "id": "3",
        "user": {
            "name": "Alan",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Estou aguardando sua resposta",
        "lastMessageHour": "12:42"
    },
    {
        "id": "4",
        "user": {
            "name": "Betin",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Estou aguardando sua resposta",
        "lastMessageHour": "12:42"
    },
    {
        "id": "5",
        "user": {
            "name": "Bedin",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Estou aguardando sua resposta",
        "lastMessageHour": "12:42"
    },
    {
        "id": "6",
        "user": {
            "name": "Mateus",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Estou aguardando sua resposta",
        "lastMessageHour": "12:42"
    },
    {
        "id": "7",
        "user": {
            "name": "Carolina",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        },
        "lastMessage": "Estou aguardando sua resposta",
        "lastMessageHour": "12:42"
    }
]

class ConversationPage extends Component {

    static navigationOptions = {
        headerRight: (
            <TouchableOpacity onPress = { () => console.log("teste") }>
                <Image
                    source = { headerOptionsIcon }
                />
            </TouchableOpacity>
        ),
      };

    render() {
        return (
            <View style = { styles.container }>
                <SearchInputTop/>
                <ScrollView>
                    <FlatList
                        styles = { styles.flatList }
                        data = { conversationsMock }
                        renderItem = { ({item}) => ( 
                            <ConversationItem conversation = { item }/>
                        )}
                        keyExtractor = { item => item.id }
                    />
                </ScrollView>
                <FooterButtons buttons = { 
                    [
                        {icon: friendsListIcon, label: returnStringByCode("CONVERSATION_FRIENDS_BUTTON_LABEL")},
                        {icon: socialNetworksIcon, label: returnStringByCode("CONVERSATION_SOCIAL_NETWORK_BUTTON_LABEL")}
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

export default ConversationPage;
