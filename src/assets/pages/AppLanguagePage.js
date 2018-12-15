import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    Alert,
    BackHandler
} from 'react-native';
import { connect } from "react-redux";

import { Colors } from "../res/styles/colors";
import { getStringByCode } from "../res/strings"
import { 
    setItemOnDeviceLocalStorage,
    getItemOnDeviceLocalStorage
} from '../utils';

class AppLanguagePage extends Component {

    constructor(props){

        super(props);
        this.state = {
            langToSave: "",
            selectedLanguage: "pt"
        }

    }

    componentWillMount() {

        getItemOnDeviceLocalStorage("applang").then(lang => {

            if(lang){
                this.setState({selectedLanguage: lang, langToSave: lang});
            } else {
                this.setState({selectedLanguage: "pt", langToSave: "pt"});
            }

        });

    }
    
    setAppLanguage(lang){

        const { langToSave } = this.state;

        if(langToSave && langToSave != lang) {

            this.setState({selectedLanguage: lang, langToSave: lang});
            setItemOnDeviceLocalStorage("applang", lang);

            Alert.alert(
                getStringByCode("LANGUAGE"),
                getStringByCode("APP_LANGUAGE_RESTART"),
                [
                    {
                        text: getStringByCode("YES"),
                        onPress: () => BackHandler.exitApp()
                    },
                    {
                        text: getStringByCode("NO"),
                        onPress: () => console.log('Cancel Pressed'), style: 'cancel'
                    }
                ],
                { cancelable: true }
            )

        }

    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.informations }>{ getStringByCode("APP_LANGUAGE_DESCRIPTION") }</Text>
                
                <View style = { styles.pickerLangView}>
                    <Text style = { styles.pickerLabel }>{ `${getStringByCode("APP_LANGUAGE")}:` }</Text>
                    <View style = { styles.pickerView }>
                        <Picker
                            selectedValue = { this.state.selectedLanguage }
                            onValueChange = { itemValue => this.setAppLanguage(itemValue) }>
                                <Picker.Item 
                                    label = { getStringByCode("PORTUGUESE") }
                                    value = { 'pt' } />
                                <Picker.Item 
                                    label = { getStringByCode("ENGLISH") } 
                                    value = { 'en' } />
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
