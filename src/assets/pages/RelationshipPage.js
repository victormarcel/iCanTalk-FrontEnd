import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';

import SearchInputTop from "../components/SearchInputTop";
import ListTitle from "../components/ListTitle";
import SolicitationItem from "../components/SolicitationItem";
import FriendItem from "../components/FriendItem";
import FooterButtons from "../components/FooterButtons"

import { getStringByCode } from "../res/strings";

import fiendAddIcon from "../res/images/baseline_person_add_black_18dp.png";

const solictationsMock = [
    {
        "id": "1",
        "user": {
            "name": "Bedin",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        }
    },
    {
        "id": "2",
        "user": {
            "name": "Beto",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        }
    }
]
const friendsMock = [
    {
        "id": "1",
        user: {
            "name": "Luis",
            "description": "A liberdade vai cantar!",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        }
    },
    {
        "id": "2",
        user: {
            "name": "Bernardo",
            "description": "Monetizei para todos vocês",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        }
    },
    {
        "id": "3",
        user: {
            "name": "Gilberto",
            "description": "Mete a mão no meu malote não eeeeeeee",
            "pictureUrl": "https://centrik.in/wp-content/uploads/2017/02/user-image-.png"
        }
    }
]

class RelashionshipPage extends Component {
    render() {

        return (
            <View style = { styles.container }>
                <SearchInputTop/>
                <ScrollView>
                    <View>
                        <ListTitle label = { getStringByCode("SOLICITATIONS") }/>
                        <FlatList
                            data = { solictationsMock }
                            renderItem = { ({item}) => ( 
                                <SolicitationItem solicitation = { item }/>
                            )}
                            keyExtractor = { item => item.id }
                        />
                    </View>
                    <View>
                        <ListTitle label = { getStringByCode("FRIENDS") }/>
                        <ScrollView>
                            <FlatList
                                data = { friendsMock }
                                renderItem = { ({item}) => ( 
                                    <FriendItem friend = { item }/>
                                )}
                                keyExtractor = { item => item.id }
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
                <FooterButtons buttons = { 
                    [
                        {
                            icon: fiendAddIcon,
                            label: getStringByCode("RELATIONSHIP_LIST_TILE_FRIENDS"),
                            onNavigate: () => { this.props.navigation.navigate("AddFriendsPage") }
                        }
                    ] 
                }/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default RelashionshipPage;
