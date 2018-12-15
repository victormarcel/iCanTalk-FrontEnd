import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";

import AvaliationComponent from '../components/AvaliationComponent';
import BasicItemList from '../components/BasicItemList';
import { setUserPictury } from "../../redux/actions";

import { Colors } from "../res/styles/colors";
import { getStringByCode } from "../res/strings";
import ImagePicker from 'react-native-image-picker';

import {
    saveUserPictury,
    setUserImageUrlOnLocalStorageDevice,
    getUserAvaliations
} from "../controllers";

import editButton from "../res/images/baseline_edit_black_18dp.png";
const defaultImageUrl = "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png";

class SettingsPage extends Component {

    constructor(props){

        super(props);

        this.state = {
            imageUrl: "",
            isLoadingPictury: false,
            friendly: 0,
            goodFluency: 0,
            responseTime: 0,
            isFindAvaliations: true
        }

    }

    componentWillMount() {

        const { userInfos } = this.props;
        const userPicturyUrl = userInfos.pictureUrl;

        this.setState({imageUrl: userPicturyUrl ? userPicturyUrl : defaultImageUrl});

    }

    componentDidMount() {

        const { userInfos } = this.props;

        getUserAvaliations(userInfos.id).then(response => {
            
            this.setState(
                {
                    isFindAvaliations: false,
                    friendly: response["1"],
                    goodFluency: response["2"],
                    responseTime: response["3"]
                }
            )

        });

    }

    formatDescription(description) {

        if(description && description.length > 70) {
            return description.substring(0,67) + "..."
        } else {
            return description
        }

    }

    returnMenuItems(){

        menuItems = [
            {
                label: getStringByCode("EDIT_PICTURY"),
                onClick: () => this.getPictury()
            },
            {
                label: getStringByCode("PREFERENCES"),
                onClick: () => this.goToPreferencesPage()
            },
            {
                label: getStringByCode("APP_LANGUAGE"),
                onClick: () => this.goToAppLanguagePage()
            }
        ]

        return menuItems;

    }

    goToDescriptionEditPage(){
        this.props.navigation.navigate("DescriptionEditPage");
    }

    goToPreferencesPage(){
        this.props.navigation.navigate("PreferencesPage");
    }

    goToAppLanguagePage(){
        this.props.navigation.navigate("AppLanguagePage");
    }

    getPictury(){

        const options = {
            title: getStringByCode("EDIT_PICTURY"),
            chooseFromLibraryButtonTitle: getStringByCode("SELECT_FROM_LIBRARY"),
            takePhotoButtonTitle: getStringByCode("TAKE_PHOTO"),
            cancelButtonTitle: getStringByCode("CANCEL"),
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else {
                this.savePictury(response.data);
            }

        });

    }

    savePictury(base64){

        const { userInfos } = this.props;

        this.setState(
            {
                isLoadingPictury: true,
                imageUrl: defaultImageUrl
            }
        );

        saveUserPictury(userInfos.id, base64).then(response => {

            const imageUrl = response.data.url;

            this.props.setUserPictury(imageUrl);
            setUserImageUrlOnLocalStorageDevice(imageUrl);
            this.setState(
                {
                    imageUrl: imageUrl,
                    isLoadingPictury: false
                }
            );

        }).catch(() => {
            this.setState({isLoadingPictury: false});
        });

    }

    showPicturyLoading() {

        const { isLoadingPictury } = this.state;

        if(isLoadingPictury) {
            return (
                <ActivityIndicator 
                    style = { styles.fetchPictury }
                    size = "large" 
                    color = { Colors.appDefaultColor } />
            )
        } else {
            return null
        }

    }

    buildAvaliation(){

        const { 
            friendly,
            goodFluency,
            responseTime
         } = this.state;
        const { isFindAvaliations } = this.state;

        if(isFindAvaliations){
            return (
                <ActivityIndicator 
                    style = { styles.fetchPictury }
                    size = "large" 
                    color = { Colors.appDefaultColor } />
            );
        } else {

            return (
                <View>
                    <AvaliationComponent
                        label = { getStringByCode("FRIENDLY") }
                        readOnly = { true }
                        startState = { friendly }/>
                    <AvaliationComponent
                        label = { getStringByCode("GOOD_FLUENCY") }
                        readOnly = { true }
                        startState = { goodFluency }/>
                    <AvaliationComponent
                        label = { getStringByCode("RESPONSE_TIME") }
                        readOnly = { false }
                        startState = { responseTime }/>
                </View>
            );
            
        }

    }

    render() {

        const { userInfos } = this.props;
        const { 
            imageUrl
         } = this.state;

        return (
            <View style = { styles.container }>
                <View style = { styles.header }>
                    <View style = { styles.avatarView }>
                        <Image 
                            style = { styles.avatar }
                            source = { {uri: imageUrl} }
                        />
                        { this.showPicturyLoading() }
                    </View>
                    <View style = { styles.titles }>
                        <Text style = { styles.title }>{ userInfos.name }</Text>
                        <Text style = { styles.description }>{ this.formatDescription(userInfos.description) }</Text>
                    </View>
                    <TouchableOpacity onPress = { () => this.goToDescriptionEditPage() }>
                        <Image 
                            style = { styles.editButtonIcon }
                            source = { editButton }
                        />
                    </TouchableOpacity>
                </View>
                <View style = { styles.menuOptions }>
                    <FlatList
                        data = { this.returnMenuItems() }
                        renderItem = { ({item}) => ( 
                            <BasicItemList 
                                label = { item.label }
                                padding = { 10 }
                                labelSize = { 17 }
                                onPress = { item.onClick }/>
                        )}
                        keyExtractor = { (item, i) => i.toString() }
                    />
                </View>
                <View style = { styles.userAvaliations }>
                    { this.buildAvaliation() }
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
        justifyContent: "center"
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
    },
    fetchPictury: {
        position: "absolute",
        alignSelf: "center"
    }
});

const mapDispatchToProps = {
    setUserPictury
}

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);

