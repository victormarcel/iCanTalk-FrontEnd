import React from 'react';
import { 
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import FooterButton from "./FooterButton";

import { Colors } from "../res/styles/colors";

const FooterButtons = props => {

    const renderFooterButtons = () => {

        let buttons = props.buttons.map((button, index) => {
            return ( 
                <FooterButton 
                    key = { index }
                    icon = { button.icon }
                    label = { button.label }
                    onNavigate = { button.onNavigate }
                />
            )
        });

        return buttons;

    }

    return (
        <View style = { styles.footer }>
            { renderFooterButtons() }
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",

        position: "relative",
        bottom: 0,

        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height/10,

        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.defaultBorderColor,

        shadowRadius: 50,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 10
    }
});

export default FooterButtons;
