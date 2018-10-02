import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';

import { Colors } from "../res/styles/colors";

const ConversationItem = (props) => {

    const { conversation } = props;

    //TODO recalcular pelo tamanho da tela
    const handlerLastMessage = lastMessage => {

        let lastMessageToBeReturned;

        if(lastMessage.length > 30){
            lastMessageToBeReturned = `${lastMessage.substring(0, 30)}...`;
        } else {
            lastMessageToBeReturned = lastMessage
        }

        return lastMessageToBeReturned;

    }

    return (        
        <TouchableNativeFeedback onPress = { props.onNavigate }>
            <View style = { styles.row }>
                <View style = { styles.avatarView }>
                    <Image 
                        style = { styles.avatar }
                        source = {{ uri: conversation.PICTURY_URL }}
                    />
                </View>
                <View style = { styles.conversationInfos }>
                    <Text style = { styles.conversationName }>
                        { conversation.NAME }
                    </Text>
                    <Text>
                        { handlerLastMessage(conversation.LAST_MESSAGE) }
                    </Text>
                </View>
                <Text style = { styles.lastMessageHour }>
                    { conversation.LAST_MESSAGE_HOUR }
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const defaultPadding =  10;
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",

        borderBottomWidth: 1,
        borderColor: Colors.defaultBorderColor,
        paddingTop: defaultPadding,
        paddingBottom: defaultPadding
    },
    avatarView: {
        width: Dimensions.get("window").width/7,
        height: Dimensions.get("window").width/7,
        borderRadius: 50,
        marginLeft: 15
    },
    avatar: {
        aspectRatio: 1,
        flex: 1,

        borderRadius: 50
    },
    conversationInfos: {
        marginLeft: 15,
        justifyContent: "center"
    },
    conversationName: {
        fontSize: 17,
        color: "black",
        fontWeight: "bold"
    },
    lastMessageHour: {
        position: "absolute",
        bottom: 0,
        right: 0,

        marginBottom: 10,
        marginRight: 10
    }
});

export default ConversationItem;
