import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
 } from 'react-native';

import { Colors } from "../res/styles/colors";

const FooterButton = props => {
    return (
        <View style = { styles.button }>
            <TouchableOpacity onPress = { props.onPress }>
                <View style = { styles.buttonContent }>
                    <Image
                        source = { props.icon }
                    />
                    <Text>{ props.label }</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,

        borderLeftWidth: 1,
        borderColor: Colors.defaultBorderColor,

        justifyContent: "center",

        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonContent: {
        alignItems: "center"
    }
});

export default FooterButton;
