import React from 'react';
import { 
    View,
    TextInput,
    StyleSheet
} from 'react-native';

import { Colors } from "../res/styles/colors";

const TextArea = props => {

    return (
        <View style = { styles.container }>
            <TextInput 
                multiline = { true }
                numberOfLines = { props.numberOfLines }
                value = { props.value }
                underlineColorAndroid = 'transparent'
                placeholder = { props.placeHolder }
                editable = { props.editable }
                onChangeText = { value => props.onChangeText(value) }
                style = { styles.textBox }
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: Colors.defaultBorderColor
    },
    textBox: {
        textAlignVertical: "top"
    }
});

export default TextArea;
