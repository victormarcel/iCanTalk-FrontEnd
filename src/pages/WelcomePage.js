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

class WelcomePage extends Component {

    constructor(props){
        super(props);
    }

    openRegisterPage(){
        this.props.navigation.replace("RegisterPage");
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
    
                    <Text style = { styles.label }>Está pronto para praticar um novo</Text>
                    <Text style = { [styles.label, styles.lastLabel] }>idioma como nunca praticou?</Text>
    
                    <Text style = { styles.label }>Clique no botão abaixo</Text>
                    <Text style = { styles.label }>e aproveito a melhor experiência para</Text>
                    <Text style = { [styles.label, styles.labelBeforeButton] }>estudar um novo idioma!</Text>
                </View>

                <Button
                    title = "Vamos Começar!"
                    color = { Colors.appDefaultColor }
                    onPress = { () => this.openRegisterPage() }
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
