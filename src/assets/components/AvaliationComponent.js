import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
 } from 'react-native';

 import checkedStart from "../res/images/baseline_star_black_18dp.png";
 import emptyStart from "../res/images/baseline_star_border_black_18dp.png";

class AvaliationComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        }

    }

    componentDidMount() {
        
        const { startState } = this.props;
        this.setStartState(startState);

    }

    buildStart(startNumber) {

        const stateStar = this.state[startNumber];
        const { readOnly } = this.props

        return (
            <TouchableOpacity 
                onPress = { readOnly ? null : () => this.setStartState(startNumber) }
                disabled = { readOnly } >
                <Image 
                    style = { styles.starButton }
                    source = { stateStar ? checkedStart : emptyStart }
                />
            </TouchableOpacity>
        )

    }

    setStartState(startNumber){

        for(var i = 1; i <= startNumber; i++){
            this.setState({[i]: true})
        }

        for(var i = startNumber + 1; i <= 5; i++){
            this.setState({[i]: false})
        }

        const { onSetState } = this.props;
        if(onSetState){
            onSetState.call(null, startNumber);
        }

    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.title }>{ this.props.label }</Text>
                <View style = { styles.stars }>
                    { this.buildStart(1) }
                    { this.buildStart(2) }
                    { this.buildStart(3) }
                    { this.buildStart(4) }
                    { this.buildStart(5) }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height/8,
        alignSelf: "center",
    },
    title: {
        color: "black",
        fontSize: 15
    },
    stars: {
        flexDirection: "row"
    },
    starButton: {
        marginTop: 7,
        marginRight: 5
    }
});

export default AvaliationComponent;
