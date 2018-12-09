import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class CircleColor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInProgress: false,

    };
  }



  render() {
    return (
     
        <View style={styles.container}>
          <View style={styles.progressLayer}></View>
          <View style={styles.offsetLayer}></View>
        </View>
        )
    }
  }
const styles = StyleSheet.create({
          container: {
          width: 100,
        height: 100,
        borderWidth: 10,
        borderRadius: 100,
        borderColor: '#9EE898',
        justifyContent: 'center',
        alignItems: 'center'
      },
  progressLayer: {
          width: 100,
        height: 100,
        borderWidth: 10,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: '#E6787D',
        borderBottomColor: 'transparent',
        borderRightColor: '#EB984E',
        borderTopColor: '#EB984E',
    transform:[{rotateZ: '-45deg'}]
      },
  offsetLayer: {
          width: 100,
        height: 100,
        borderWidth: 10,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#9EE898',
        borderTopColor: '#9EE898',
    transform:[{rotateZ: '-135deg'}]
      }
    });
    
