import React, { Component } from 'react';
import { getItemOnDeviceLocalStorage } from "./assets/utils/DeviceLocalStorage";
import { setAppLang } from "./assets/res/strings/appLang";
import {
    View
} from "react-native";
import { connect } from 'react-redux'

import Router from './Router'
import { isRegisteredUser } from "./assets/utils";
import { setIsRegisteredUser }  from "./redux/actions";

//TODO - RETIRAR ESTE CÓDIO
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated in plain JavaScript React classes. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.',
    'Module RCTImageLoader', 
    'Remote debugger is in a background tab which may cause apps to perform slowly'
]);

class ICanTalkApp extends Component{

    constructor(props){

        super(props);

        this.state = {
            isRegisteredUser: "",
            executedIsRegisteredUserPromise: false
        }

    }

    componentWillMount() {
        
        getItemOnDeviceLocalStorage("applang").then(lang => {
            
            if(lang){
                setAppLang(lang)
            }

        });

    }

    componentDidMount() {

        isRegisteredUser().then(isRegisteredUser => {

            this.props.setIsRegisteredUser(isRegisteredUser);
            
            this.setState({
                executedIsRegisteredUserPromise: true,
                isRegisteredUser
            })

        });

    }

    render() {
        if (this.state.executedIsRegisteredUserPromise) {
            return (<Router isRegisteredUser = { this.state.isRegisteredUser }/>)
          } else {
            return (<View></View>)
          }
    }

};

const mapDispatchToProps = {
    setIsRegisteredUser
}

const mapStateToProps = state => {
    return {
        isRegisteredUser: state.userInfos.isRegisteredUser
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ICanTalkApp);
