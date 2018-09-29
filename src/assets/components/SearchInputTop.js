import React, { Component } from 'react';
import { 
    View,
    TextInput,
    StyleSheet 
} from 'react-native';

import { getStringByCode } from "../res/strings";
import { Colors } from "../res/styles/colors";

class SearchInputTop extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            inputedText: ""
        }
    }

    onChangeHandler(field, value) {

        this.setState({
            [field]: value
        })

    }

    render(){

        return (
            <View style = { styles.searchView }>
                <TextInput
                    value = { this.state.inputedText }
                    placeholder = { getStringByCode("SEARCH") }
                    returnKeyType = 'search'
                    onChangeText = { value => this.onChangeHandler("inputedText", value) }
                    onSubmitEditing = { () => this.props.onSubmitEditing(this.state.inputedText) }/>
            </View>
        );

    }
};

const styles = StyleSheet.create({
    searchView: {
        padding: 8,
        borderBottomWidth: 1,
        borderColor: Colors.defaultBorderColor
    }
});

export default SearchInputTop;
