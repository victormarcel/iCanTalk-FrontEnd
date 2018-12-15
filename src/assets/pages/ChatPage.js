import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { connect } from "react-redux";
import Voice from 'react-native-voice';

import HeaderIcons from "../components/HeaderIcons";

import {
    relateMessageToChat
} from "../utils";
import { 
    sendMessageByFcmToken,
    isEvaluable
} from "../controllers";

import { setCurrentConversation } from "../../redux/actions";

import Message from "../components/Message";
import { Colors } from "../res/styles/colors";

import sendButton from "../res/images/baseline_send_black_18dp.png";
import micButton from "../res/images/baseline_mic_black_18dp.png";
import translateButton from "../res/images/baseline_translate_white_18dp.png";

class ChatPage extends Component {

    static navigationOptions = ({ navigation }) => {
        return{
            headerRight: (
                <HeaderIcons
                    buttons = {
                        [
                            {
                                onPress: () => navigation.navigate("TranslatorPage"),
                                icon: translateButton
                            }
                        ]
                    }
                />
            )
        }
    };

    constructor(props){

        super(props);
        this.state = {
            messages: [],
            messageInput: "",
            startSpeechDisabled: false,
            TouchableOpacityMic: 1
        }

        this.handlerMessages = this.handlerMessages.bind(this);

        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this)
        Voice.onSpeechEnd  = this.onSpeechEndHandler.bind(this)
        Voice.onSpeechError = this._onSpeechError.bind(this)

    }

    _onSpeechError() {
        Voice.cancel();
        this.setState(
            {
                startSpeechDisabled: false,
                TouchableOpacityMic: 1
            }
        );
    }

    onSpeechResults(result){

        this.setState(
            {
                messageInput: result.value.toString().split(",")[0],
                startSpeechDisabled: false,
                TouchableOpacityMic: 1
            }
        );

    }

    onSpeechEndHandler(){
        Voice.stop();
        this.setState(
            {
                startSpeechDisabled: false,
                TouchableOpacityMic: 1
            }
        );
    }
        
    onSpeechStart(e){
        this.setState(
            {
                startSpeechDisabled: true,
                TouchableOpacityMic: 0.3
            }
        );
    }

    componentWillMount() {

        const { MESSAGES } = this.props.currentConversation;

        if(MESSAGES){
            this.setState({messages: this.props.currentConversation.MESSAGES});
        }

    }

    componentDidMount() {

        this.props.navigation.addListener(
            'didBlur',
            payload => {

                if(!payload.lastState){
                    this.openAvaliationPage();
                    this.props.setCurrentConversation({});
                }
                
            }
        );

    }

    openAvaliationPage() {
        
        const { currentConversation } = this.props;

        isEvaluable(currentConversation).then(response => {

            if(response){
                
                this.props.navigation.navigate(
                    "AvaliationPage", 
                    {currentConversation: currentConversation}
                );
            }

        });

    }

    startSpeech() {
        Voice.start('pt-BR');
    }

    endSpeech() {
        Voice.stop();
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
                        messageAudioUrl = { message.messageAudioUrl }
                        isMyMessage = { message.isMyMessage }/>
            });

        } else {
            handledMessages = null;
        }

        return handledMessages;

    }

    moveChatScrollToEnd() {

        if(Boolean(this.refs.scrollViewChat)){
            this.refs.scrollViewChat.scrollToEnd({animated: true});
        }

    }

    onChangeHandler(field, value) {

        this.setState({
            [field]: value
        })

    }

    sendMessage() {
        
        Keyboard.dismiss();

        const { messageInput } = this.state;
        const { currentConversation, userInfos } = this.props;

        if(messageInput){
            
            const messageInfos = {
                secondaryUserId: currentConversation.SECONDARY_USER_ID,
                secondaryUserName: currentConversation.NAME,
                secondaryUserFcmToken: currentConversation.FCM_TOKEN,
                secondaryUserPicturyUrl: currentConversation.PICTURY_URL,
                isMyMessage: true,
                receivedMessageInfos : {
                    message: messageInput,
                    audioUtl: ""
                }
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
                <ScrollView 
                    ref = "scrollViewChat"
                    style = { styles.chatBox }
                    onContentSizeChange = { () => {        
                        this.moveChatScrollToEnd();
                    }} >
                    { messages }    
                </ScrollView>
                <View style = { styles.inputBox }>
                    <View style = { styles.inputView }>

                        <View style = { styles.buttonView }>
                            <TouchableOpacity
                                style = { { opacity: this.state.TouchableOpacityMic } }
                                disabled  = { this.state.startSpeechDisabled }
                                onPress = { this.startSpeech }>
                                <Image
                                    style = { styles.buttonImage }
                                    source = { micButton }
                                />
                            </TouchableOpacity>
                        </View>

                        <View style = { styles.input }>
                            <TextInput 
                                value = { this.state.messageInput }
                                multiline = { true }
                                onChangeText = { value => this.onChangeHandler("messageInput", value) }/>
                        </View>

                        <View style = { styles.buttonView }>
                            <TouchableOpacity onPress = { () => this.sendMessage() }>
                                <Image
                                    style = { styles.buttonImage }
                                    source = { sendButton }
                                />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    chatBox: {
        width: "100%",
        position: "relative",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white"
    },
    inputBox: {
        position: "relative",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height/10,
        bottom: 0,
        marginTop: 5,
        
        borderTopWidth: 1,
        borderColor: Colors.defaultBorderColor,
        backgroundColor: "white"
    },
    inputView: {
        position: "relative",
        flexDirection: "row",
        height: "100%"
    },
    input: {
        flex: 0.70,
        justifyContent: 'flex-end'
    },
    buttonView: {
        flex: 0.15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonImage: {
        aspectRatio: 1,
        zIndex: 1
    }
});

const mapDispatchToProps = {
    setCurrentConversation
}

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos,
        currentConversation: state.currentConversation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
