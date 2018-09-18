import React, { Component } from 'react';
import { 
    View,
    FlatList,
    StyleSheet,
    ScrollView
} from 'react-native';

import SearchInputTop from "../components/SearchInputTop";
import FriendToAddItem from "../components/FriendToAddItem";

const userMock = [
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
    },{
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
    },
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
    },
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
    },
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

class AddFriendsPage extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <SearchInputTop />
                <ScrollView>
                    <FlatList
                        data = { userMock }
                        renderItem = { ({item}) => ( 
                            <FriendToAddItem users = { item }/>
                        )}
                        keyExtractor = { item => item.id }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default AddFriendsPage;
