import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Sound from 'react-native-sound';

import { Colors } from "../res/styles/colors";

import playButton from "../res/images/baseline_play_arrow_black_18dp.png";
import pauseButton from "../res/images/baseline_pause_black_18dp.png";

class Message extends Component {

    constructor(props){

        super(props);

        this.state = {
            buttonMessage: playButton
        }

    }

    handlerPlayPause() {

        const { messageAudioUrl } = this.props;

        if(messageAudioUrl){
            
            return (

                <TouchableOpacity onPress = { () => this.playMessageAudio() }>
                    <Image source = { this.state.buttonMessage } />
                </TouchableOpacity>
    
            );

        }

    }

    playMessageAudio() {

        const { messageAudioUrl } = this.props;

        this.setState({buttonMessage: pauseButton});

        const sound = new Sound(messageAudioUrl, null, (error) => {
        
            sound.play(success => {
                
                if(success){
                    this.setState({buttonMessage: playButton});
                }
            
            });

        });

    }

    render() {
        
        const { isMyMessage, messageText, messageHour } = this.props;

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
                    { this.handlerPlayPause() }
                    <Text style = { styles.messageText }>{ messageText }</Text>
                    <Text style = { styles.messageHour }>{ messageHour }</Text>
                </View>
            </View>
        );

    }
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
        paddingLeft: 15,
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
        marginRight: 20,
        marginLeft: 10
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
