import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Button
} from 'react-native';

import logo from "../images/logo.png";
import { Colors } from "../styles"
import { returnStringByCode } from "../strings";

class WelcomePage extends Component {

    constructor(props){
        super(props);
    }

    openRegistrationPage(){
        this.props.navigation.replace("RegistrationPage");
    }

    render() {
        return (
            <View style = { styles.container }>

                <View style = { styles.firstSession }>
                    <View style = { styles.imageLogoBox }>
                        <Image  
                            style = { styles.imageLogo }
                            source = { logo }
                        />
                    </View> 
    
                    <Text style = { styles.label }>{ returnStringByCode("WELCOME_TEXT_1") }</Text>
                    <Text style = { [styles.label, styles.lastLabel] }>{ returnStringByCode("WELCOME_TEXT_2") }</Text>
    
                    <Text style = { styles.label }>{ returnStringByCode("WELCOME_TEXT_3") }</Text>
                    <Text style = { styles.label }>{ returnStringByCode("WELCOME_TEXT_4") }</Text>
                    <Text style = { [styles.label, styles.labelBeforeButton] }>{ returnStringByCode("WELCOME_TEXT_5") }</Text>
                </View>

                <Button
                    title = "Vamos Começar!"
                    color = { Colors.appDefaultColor }
                    onPress = { () => this.openRegistrationPage() }
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    firstSession: {
        alignItems: "center"
    },
    imageLogoBox: {
        width: Dimensions.get("window").width/3,
        height: Dimensions.get("window").height/5,
        
        marginTop: 40,
        marginBottom: 40
    },
    imageLogo: {
        flex: 1,
        width: null,
        height: null
    },
    label: {
        fontSize: 19
    },
    lastLabel: {
        marginBottom: 40
    },
    labelBeforeButton: {
        marginBottom: 80
    }
});

export default WelcomePage;