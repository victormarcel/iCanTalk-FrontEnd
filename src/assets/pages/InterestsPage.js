import React, { Component } from 'react';
import {
    View,
    ScrollView,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';
import { connect } from "react-redux";

import InterestsListItem from "../components/InterestsListItem";

import {
    getSubjectsByLang,
    getSubjectsByUser,
    saveInterest,
    removeInterest
} from "../controllers";
import {
    getItemOnDeviceLocalStorage
} from "../utils";
import { Colors } from "../res/styles/colors";
import { getStringByCode } from '../res/strings';

class InterestsPage extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            subjects: [],
            isLoading: true
        }

    }

    componentDidMount() {

        const { userInfos } = this.props;
        
        getItemOnDeviceLocalStorage("applang").then(lang => {

            let appLang;

            if(lang){
                appLang = lang;
            } else {
                appLang = "pt";
            }

            getSubjectsByLang(appLang).then(subjectsByLang => {

                let subjectsClone = [...subjectsByLang];

                getSubjectsByUser(userInfos.id).then(subjectsByUser => {
                    
                    this.handlerSubjects(subjectsClone, subjectsByUser);

                    this.setState(
                        {
                            subjects: subjectsClone,
                            isLoading: false
                        }
                    );

                });

            });

        });

    }

    handlerSubjects(subjects, subjectsByUser){

        if(subjectsByUser){

            subjectsByUserCodes = subjectsByUser.map(subject => {
                return subject.ID_ASSUNTO;
            })

            subjects.forEach(subject => {

                if(subjectsByUserCodes.indexOf(subject.ID) !== -1){
                    subject.checked = true;
                } else {
                    subject.checked = false;
                }

            });

        } else {

            subjects.forEach(subject => {
                subject.checked = false;
            });

        }

    }

    handlerInterest(subject){

        const { userInfos } = this.props;

        if(!subject.checked){
            saveInterest(userInfos.id, subject.ID);
        } else {
            removeInterest(userInfos.id, subject.ID);
        }

    }

    handlerContent() {

        const { isLoading } = this.state;

        if(isLoading) {
            return (
                <View style = { { justifyContent: "center", alignItems: "center", marginTop: 50 } }>
                    <ActivityIndicator size = "large" color = { Colors.appDefaultColor }/>
                    <Text>{ `${getStringByCode("WAIT")}...` }</Text>
                </View>
            );
        } else {

            return (
                <ScrollView>
                    <FlatList
                        styles = { styles.flatList }
                        data = { this.state.subjects }
                        renderItem = { ({item}) => ( 
                            <InterestsListItem
                                subject = { item }
                                onClick = { this.handlerInterest.bind(this) } />
                        )}
                        keyExtractor = { item => item.ID.toString() }
                    />
                </ScrollView>
            )

        }

    }

    render() {

        return (
            <View style= { styles.container }>
               { this.handlerContent() } 
            </View>
        );
        
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
const mapStateToProps = state => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps, null)(InterestsPage);

