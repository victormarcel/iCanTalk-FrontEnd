import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    Alert
} from 'react-native';
import { connect } from "react-redux";

import { Colors } from "../res/styles/colors";
import { getStringByCode } from "../res/strings"
import { 
    getUserPreferences, 
    updateUserPreferences
} from "../controllers";
import { setItemOnDeviceLocalStorage, getItemOnDeviceLocalStorage } from '../utils';

class PreferencesPage extends Component {

    constructor(props){

        super(props);
        this.state = {
            savedLanguageOnDevice: "",
            selectedLanguage: ""
        }

    }

    componentWillMount() {

        getItemOnDeviceLocalStorage("preferencesLanguage").then(value => {
            this.setState({selectedLanguage: value, savedLanguageOnDevice: value});
        });


    }

    componentDidMount() {

        const { id } = this.props.userInfos;

        getUserPreferences(id).then(preferences => {

            if(preferences){
                this.setState({selectedLanguage: preferences.ID_IDIOMA});
            }

        });

    };

    setSelectedLanguage(language){

        const { id } = this.props.userInfos;

        this.setState({ selectedLanguage: language });
        
        if(language !== this.state.savedLanguageOnDevice){

            updateUserPreferences(id, language, 0);
            setItemOnDeviceLocalStorage("preferencesLanguage", language);
            this.setState({ savedLanguageOnDevice: language })

            Alert.alert(getStringByCode("SUCCESS"), getStringByCode("PREFERENCE_LANGUAGE_SAVE"));

        }

    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.informations }>{ getStringByCode("PREFERENCE_INFORMATIONS") }</Text>
                <Text style = { styles.languageSelectLabel }>{ `${getStringByCode("PREFERENCE_LANGUAGE_SELECT_TITLE")}:` }</Text>
                <View style = { styles.pickerView }>
                    <Picker
                        selectedValue = { this.state.selectedLanguage }
                        style = { styles.languagePicker }
                        onValueChange = { itemValue => this.setSelectedLanguage(itemValue) }>
                            <Picker.Item 
                                label = "Nenhum"
                                value = "any" />
                            <Picker.Item 
                                label = { getStringByCode("PREFERENCE_PORTUGUESE_LANGUAGE_OPTION") }
                                value = "pt-Br" />
                            <Picker.Item 
                                label = { getStringByCode("PREFERENCE_ENGLISH_LANGUAGE_OPTION") } 
                                value = "en" />
                    </Picker>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    pickerView: {
        borderWidth: 1,
        borderColor: Colors.defaultBorderColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        elevation: 1,
    },
    informations: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 30,
        marginBottom: 30
    },
    languageSelectLabel: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 2
    }
});

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps, null)(PreferencesPage);
