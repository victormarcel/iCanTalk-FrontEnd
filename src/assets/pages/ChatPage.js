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

import Message from "../components/Message";

import { Colors } from "../res/styles/colors";

import sendButton from "../res/images/baseline_send_black_18dp.png";

class ChatPage extends Component {
    render() {
        return (
            <View style = { styles.container } >
                <ScrollView style = { styles.chatBox }>
                    <Message isMyMessage = { false } messageText = { "Olá, tudo bem?" }/>
                    <Message isMyMessage = { true } messageText = { "Estou sim, e você?" }/>
                    <Message isMyMessage = { false } messageText = { "Ok, até mais!" }/>
                    <Message isMyMessage = { true } messageText = { "Vamos organizar um pouco melhor isto aquie, eu quero testar o aplicativo só que eu não sei o que escrever, então até mais." }/>
                    <Message isMyMessage = { false } messageText = { "Olá, tudo bem?" }/>
                    <Message isMyMessage = { true } messageText = { "Estou sim, e você?" }/>
                    <Message isMyMessage = { false } messageText = { "Ok, até mais!" }/>
                    <Message isMyMessage = { true } messageText = { "Vamos organizar um pouco melhor isto aquie, eu quero testar o aplicativo só que eu não sei o que escrever, então até mais." }/>
                    <Message isMyMessage = { false } messageText = { "Olá, tudo bem?" }/>
                    <Message isMyMessage = { true } messageText = { "Estou sim, e você?" }/>
                    <Message isMyMessage = { false } messageText = { "Ok, até mais!" }/>
                    <Message isMyMessage = { true } messageText = { "Vamos organizar um pouco melhor isto aquie, eu quero testar o aplicativo só que eu não sei o que escrever, então até mais." }/>
                </ScrollView>
                <View style = { styles.inputBox }>
                    <View style = { styles.input }>
                        <TextInput></TextInput>
                    </View>
                    <View style = { styles.sendButton }>
                        <TouchableOpacity>
                            <Image
                                style = { styles.sendButtonImage }
                                source = { sendButton }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    chatBox: {
        flex: 0.9,
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputBox: {
        position: "relative",
        flex: 0.1,
        flexDirection: "row",
        borderTopWidth: 1,
        width: Dimensions.get("window").width,
        borderColor: Colors.defaultBorderColor,
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

export default ChatPage;
