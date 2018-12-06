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
import { 
    setItemOnDeviceLocalStorage,
    getItemOnDeviceLocalStorage
} from '../utils';

class AppLanguagePage extends Component {

    constructor(props){

        super(props);
        this.state = {
            savedLanguageOnDevice: "",
            selectedLanguage: "0"
        }

    }

    componentWillMount() {

        // getItemOnDeviceLocalStorage("preferencesLanguage").then(value => {
        //     this.setState({selectedLanguage: value, savedLanguageOnDevice: value});
        // });


    }

    componentDidMount() {

        

    };

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.informations }>{ getStringByCode("APP_LANGUAGE_DESCRIPTION") }</Text>
                
                <View style = { styles.pickerLangView}>
                    <Text style = { styles.pickerLabel }>{ `${getStringByCode("APP_LANGUAGE")}:` }</Text>
                    <View style = { styles.pickerView }>
                        <Picker
                            selectedValue = { this.state.selectedLanguage }
                            onValueChange = { itemValue => this.savePreference(itemValue, null) }>
                                <Picker.Item 
                                    label = { getStringByCode("PORTUGUESE") }
                                    value = { '1' } />
                                <Picker.Item 
                                    label = { getStringByCode("ENGLISH") } 
                                    value = { '2' } />
                        </Picker>
                    </View>
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
    pickerLangView: {
        marginBottom: 40
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
        marginBottom: 50
    },
    pickerLabel: {
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

export default connect(mapStateToProps, null)(AppLanguagePage);
