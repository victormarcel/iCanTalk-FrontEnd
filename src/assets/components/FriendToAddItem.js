import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { Colors } from "../res/styles/colors";

import addIcon from "../res/images/baseline_add_circle_outline_black_18dp.png";

const FriendToAddItem = (props) => {

    const { user } = props;

    return (        
        <View style = { styles.row }>
            <View style = { styles.avatarView }>
                <Image 
                    style = { styles.avatar }
                    source = {{ uri: user.URL_IMAGEM_PERFIL }}
                />
            </View>
            <View style = { styles.userNameView }>
                <Text style = { styles.userName }>{ user.NOME }</Text>
            </View>
            <View style = { styles.actions }>
                <TouchableOpacity onPress = { () => props.addActionClick(user) }>
                    <Image
                        source = { addIcon }
                    />
                </TouchableOpacity>
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
    userNameView: {
        marginLeft: 15,
        justifyContent: "center"
    },
    userName: {
        fontSize: 17,
        color: "black",
        fontWeight: "bold"
    },
    actions: {      

        flexDirection: "row",

        position: "absolute",
        right: 0,
        marginRight: 50,

        alignSelf: "center",
        justifyContent: "center"
    }

});

export default FriendToAddItem;
