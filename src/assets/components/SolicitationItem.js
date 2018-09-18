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

import accept from "../res/images/baseline_check_circle_outline_black_18dp.png";
import recuse from "../res/images/baseline_highlight_off_black_18dp.png";

const SolicitationItem = (props) => {

    const { solicitation } = props;
    const { user } = solicitation;

    return (        
        <View style = { styles.row }>
            <View style = { styles.avatarView }>
                <Image 
                    style = { styles.avatar }
                    source = {{ uri: user.pictureUrl }}
                />
            </View>
            <View style = { styles.userNameView }>
                <Text style = { styles.userName }>{ user.name }</Text>
            </View>
            <View style = { styles.actions }>
                <TouchableOpacity>
                    <Image
                        style = { styles.actionAccept }
                        source = { accept }
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        source = { recuse }
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
    },
    actionAccept: {
        marginRight: 20
    }

});

export default SolicitationItem;
