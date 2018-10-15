import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { Colors } from "../res/styles/colors";

const BasicItemList = props => {
    return (
        <View style = { styles.container }>
            <Text> { props.label } </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.defaultBorderColor,
        paddingTop: 10,
        paddingBottom: 10
    },
});

export default BasicItemList;
