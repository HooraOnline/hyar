
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Badge2 extends Component {
  
  render() {

    return (
      <View style={{width:22, height: 22,minWidth:22, borderRadius: 3, backgroundColor: '#fff',alignContent:'center',justifyContent:'center'  }}>
        <Text style={{ fontSize: 13, fontFamily: 'iran_sans', textAlign: 'center',padding:3 }}>{this.props.text}</Text>
      </View>
    );
  }
}

