import React, { Component } from 'react';
import { 
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux'

import { 
    joinUserToSocialNetwork
} from "../controllers/SocialNetworkController";

import FooterButtons from "../components/FooterButtons";
import { getStringByCode } from "../res/strings";

import interestsButton from "../res/images/baseline_list_black_18dp.png";

class SocialNetwork extends Component {

    joinSocialNetwork() {

        const { id } = this.props.userInfos;

        joinUserToSocialNetwork(id)
        this.props.navigation.navigate("SocialNetworkUsersPage");

    }

    render() {

        return (
            <View style = { styles.container }>
                <View style = { styles.searchUsersView }>
                    <Button
                        title = "join"
                        onPress = { () => this.joinSocialNetwork() }
                    />
                    {/* <Button
                        title = "leave"
                        onPress = { () => leaveUserToSocialNetwork(id) }
                    /> */}
                </View>
                <FooterButtons buttons = { 
                    [
                        {
                            icon: interestsButton,
                            label: getStringByCode("INTERESTS"),
                            onNavigate: () => this.props.navigation.navigate("InterestsPage")
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
        backgroundColor: 'white',
    },
    searchUsersView: {
        flex: 1
    }
});

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps, null)(SocialNetwork);


