import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

const HeaderIcons = props => {

    const bindButtons = () => {

        let buttons = props.buttons.map((button, index) => {

            return (
                <TouchableOpacity 
                    key = { index }
                    onPress = { button.onPress }
                    style = { styles.imageBox }>
                    <Image
                        style = { styles.image }
                        source = { button.icon }
                    />
                </TouchableOpacity>
            )

        });

        return buttons;

    }

    return (
        <View style = { styles.headerIcons }>
           { bindButtons() }
        </View>
    );
};

const styles = StyleSheet.create({
    headerIcons: {
        flex: 1,
        flexDirection: "row",
        marginRight: 20
    },
    imageBox: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    image: {
        flex: 1,
        width: null,
        height: null
    }
});

//make this component available to the app
export default HeaderIcons;
