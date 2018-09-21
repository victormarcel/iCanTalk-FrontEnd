import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { Colors } from "../res/styles/colors";

const Message = props => {

    const { isMyMessage, messageText } = props;

    return (
        <View style = { [styles.container, isMyMessage ? styles.receivedMessageBoxPosition : null] }>
            <View style = {
                    [
                        styles.messageBox, 
                        isMyMessage
                        ? null
                        : styles.receivedMessageBoxColor
                    ] 
                }>
                <Text style = { styles.messageText }>{ messageText }</Text>
                <Text style = { styles.messageHour }>09:00</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    messageBox: {
        maxWidth:"85%",
        
        flexDirection: 'row',

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 50,
        marginBottom: 10,
        
        backgroundColor: Colors.myMessage,

        borderRadius: 10
    },
    receivedMessageBoxPosition: {
        justifyContent: 'flex-end'
    },
    receivedMessageBoxColor: {
        backgroundColor: Colors.receivedMessage
    },
    messageText: {
        flexWrap: "wrap",
        color: "black",
        marginRight: 20
    },
    messageHour: {
        position: "absolute",
        bottom: 0,
        right: 0,

        marginBottom: 5,
        marginRight: 10,

        color: "black"
    }
});

export default Message;
