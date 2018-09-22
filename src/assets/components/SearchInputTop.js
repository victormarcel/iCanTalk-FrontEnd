import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { getStringByCode } from "../res/strings";
import { Colors } from "../res/styles/colors";

const SearchInputTop = () => {
    return (
        <View style = { styles.searchView }>
            <TextInput placeholder = { getStringByCode("SEARCH") }/>
        </View>
    );
};

const styles = StyleSheet.create({
    searchView: {
        padding: 8,
        borderBottomWidth: 1,
        borderColor: Colors.defaultBorderColor
    }
});

export default SearchInputTop;
