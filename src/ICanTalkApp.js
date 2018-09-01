import React, { Component } from 'react';
import {
    Alert
} from "react-native";
import { connect } from 'react-redux'

import Router from './Router'
import { isRegisteredUser } from "./assets/utils";
import { setIsRegisteredUser }  from "./redux/actions";

//TODO - RETIRAR ESTE CÓDIO
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader', 
    'Remote debugger is in a background tab which may cause apps to perform slowly'
]);

class ICanTalkApp extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount() {

        isRegisteredUser().then(value => {
            this.props.setIsRegisteredUser(value);
        });

    }

    render() {

        const { isRegisteredUser } = this.props;

        return (
            <Router isRegisteredUser/>
        );
    }

};

const mapDispatchToProps = {
    setIsRegisteredUser
}

const mapStateToProps = state => {
    return {
        isRegisteredUser: state.isRegisteredUser
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ICanTalkApp);
