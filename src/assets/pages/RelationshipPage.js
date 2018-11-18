import React, { Component } from 'react';
import { 
    View,
    Alert,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

import SearchInputTop from "../components/SearchInputTop";
import ListTitle from "../components/ListTitle";
import SolicitationItem from "../components/SolicitationItem";
import FriendItem from "../components/FriendItem";
import FooterButtons from "../components/FooterButtons"

import { getStringByCode } from "../res/strings";
import {
    setConversations,
    setCurrentConversation
} from "../../redux/actions";
import { 
    getSolicitationsByUser,
    getFriendsByUser,
    acceptSolicitation,
    removeSolicitation
} from "../controllers/RelationshipPageController";
import { 
    getItemOnDeviceLocalStorage,
    setItemOnDeviceLocalStorage
 } from "../utils/DeviceLocalStorage";
 import {
    getConversationByUserId
 } from "../utils";

import fiendAddIcon from "../res/images/baseline_person_add_black_18dp.png";

class RelashionshipPage extends Component {

    constructor(props){

        super(props);
        this.state = {
            searchedSolicitations: [],
            searchedFriends: [],
            searchedFriendsClone: []
        }

    }

    componentDidMount() {

        this.getSolicitations();
        this.getFriendsList();
        this.updateFriends();
        
    }

    getSolicitations() {

        const { userInfos } = this.props;

        getSolicitationsByUser(userInfos.id)
        .then(solicitations => {

            if(solicitations){
                this.setState({searchedSolicitations: solicitations});
            } else {
                this.setState({searchedSolicitations: []});
            }
            
        }).catch(error => console.log(error));

    }

    getFriendsList() {

        getItemOnDeviceLocalStorage("friends").then(friends => {

            if(friends){

                const friendsAsObject = JSON.parse(friends);
                this.setState({searchedFriends: friendsAsObject});

            }

        }).catch(error => console.log(error));

    }

    updateFriends() {

        const { userInfos } = this.props;

        getFriendsByUser(userInfos.id)
        .then(friends => {
            
            let updatedFriends;

            if(friends){
                updatedFriends = friends;
            } else {
                updatedFriends = [];
            }

            this.setState({
                searchedFriends: updatedFriends,
                searchedFriendsClone: updatedFriends
            });
            this.setFriendsList();

        }).catch(error => console.log(error));

    }

    applyFriendsListFilter(searchedText) {

        const friends = this.state.searchedFriendsClone;

        if(searchedText){

            const filteredFriends = friends.filter(friend => {
                return friend.NOME_USUARIO_AMIGO.toUpperCase().indexOf(searchedText.toUpperCase()) > -1;
            });

            this.setState({searchedFriends: filteredFriends});

        } else {
            this.getFriendsList();
        }

    }

    setFriendsList(){

        const listAsJson = JSON.stringify(this.state.searchedFriends);
        setItemOnDeviceLocalStorage("friends", listAsJson);

    }

    acceptButtonOnClick(solicitation) {

        this.removeSolicitation(solicitation.ID_RELACIONAMENTO);
        Alert.alert(getStringByCode("SOLICITATION"), getStringByCode("RELATIONSHIP_SOLICITATION_ACCEPTED"));

        acceptSolicitation(solicitation).then(() => {
            this.setNewFriendOnStateBySolicitation(solicitation);
        });

    }

    removeSolicitation(solicitationId){

        var solicitations = this.state.searchedSolicitations;

        solicitations.forEach((solicitation, i) => {

            if(solicitation.ID_RELACIONAMENTO === solicitationId){
                solicitations.splice(i, 1);
                return;
            }

        });

        this.setState({searchedSolicitations: solicitations});

    }

    recuseButtonOnClick(solicitation){

        Alert.alert(
            getStringByCode("SOLICITATION"),
            getStringByCode("RELATIONSHIP_SOLICITATION_RECUSE"),
            [
                {
                    text: getStringByCode("YES"),
                    onPress: () => {
                        
                        const { ID_RELACIONAMENTO } = solicitation;

                        removeSolicitation(solicitation).then(() => {

                            this.removeSolicitation(ID_RELACIONAMENTO);
                            Alert.alert(
                                getStringByCode("SOLICITATION"),
                                getStringByCode("RELATIONSHIP_SOLICITATION_RECUSED")
                            )

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

    setNewFriendOnStateBySolicitation(solicitation){

        var newFriend = [
            {
                ID_RELACIONAMENTO: solicitation.ID_RELACIONAMENTO,
                ID_USUARIO_AMIGO: solicitation.ID_USUARIO_PRIMARIO,
                NOME_USUARIO_AMIGO: solicitation.NOME_USUARIO_SOLICITANTE,
                EMAIL_USUARIO_AMIGO: solicitation.EMAIL_USUARIO_SOLICITANTE,
                TELEFONE_USUARIO_AMIGO: solicitation.TELEFONE_USUARIO_SOLICITANTE,
                FCM_TOKEN_USUARIO_AMIGO: solicitation.FCM_TOKEN_USUARIO_SOLICITANTE,
                DESCRICAO_USUARIO_AMIGO: solicitation.DESCRICAO_USUARIO_SOLICITANTE,
                URL_IMAGEM_PERFIL_USUARIO_AMIGO: solicitation.URL_IMAGEM_PERFIL_USUARIO_SOLICITANTE
            }
        ];

        this.setState({searchedFriends: this.state.searchedFriends.concat(newFriend)});
        this.setFriendsList();

    }

    handlerSolicitationsList() {

        let { searchedSolicitations } = this.state;

        if(searchedSolicitations.length > 0){

            return (
                <View>
                    <ListTitle label = { getStringByCode("SOLICITATIONS") }/>
                    <FlatList
                        data = { searchedSolicitations }
                        renderItem = { ({item}) => ( 
                            <SolicitationItem 
                                solicitation = { item }
                                acceptButtonOnClick = { () =>  this.acceptButtonOnClick(item) }
                                recuseButtonOnClick = { () =>  this.recuseButtonOnClick(item) }/>
                        )}
                        keyExtractor = { item => item.ID_RELACIONAMENTO.toString() }
                    />
                </View>
            )

        }

    }

    openChat(friend) {
        
        const friendId = friend.ID_USUARIO_AMIGO;
        const conversation = getConversationByUserId(friendId);
        
        if(conversation){
            this.props.setCurrentConversation(conversation);
        } else {
            this.props.setCurrentConversation(
                {
                    SECONDARY_USER_ID: friendId,
                    NAME: friend.NOME_USUARIO_AMIGO,
                    PICTURY_URL: friend.URL_IMAGEM_PERFIL_USUARIO_AMIGO,
                    FCM_TOKEN: friend.FCM_TOKEN_USUARIO_AMIGO
                }
            );
        }

        this.props.navigation.navigate("ChatPage", {userName: friend.NOME_USUARIO_AMIGO});

    }

    render() {

        const { searchedFriends } = this.state;

        return (
            <View style = { styles.container }>
                <SearchInputTop onSubmitEditing = { this.applyFriendsListFilter.bind(this) }/>
                <ScrollView>
                    { this.handlerSolicitationsList() }
                    <View>
                        <ListTitle label = { getStringByCode("FRIENDS") }/>
                        <ScrollView>
                            <FlatList
                                data = { searchedFriends }
                                renderItem = { ({item}) => ( 
                                    <FriendItem 
                                        friend = { item }
                                        openChat = { () => this.openChat(item) }/>
                                )}
                                keyExtractor = { item => item.ID_RELACIONAMENTO.toString() }
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

const mapDispatchToProps = {
    setConversations,
    setCurrentConversation
}

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RelashionshipPage);

