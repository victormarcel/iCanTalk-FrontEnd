import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    Dimensions
} from 'react-native';

import { Colors } from "../res/styles/colors";
import { getStringByCode } from "../res/strings"

class PreferencesPage extends Component {

    constructor(props){

        super(props);
        this.state = {
            selectedLanguage: ""
        }

    }

    setSelectedLanguage(language){

        this.setState(
            {
                selectedLanguage: language
            }
        )

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
                                label = { getStringByCode("PREFERENCE_PORTUGUESE_LANGUAGE_OPTION") }
                                value="js" />
                            <Picker.Item 
                                label = { getStringByCode("PREFERENCE_ENGLISH_LANGUAGE_OPTION") } 
                                value="java" />
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

export default PreferencesPage;
