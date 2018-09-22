import React, { Component } from 'react';
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
    'Warning: isMounted(...) is deprecated',
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
        isRegisteredUser: state.user.isRegisteredUser
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ICanTalkApp);
