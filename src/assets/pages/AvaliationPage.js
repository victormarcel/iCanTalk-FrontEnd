import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import AvaliationComponent from '../components/AvaliationComponent';

class AvaliationPage extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.title }>{ "Por favor, avalie sua última conversa." }</Text>
                <View style = { styles.avaliationsView }>
                    <AvaliationComponent
                        label = "Avaliação"/>
                    <AvaliationComponent
                        label = "Avaliação"/>
                    <AvaliationComponent
                        label = "Avaliação"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        fontSize: 17,
        textAlign: "center",
        color: "black",
        marginTop: 60,
        marginBottom: 60
    }
});

export default AvaliationPage;
