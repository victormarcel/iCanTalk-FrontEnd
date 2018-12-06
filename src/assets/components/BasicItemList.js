import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Colors } from "../res/styles/colors";

const BasicItemList = props => {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: Colors.defaultBorderColor,
            paddingTop: props.padding ? props.padding : 10,
            paddingBottom: props.padding ? props.padding : 10,
            paddingLeft: props.padding ? props.padding : 0,
        },
        label: {
            fontSize: props.labelSize ? props.labelSize : null,
            color: props.labelColor ? props.labelColor : "black"
        }
    });

    return (
        <View style = { styles.container }>
            <TouchableOpacity onPress = { props.onPress }>
                <View>
                    <Text style = { styles.label }>{ props.label }</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default BasicItemList;
