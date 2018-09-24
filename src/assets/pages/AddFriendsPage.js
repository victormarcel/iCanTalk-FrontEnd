import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import { connect } from "react-redux"

import { 
    getUserListBySomeInfo, 
    createSolicitation
} from "../controllers";
import { Colors } from "../res/styles";
import { getStringByCode } from "../res/strings";

import SearchInputTop from "../components/SearchInputTop";
import FriendToAddItem from "../components/FriendToAddItem";

class AddFriendsPage extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            searchedUsers: [],
            isSearching: false
        }

    }

    searchUsersByInputedInfo(){

        const { searchInputTopValue } = this.props;
        const { id } = this.props.userInfos;

        this.setState({isSearching: true});

        getUserListBySomeInfo(id, searchInputTopValue).then(users => {

            let searchedUsers = users.data.usuarios;
            this.setState({isSearching: false});

            if(!searchedUsers || searchedUsers === []){
                this.setState({searchedUsers: []});
            } else {
                this.setState({searchedUsers: users.data.usuarios});
            }

        })

    }

    sendSolicitation(selectedUser){

        const { userInfos } = this.props;

        Alert.alert(
            getStringByCode("SOLICITATION"),
            getStringByCode("SEND_SOLICITATION_QUESTION")(selectedUser.NOME),
            [
                {
                    text: getStringByCode("YES"),
                    onPress: () => {
                        createSolicitation(userInfos.id, selectedUser.ID)
                        .then(() => {

                            Alert.alert(
                                getStringByCode("SUCCESS"),
                                getStringByCode("SEND_SOLICITATION_SUCCESS")
                            );
                            this.searchUsersByInputedInfo();

                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                },
                {
                    text: getStringByCode("NO"),
                    onPress: () => console.log('Cancel Pressed'), style: 'cancel'
                }
            ],
            { cancelable: true }
          )

    }

    handlerMainComponent() {

        if(this.state.isSearching) {
            return (<ActivityIndicator size = "large" color = { Colors.appDefaultColor }/>);
        } else if(this.state.searchedUsers.length === 0){
            return(<Text style = { styles.anyUserSearched }>{ getStringByCode("ADD_FRIENDS_ANY_SEARCHED_USERS") }</Text>);
        } else {

            return (
                <FlatList
                    data = { this.state.searchedUsers }
                    renderItem = { ({item}) => ( 
                        <FriendToAddItem 
                            user = { item }
                            addActionClick = { this.sendSolicitation.bind(this) }/>
                    )}
                    keyExtractor = { item => item.ID.toString() }
                />
            )

        }

    }

    render() {

        let { isSearching, searchedUsers } = this.state;

        return (
            <View style = { styles.container }>
                <SearchInputTop onSubmitEditing = { this.searchUsersByInputedInfo.bind(this) }/>
                <ScrollView style = { isSearching || searchedUsers.length === 0 ? styles.viewError : null }>
                    { this.handlerMainComponent() }
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
    viewError: {
        paddingTop: 50
    },
    anyUserSearched: {
        alignSelf: "center"
    }
});

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos,
        searchInputTopValue: state.searchInputTopValue
    }
}

export default connect(mapStateToProps, null)(AddFriendsPage);
