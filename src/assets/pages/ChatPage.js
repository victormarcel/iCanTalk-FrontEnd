import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";

import {
    relateMessageToChat
} from "../utils";
import { 
    sendMessageByFcmToken
} from "../controllers";

import Message from "../components/Message";

import { Colors } from "../res/styles/colors";

import sendButton from "../res/images/baseline_send_black_18dp.png";

class ChatPage extends Component {

    constructor(props){

        super(props);
        this.state = {
            messages: [],
            messageInput: ""
        }

        this.handlerMessages = this.handlerMessages.bind(this);

    }

    componentWillMount() {

        const { MESSAGES } = this.props.currentConversation;

        if(MESSAGES){
            this.setState({messages: this.props.currentConversation.MESSAGES});
        }

    }

    handlerMessages() {
        
        const { MESSAGES } = this.props.currentConversation;
        let handledMessages;
        
        if(MESSAGES){

            handledMessages = this.props.currentConversation.MESSAGES.map((message, index) => {
                return <Message 
                        key = { index }
                        messageText = { message.messageText }
                        messageHour = { message.messageHour }
                        isMyMessage = { message.isMyMessage }/>
            });

        } else {
            handledMessages = null;
        }

        return handledMessages;

    }

    onChangeHandler(field, value) {

        this.setState({
            [field]: value
        })

    }

    sendMessage() {
        
        const { messageInput } = this.state;
        const { currentConversation, userInfos } = this.props;

        if(messageInput){
            
            const messageInfos = {
                secondaryUserId: currentConversation.SECONDARY_USER_ID,
                secondaryUserName: currentConversation.NAME,
                secondaryUserFcmToken: currentConversation.FCM_TOKEN,
                secondaryUserPicturyUrl: currentConversation.PICTURY_URL,
                isMyMessage: true
            }

            sendMessageByFcmToken(messageInfos.secondaryUserFcmToken, userInfos.id, messageInput);
            relateMessageToChat(messageInfos, messageInput);

            this.setState({messageInput: ""});

        }

    }

    render() {

        
        const messages = this.handlerMessages();

        return (
            <View style = { styles.container } >
                <ScrollView style = { styles.chatBox }>
                    { messages }    
                </ScrollView>
                <ScrollView style = { styles.inputBox }>
                    <View style = { styles.inputView }>

                        <View style = { styles.input }>
                            <TextInput 
                                value = { this.state.messageInput }
                                multiline = { true }
                                onChangeText = { value => this.onChangeHandler("messageInput", value) }/>
                        </View>

                        <View style = { styles.sendButton }>
                            <TouchableOpacity onPress = { () => this.sendMessage() }>
                                <Image
                                    style = { styles.sendButtonImage }
                                    source = { sendButton }
                                />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    chatBox: {
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputBox: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height/10,
        bottom: 0,
        
        borderTopWidth: 1,
        borderColor: Colors.defaultBorderColor
    },
    inputView: {
        position: "relative",
        flex: 1,
        flexDirection: "row",
        marginTop: 15
    },
    input: {
        flex: 0.85,
        justifyContent: 'flex-end',
    },
    sendButton: {
        flex: 0.15,
        alignItems: "center",
        justifyContent: "center"
    },
    sendButtonImage: {
        aspectRatio: 1
    }
});

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos,
        currentConversation: state.currentConversation
    }
}

export default connect(mapStateToProps, null)(ChatPage);
