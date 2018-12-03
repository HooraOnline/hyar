import React, { Component } from 'react';
import {  Alert, StyleSheet, Image ,NetInfo} from 'react-native';
import { View, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';




export default class CheckInternet extends Component {
    constructor() {
        super();
        this.state = { connected: false, };
    }
    
    render() {
 
        return (

            <View style={[styles.container, styles.horizontal]}>
               

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#841584' }}>
                   اینترنت متصل نمی باشد. 
                 </Text>
                 <Text style={{ fontSize: 20, textAlign: 'center', color: '#841584' }}>
                 اتصال اینترنت خود را برسی کنید
                 </Text>
                 <Text style={{  fontSize: 30, textAlign: 'center', color: '#841584' }}>
                  HamrahYar
                 </Text>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    horizontal: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        //padding: 10
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
  
})

