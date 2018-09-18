import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

import { Colors } from "../res/styles/colors";

const FriendItem = (props) => {

    const { friend } = props;
    const { user } = friend;

    //TODO recalcular pelo tamanho da tela
    const handlerDescription = description => {

        let descriptionToBeReturned;

        if(description.length > 30){
            descriptionToBeReturned = `${description.substring(0, 30)}...`;
        } else {
            descriptionToBeReturned = description
        }

        return descriptionToBeReturned;

    }

    return (        
        <View style = { styles.row }>
            <View style = { styles.avatarView }>
                <Image 
                    style = { styles.avatar }
                    source = {{ uri: user.pictureUrl }}
                />
            </View>
            <View style = { styles.friendInfos }>
                <Text style = { styles.friendName }>
                    { user.name }
                </Text>
                <Text>
                    { handlerDescription(user.description) }
                </Text>
            </View>
        </View>
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
    friendInfos: {
        marginLeft: 15,
        justifyContent: "center"
    },
    friendName: {
        fontSize: 17,
        color: "black",
        fontWeight: "bold"
    }
});

export default FriendItem;
