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

class PreferencesPage extends Component {

    constructor(props){

        super(props);
        this.state = {
            savedLanguageOnDevice: "",
            savedMessageTypeOnDevice: "",
            selectedLanguage: "0",
            selectedMessageType: "0"
        }

    }

    componentWillMount() {

        getItemOnDeviceLocalStorage("preferencesLanguage").then(value => {
            this.setState({selectedLanguage: value, savedLanguageOnDevice: value});
        });

        getItemOnDeviceLocalStorage("preferencesMessageType").then(value => {
            this.setState({selectedMessageType: value, savedMessageTypeOnDevice: value});
        });


    }

    componentDidMount() {

        const { id } = this.props.userInfos;
        
        getUserPreferences(id).then(preferences => {

            if(preferences){

                const lang = preferences.ID_IDIOMA.toString();
                const type = preferences.ID_TIPO_MENSAGEM.toString();

                this.setState({selectedLanguage: lang});
                this.setState({selectedMessageType: type});
                
                setItemOnDeviceLocalStorage("preferencesLanguage", lang);
                setItemOnDeviceLocalStorage("preferencesMessageType", type);
                
            }

        });

    };

    savePreference(language, messageType){

        const { id } = this.props.userInfos;

        if(language){
            this.setState({ selectedLanguage: language });
        } else if(messageType){
            this.setState({ selectedMessageType: messageType });
        }
        
        const { 
            savedMessageTypeOnDevice,
            savedLanguageOnDevice,
            selectedLanguage,
            selectedMessageType
        } = this.state; 

        if(language && language !== savedLanguageOnDevice){

            updateUserPreferences(id, language, selectedMessageType);
            setItemOnDeviceLocalStorage("preferencesLanguage", language);
            this.setState({ savedLanguageOnDevice: language })

            Alert.alert(getStringByCode("SUCCESS"), getStringByCode("PREFERENCE_LANGUAGE_SAVE"));

        } else if (messageType && messageType !== savedMessageTypeOnDevice) {

            updateUserPreferences(id, selectedLanguage, messageType);
            setItemOnDeviceLocalStorage("preferencesMessageType", messageType);
            this.setState({ savedMessageTypeOnDevice: messageType })

            Alert.alert(getStringByCode("SUCCESS"), getStringByCode("PREFERENCE_MESSAGE_TYPE_SAVE"));

        }

    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.informations }>{ getStringByCode("PREFERENCE_INFORMATIONS") }</Text>
                
                <View style = { styles.pickerLangView}>
                    <Text style = { styles.pickerLabel }>{ `${getStringByCode("LANGUAGE")}:` }</Text>
                    <View style = { styles.pickerView }>
                        <Picker
                            selectedValue = { this.state.selectedLanguage }
                            onValueChange = { itemValue => this.savePreference(itemValue, null) }>
                                <Picker.Item 
                                    label = { getStringByCode("NONE") }
                                    value = { '0' } />
                                <Picker.Item 
                                    label = { getStringByCode("PORTUGUESE") }
                                    value = { '1' } />
                                <Picker.Item 
                                    label = { getStringByCode("ENGLISH") } 
                                    value = { '2' } />
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style = { styles.pickerLabel }>{ `${getStringByCode("TYPE")}:` }</Text>
                    <View style = { styles.pickerView }>
                        <Picker
                            selectedValue = { this.state.selectedMessageType }
                            onValueChange = { itemValue => this.savePreference(null, itemValue) }>
                                <Picker.Item 
                                    label = { getStringByCode("NONE") }
                                    value = { '0' } />
                                <Picker.Item 
                                    label = { getStringByCode("TEXT") }
                                    value = { '1' } />
                                <Picker.Item 
                                    label = { getStringByCode("AUDIO") } 
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

export default connect(mapStateToProps, null)(PreferencesPage);
