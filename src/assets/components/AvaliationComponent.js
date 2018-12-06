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
    }

    buildStart() {

        return (
            <TouchableOpacity>
                <Image 
                    style = { styles.starButton }
                    source = { emptyStart }
                />
            </TouchableOpacity>
        )

    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.title }>{ this.props.label }</Text>
                <View style = { styles.stars }>
                    { this.buildStart() }
                    { this.buildStart() }
                    { this.buildStart() }
                    { this.buildStart() }
                    { this.buildStart() }
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
