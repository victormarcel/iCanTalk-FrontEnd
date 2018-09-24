import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'

import { registerUser } from "../controllers";
import { setUserInfos }  from  "../../redux/actions";

import { getStringByCode } from "../res/strings";
import { Colors } from "../res/styles/colors";

class RegistrationPage extends Component {

    constructor(props){

        super(props);
        this.state = {
            nameInput: "",
            phoneInput: "",
            mailInput: "",
            doingRequest: false
        }

    }

    onChangeHandler(field, value) {

        this.setState({
            [field]: value
        })

    }

    onClickSaveButton() {
        this.saveUser();
    }

    saveUser(){

        if(this.isFilledRegistrationForm()){

            this.setState({doingRequest: true});

            const userInfos = this.createUserInfosObject();
            registerUser(userInfos)
            .then(userId => {

                this.setState({doingRequest: false});

                userInfos.id = userId;

                this.props.setUserInfos(userInfos);
                this.props.navigation.replace("ConversationPage");
                Alert.alert(getStringByCode("WELCOME"), getStringByCode("WELCOME_INIT_TEXT"));

            })
            .catch(error => {

                this.setState({doingRequest: false});

                Alert.alert(getStringByCode("ERROR"), getStringByCode("REGISTER_TEXT_SAVE_ERROR_2"));
                console.log(error);

            })

        } else {
            Alert.alert(getStringByCode("ERROR"), getStringByCode("REGISTER_TEXT_SAVE_ERROR_1"));
        }

    }

    createUserInfosObject() {

        const { nameInput, phoneInput, mailInput } = this.state;

        const object = {
            name: nameInput,
            phone: phoneInput,
            email: mailInput
        }

        return object;

    }

    isFilledRegistrationForm(){

        const { nameInput, phoneInput, mailInput } = this.state;

        if(nameInput && phoneInput && mailInput){
            return true;
        } else {
            return false;
        }

    }

    handlerButton() {

        const { doingRequest } = this.state;

        if(doingRequest){
            return (<ActivityIndicator size = "large" color = { Colors.appDefaultColor }/>);
        } else {

            return (<Button 
                title = { getStringByCode("SAVE") }
                color = { Colors.appDefaultColor }
                onPress = { () => this.onClickSaveButton() }
            />)

        } 

    }

    render() {
        return (
            <ScrollView style = { styles.container }>

                <Text style = { styles.label }>{ getStringByCode("REGISTER_TEXT_1") }</Text>
                <Text style = { [styles.label, styles.lastLabel] }>{ getStringByCode("REGISTER_TEXT_2") }</Text>

                <TextInput
                    style = { styles.input }
                    placeholder = { getStringByCode("NAME") }
                    value = { this.state.nameInput }
                    onChangeText = { value => this.onChangeHandler("nameInput", value) }/>
                <TextInput
                    style = { styles.input }
                    keyboardType = "numeric"
                    placeholder = { getStringByCode("PHONE") }
                    value = { this.state.phoneInput }
                    onChangeText = { value => this.onChangeHandler("phoneInput", value) }/>
                <TextInput
                    style = { [styles.input, styles.lastLabel] }
                    keyboardType = "email-address"
                    autoCapitalize = 'none'
                    placeholder = { getStringByCode("EMAIL") }
                    value = { this.state.mailInput }
                    onChangeText = { value => this.onChangeHandler("mailInput", value) }/>
                { this.handlerButton() }
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


const mapDispatchToProps = {
    setUserInfos
}

export default connect(null, mapDispatchToProps)(RegistrationPage);
