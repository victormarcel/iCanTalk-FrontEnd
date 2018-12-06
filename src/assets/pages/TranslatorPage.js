import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    Text,
    Picker,
    StyleSheet,
    Button,
    FlatList,
    ActivityIndicator
} from 'react-native';

import TextArea from "../components/TextArea";
import BasicItemList from "../components/BasicItemList";

import { Colors } from "../res/styles/colors";
import { getStringByCode } from "../res/strings";

import {
    translateText,
    translateWord
} from "../controllers";

class TranslatorPage extends Component {

    constructor(props){

        super(props);

        this.state = {
            selectedLanguageTo: "en",
            selectedLanguageFrom: "pt-Br",

            textToTranslate: "",
            translation: "",

            showDefinitionsAndExamples: false,
            isFindingTranslation: false,

            definitions: [],
            examples: []
        }

    }

    handlerSelectedLanguage(field, language){

        this.setState(
            {
                [field]: language
            }
        )

    }

    handlerDefinitionsAndExamples() {

        const { 
            showDefinitionsAndExamples,
            examples,
            definitions,
            selectedLanguageTo
        } = this.state;

        if(showDefinitionsAndExamples && selectedLanguageTo === "en"){

            return (
                <View style = { styles.handlerDefinitionsAndExamplesBox }>
                    <View>
                        <Text style = { styles.listTile }>{ getStringByCode("DEFINITIONS") }</Text>
                        <FlatList
                            data = { definitions }
                            renderItem = { ({item}) => ( 
                                <BasicItemList label = { item.Text }/>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />
                        <Text>
                            { 
                                !definitions || definitions.length === 0
                                ? <Text>{ getStringByCode("TRANSLATOR_ANY_DEFINITION_SEARCHED") }</Text> 
                                :  null 
                            }
                        </Text> 
                    </View>
                    <View>
                        <Text style = { styles.listTile }>{ getStringByCode("EXAMPLES") }</Text>
                        <FlatList
                            data = { examples }
                            renderItem = { ({item}) => ( 
                                <BasicItemList label = { item }/>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />
                        <Text>
                            { 
                                !examples || examples.length === 0
                                ? <Text>{ getStringByCode("TRANSLATOR_ANY_EXAMPLE_SEARCHED") }</Text> 
                                :  null 
                            }
                        </Text> 
                    </View>
                </View>
            )

        }

    }

    bindTextToTranslate(value) {        
        this.setState({textToTranslate: value});
    }

    searchTextTranslation() {

        const { textToTranslate, selectedLanguageFrom, selectedLanguageTo } = this.state;

        if(textToTranslate){
            
            const splitedText = textToTranslate.split(" ");
            this.setState({isFindingTranslation: true});

            if(splitedText.length === 1){

                translateWord(textToTranslate, selectedLanguageTo, selectedLanguageFrom).then(response => {
                    this.setState(
                        {
                            isFindingTranslation: false,
                            translation: response.translate,
                            showDefinitionsAndExamples: true,
                            definitions: response.definitions,
                            examples: response.examples
                        }
                    );
                });

            } else {

                translateText(textToTranslate, selectedLanguageFrom).then(response => {
                    this.setState(
                        {
                            isFindingTranslation: false,
                            translation: response,
                            showDefinitionsAndExamples: false
                        }
                    );
                });

            }

        }

    }

    handlerTranslationButton() {

        const { isFindingTranslation } = this.state;

        if(isFindingTranslation){ 
            return (<ActivityIndicator size = "large" color = { Colors.appDefaultColor }/>);
        } else {

            return (
                <Button
                    title = { getStringByCode("TRANSLATE") }
                    color = { Colors.appDefaultColor }
                    onPress = { () => this.searchTextTranslation() }
                />
            )

        }

    }
    
    render() {

        const { selectedLanguageTo, selectedLanguageFrom, translation, textToTranslate } = this.state;

        return (
            <ScrollView style = { styles.container }>
                    <View style = { styles.languagePickersView }>
                        <View style = { [ styles.pickerView, styles.leftPicker ] }>
                            <Picker
                                selectedValue = { selectedLanguageTo }
                                onValueChange = { itemValue => this.handlerSelectedLanguage("selectedLanguageTo", itemValue) }>
                                    <Picker.Item 
                                        label = { getStringByCode("ENGLISH") } 
                                        value = "en" />
                                    <Picker.Item 
                                        label = { getStringByCode("PORTUGUESE") }
                                        value = "pt-Br" />
                            </Picker>
                        </View>
                        <View style = { [ styles.pickerView, styles.rightPicker ] }>
                            <Picker
                                selectedValue = { selectedLanguageFrom }
                                onValueChange = { itemValue => this.handlerSelectedLanguage("selectedLanguageFrom", itemValue) }>
                                    <Picker.Item 
                                        label = { getStringByCode("PORTUGUESE") }
                                        value = "pt-Br" />
                                    <Picker.Item 
                                        label = { getStringByCode("ENGLISH") } 
                                        value = "en" />
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <TextArea 
                            numberOfLines = { 3 }
                            placeHolder = { getStringByCode("TEXT") }
                            value = { textToTranslate }
                            onChangeText = { this.bindTextToTranslate.bind(this) }
                        />
                    </View>
                    <View style = { styles.boxTranslationFrom }>
                        <TextArea 
                            numberOfLines = { 3 }
                            placeHolder = { getStringByCode("TRANSLATION") }
                            editable = { false }
                            value = { translation }
                        />
                    </View>

                    { this.handlerTranslationButton() }
                    { this.handlerDefinitionsAndExamples() }
                    
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white"
    },
    pickerView: {
        borderWidth: 1,
        borderColor: Colors.defaultBorderColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        elevation: 1,
    },
    languagePickersView: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    leftPicker: {
        marginRight: 5,
        flex: 0.5
    },
    rightPicker: {
        marginLeft: 5,
        flex: 0.5
    },
    boxTranslationFrom: {
        marginTop: 10,
        marginBottom: 10
    },
    listTile: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    handlerDefinitionsAndExamplesBox: {
        marginBottom: 10
    }
});


export default TranslatorPage;
