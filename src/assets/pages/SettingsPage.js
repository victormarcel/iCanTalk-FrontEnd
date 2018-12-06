import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import AvaliationComponent from '../components/AvaliationComponent';
import BasicItemList from '../components/BasicItemList';

import { Colors } from "../res/styles/colors";
import editButton from "../res/images/baseline_edit_black_18dp.png";

const menuItens = [
    {
        "label": "Editar foto de perfil",
        "onPress": ""
    },
    {
        "label": "Preferências",
        "onPress": ""
    },
    {
        "label": "Idioma da aplicação",
        "onPress": ""
    }
]

class SettingsPage extends Component {

    formatDescription(description) {

        if(description && description.length > 70) {
            return description.substring(0,67) + "..."
        } else {
            return description
        }

    }

    render() {
        return (
            <View style = { styles.container }>
                <View style = { styles.header }>
                    <View style = { styles.avatarView }>
                        <Image 
                            style = { styles.avatar }
                            source = {{ uri: "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" }}
                        />
                    </View>
                    <View style = { styles.titles }>
                        <Text style = { styles.title }>Victor</Text>
                        <Text style = { styles.description }>{ this.formatDescription("Procurando pessoas para praticar meu inglês") }</Text>
                    </View>
                    <TouchableOpacity>
                        <Image 
                            style = { styles.editButtonIcon }
                            source = { editButton }
                        />
                    </TouchableOpacity>
                </View>
                <View style = { styles.menuOptions }>
                    <FlatList
                        data = { menuItens }
                        renderItem = { ({item}) => ( 
                            <BasicItemList 
                                label = { item.label }
                                padding = { 10 }
                                labelSize = { 17 }/>
                        )}
                        keyExtractor = { (item, i) => i.toString() }
                    />
                </View>
                <View style = { styles.userAvaliations }>
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
        backgroundColor: 'white'
    },
    header: {
        flex: 0.25,
        flexDirection: "row",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: Colors.defaultBorderColor
    },
    avatarView: {
        width: Dimensions.get("window").width/4,
        height: Dimensions.get("window").width/4,
        borderRadius: 50,
        marginLeft: 10,
    },
    avatar: {
        aspectRatio: 1,
        flex: 1,
        alignSelf: "center",
        borderRadius: 50
    },
    titles: {
        width: Dimensions.get("window").width/2,
        height: Dimensions.get("window").height/7,
        justifyContent: "center",
        marginLeft: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    editButtonIcon: {
        width: Dimensions.get("window").width/9.5,
        height: Dimensions.get("window").width/9.5,
        marginLeft: 10,
        marginTop: 30
    },
    menuOptions: {
        flex: 0.30
    },
    userAvaliations: {
        flex: 0.45
    }
});

export default SettingsPage;
