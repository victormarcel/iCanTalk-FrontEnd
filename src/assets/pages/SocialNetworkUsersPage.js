import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import { connect } from "react-redux";

import { Colors } from "../res/styles/colors";
import { getStringByCode } from "../res/strings";

import FriendItem from "../components/FriendItem";

import {
    leaveUserToSocialNetwork
} from "../controllers/SocialNetworkController";

import {
    getConversationByUserId
} from "../utils";

import {
    setCurrentConversation
} from "../../redux/actions";

class SocialNetworkUsersPage extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() {

        this.props.navigation.addListener(
            'didBlur',
            payload => {

                if(!payload.lastState){
                    this.leaveSocialNetwork();
                }
                
            }
        );

    }

    leaveSocialNetwork() {

        const { id } = this.props.userInfos;

        leaveUserToSocialNetwork(id);

    }

    openChat(user) {
        
        const userId = user.ID_USUARIO;
        const conversation = getConversationByUserId(userId);
        
        if(conversation){
            this.props.setCurrentConversation(conversation);
        } else {
            this.props.setCurrentConversation(
                {
                    SECONDARY_USER_ID: user.ID_USUARIO,
                    NAME: user.NOME_USUARIO_AMIGO,
                    PICTURY_URL: user.URL_IMAGEM_PERFIL_USUARIO_AMIGO,
                    FCM_TOKEN: user.FCM_TOKEN
                }
            );
        }

        this.props.navigation.navigate("ChatPage", {userName: user.NOME_USUARIO_AMIGO});

    }

    render() {

        const { socialNetwork } = this.props;

        return (
            <View style = { styles.container }>
                <View style = { styles.header }>
                    <Text style = { styles.headerText }>
                        { `${ socialNetwork.onlineUsersCount } ${ getStringByCode("SOCIAL_NETWORK_ONLINE_USERS") }` }
                    </Text>
                </View>
                <ScrollView>
                    <FlatList
                        data = { socialNetwork.onlineUsers }
                        renderItem = { ({item}) => ( 
                            <FriendItem 
                                friend = { item }
                                openChat = { () => this.openChat(item) }/>
                        )}
                        keyExtractor = { item => item.ID_USUARIO.toString() }
                        extraData = { this.props.socialNetwork }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 0.1,

        justifyContent: "center",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: Colors.defaultBorderColor
    },
    headerText: {
        fontSize: 17
    }
});

mapStateToProps = state => {
    return {
        userInfos: state.userInfos,
        socialNetwork: state.socialNetwork
    }
}

mapDispatchToProps = {
    setCurrentConversation
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialNetworkUsersPage);
