import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Colors } from "../res/styles/colors";

import checkedBox from "../res/images/baseline_check_box_black_18dp.png";
import emptyBox from "../res/images/baseline_check_box_outline_blank_black_18dp.png";

class InterestsListItem extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            checked: this.props.subject.checked
        }

    }

    onItemClick(){

        let { subject } = this.props;

        this.props.onClick(subject);
        this.setCheckboxState();

    }

    setCheckboxState() {

        const value = !this.state.checked;

        this.setState({checked: value});
        this.props.subject.checked = value;

    }

    render() {

        const { checked, DESCRICAO } = this.props.subject;

        return (
            <TouchableOpacity onPress = { () => this.onItemClick() }>
                <View style = { styles.container }>
                        <Text style = { styles.label }>{ DESCRICAO }</Text>
                        <Image
                            style = { styles.button }
                            source = { checked ? checkedBox : emptyBox }
                        />
                    
                </View>
            </TouchableOpacity>
            
        );

    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'white',
        padding: 10,
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: Colors.defaultBorderColor,

        paddingTop: 20,
        paddingBottom: 20
    },
    label: {
        fontSize: 20,
        color: 'black'
    },
    button: {
        position: "absolute",
        right: 0,

        marginRight: 10,
        alignSelf: "center"

    }
});

export default InterestsListItem;
