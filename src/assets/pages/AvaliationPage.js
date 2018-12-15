import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import { connect } from "react-redux";

import { getStringByCode } from "../res/strings";

import AvaliationComponent from '../components/AvaliationComponent';
import { 
    saveAvaliation,
    saveAvaliationOnDevice
} from "../controllers";

let friendly = "";
let goodFluency = "";
let responseTime = "";
class AvaliationPage extends Component {

    setFriendly(value){

        friendly = value;
        this.saveAvaliation();

    }

    setGoodFluency(value){

        goodFluency = value;
        this.saveAvaliation();

    }

    setResponseTime(value){

        responseTime = value;
        this.saveAvaliation();

    }

    saveAvaliation(){

        const { userInfos } = this.props;
        
        if(friendly && goodFluency && responseTime){

            const currentConversation = this.props.navigation.state.params.currentConversation;
            const evaluatedId = currentConversation.SECONDARY_USER_ID;

            saveAvaliationOnDevice(evaluatedId);

            saveAvaliation(evaluatedId, userInfos.id, "1", friendly);
            saveAvaliation(evaluatedId, userInfos.id, "2", goodFluency);
            saveAvaliation(evaluatedId, userInfos.id, "3", responseTime);

            Alert.alert(
                getStringByCode("SUCCESS"),
                getStringByCode("FINISH_AVALIATION_MESSAGE")
            );

            this.props.navigation.goBack(null);

        }

    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.title }>{ getStringByCode("EVALUE_LAST_CONVERSATION") }</Text>
                <View style = { styles.avaliationsView }>
                    <AvaliationComponent
                        label = { getStringByCode("FRIENDLY") }
                        readOnly = { false }
                        onSetState = { this.setFriendly.bind(this) }/>
                    <AvaliationComponent
                        label = { getStringByCode("GOOD_FLUENCY") }
                        readOnly = { false }
                        onSetState = { this.setGoodFluency.bind(this) }/>
                    <AvaliationComponent
                    label = { getStringByCode("RESPONSE_TIME") }
                    readOnly = { false }
                    onSetState = { this.setResponseTime.bind(this) }/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        fontSize: 17,
        textAlign: "center",
        color: "black",
        marginTop: 60,
        marginBottom: 60
    }
});

const mapStateToProps = state => {
    return {
        userInfos: state.userInfos,
        currentConversation: state.currentConversation
    }
}

export default connect(mapStateToProps, null)(AvaliationPage);