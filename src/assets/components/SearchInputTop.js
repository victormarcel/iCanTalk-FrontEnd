import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { returnStringByCode } from "../res/strings";

const SearchInputTop = () => {
    return (
        <View style = { styles.searchView }>
            <TextInput placeholder = { returnStringByCode("SEARCH") }/>
        </View>
    );
};

const styles = StyleSheet.create({
    searchView: {
        padding: 8,
        borderBottomWidth: 1
    }
});

export default SearchInputTop;
