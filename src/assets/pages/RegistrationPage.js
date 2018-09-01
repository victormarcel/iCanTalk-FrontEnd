import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ScrollView
} from 'react-native';

import { returnStringByCode } from "../res/strings";

class RegistrationPage extends Component {

    teste() {

    }

    render() {
        return (
            <ScrollView style = { styles.container }>
                <Text style = { styles.label }>{ returnStringByCode("REGISTER_TEXT_1") }</Text>
                <Text style = { [styles.label, styles.lastLabel] }>{ returnStringByCode("REGISTER_TEXT_2") }</Text>

                <TextInput style = { styles.input } placeholder = { returnStringByCode("NAME") }/>
                <TextInput style = { styles.input } placeholder = { returnStringByCode("PHONE") }/>
                <TextInput style = { [styles.input, styles.lastLabel] } placeholder = { returnStringByCode("EMAIL") }/>

                <Button 
                    title = "Salvar"
                    color = "#007DD6"
                    onPress = { () => this.teste() }
                />
            </ScrollView>
        );
    }
}

const marginWithinAreas = 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: marginWithinAreas,
        paddingLeft: 20,
        paddingRight: 20
    },
    label: {
        fontSize: 16,
        alignSelf: "center"
    },
    lastLabel: {
        marginBottom: marginWithinAreas
    },
    input: {
        marginBottom: 50
    }
});

export default RegistrationPage;
