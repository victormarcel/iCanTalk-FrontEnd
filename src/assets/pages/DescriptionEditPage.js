//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { Colors } from "../res/styles"
import { getStringByCode } from "../res/strings"

// create a component
class DescriptionEditPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style = {{fontSize: 17}}>{ "Descrição:" }</Text>
                <Text style = {{marginTop: 20}}>{ "Procurando pessoas para praticar meu inglês" }</Text>
                <View style = {{marginTop: 320}}>
                    <Button
                        title = { getStringByCode("SAVE") }
                        color = { Colors.appDefaultColor }
                        onPress = { () => this.searchTextTranslation() }
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
});

//make this component available to the app
export default DescriptionEditPage;
