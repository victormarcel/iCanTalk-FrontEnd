import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ScrollView
} from 'react-native';

class RegistrationPage extends Component {

    teste() {

    }

    render() {
        return (
            <ScrollView style = { styles.container }>
                <Text style = { styles.label }>Preencha os campos abaixo e comece</Text>
                <Text style = { [styles.label, styles.lastLabel] }>a praticar um novo idioma agora mesmo!!!</Text>

                <TextInput style = { styles.input } placeholder = "Nome"/>
                <TextInput style = { styles.input } placeholder = "Telefone"/>
                <TextInput style = { [styles.input, styles.lastLabel] } placeholder = "E-Mail"/>

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
