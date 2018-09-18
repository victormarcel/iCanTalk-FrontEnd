import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListTitle = props => {
    return (
        <View>
            <Text style = { styles.listTile }>{ props.label }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    listTile: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold"
    }
});

export default ListTitle;
