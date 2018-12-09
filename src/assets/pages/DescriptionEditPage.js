import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions,
    ActivityIndicator,
    Alert,
    Keyboard
} from 'react-native';
import { connect } from "react-redux";

import { setUserDescription } from "../../redux/actions/userActions";

import { Colors } from "../res/styles"
import { getStringByCode } from "../res/strings"

import TextArea from "../components/TextArea";

import { 
    updateUserDescription,
    setUserDescriptionOnLocalStorageDevice
 } from "../controllers";


class DescriptionEditPage extends Component {

    constructor(props){

        super(props);

        this.state = {
            description: "",
            isSaving: false
        }

    }

    componentDidMount() {
        
        const { description } = this.props.userInfos;

        this.setState(
            {
                description: description
            }
        )

    }

    bindDescriptionText(value) {
        this.setState({description: value});
    }

    saveDescription() {

        const { id } = this.props.userInfos;
        const { description } = this.state;
        const descriptionToSave = description;

        Keyboard.dismiss();
        this.setState({isSaving: true});

        updateUserDescription(id, descriptionToSave)
        .then(() => {

            setUserDescriptionOnLocalStorageDevice(description);
            this.props.setUserDescription(description);
            this.setState({isSaving: false});

            Alert.alert(
                getStringByCode("SUCCESS"),
                getStringByCode("DESCRIPTION_SAVED_SUCCES")
            );

        })
        .catch(() => {

            Alert.alert(
                getStringByCode("SUCCESS"),
                getStringByCode("DESCRIPTION_SAVED_ERROR")
            );
            this.setState({isSaving: false});

        });

    }

    handlerTranslationButton() {

        const { isSaving } = this.state;

        if(isSaving){ 
            return (<ActivityIndicator size = "large" color = { Colors.appDefaultColor }/>);
        } else {

            return (
                <Button
                    title = { getStringByCode("SAVE") }
                    color = { Colors.appDefaultColor }
                    onPress = { () => this.saveDescription() }
                />
            )

        }

    }

    render() {

        const { description } = this.state;

        return (
            <View style = { styles.container }>
                <Text style = { styles.title }>{ `${getStringByCode("DESCRIPTION")}:` }</Text>
                <View style = { styles.textBoxView }>
                    <TextArea 
                        numberOfLines = { 5 }
                        value = { description }
                        onChangeText = { this.bindDescriptionText.bind(this) }
                    />
                </View>
                <View style = { styles.buttonView }>
                    { this.handlerTranslationButton() } 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    textBoxView: {
        height: Dimensions.get("window").height/5
    },
    title: {
        fontSize: 17
    },
    buttonView: {
        marginTop: 15
    }
});

const mapDispatchToProps = {
    setUserDescription
}

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionEditPage);
