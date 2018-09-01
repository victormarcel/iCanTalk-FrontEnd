import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

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
        <View style = { styles.row }>
            <View style = { styles.avatarView }>
                <Image 
                    style = { styles.avatar }
                    source = {{ uri: conversation.user.pictureUrl }}
                />
            </View>
            <View style = { styles.conversationInfos }>
                <Text style = { styles.conversationName }>
                    { conversation.user.name }
                </Text>
                <Text>
                    { handlerLastMessage(conversation.lastMessage) }
                </Text>
            </View>
            <Text style = { styles.lastMessageHour }>
                { conversation.lastMessageHour }
            </Text>
        </View>
    );
};

const defaultPadding =  10;
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",

        borderBottomWidth: 1,
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
