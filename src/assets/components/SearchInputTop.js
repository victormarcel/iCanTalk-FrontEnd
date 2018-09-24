import React, { Component } from 'react';
import { 
    View,
    TextInput,
    StyleSheet 
} from 'react-native';
import { connect } from "react-redux"

import { setSearchInputValue } from "../../redux/actions";
import { getStringByCode } from "../res/strings";
import { Colors } from "../res/styles/colors";

class SearchInputTop extends Component {

    constructor(props) {
        super(props);
    }

    //TODO MUDAR
    componentDidMount() {
        this.props.setSearchInputValue("");
    }

    render(){

        return (
            <View style = { styles.searchView }>
                <TextInput 
                    placeholder = { getStringByCode("SEARCH") }
                    returnKeyType = 'search'
                    onChangeText = { value => this.props.setSearchInputValue(value) }
                    onSubmitEditing = { () => this.props.onSubmitEditing(this.props.searchInputTopValue) }/>
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

const mapDispatchToProps = {
    setSearchInputValue
}

const mapStateToProps = state => {
    return {
        searchInputTopValue: state.searchInputTopValue
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputTop);
