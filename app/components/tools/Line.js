
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Line extends Component {
  
  render() {

    return (
      <View style={[{flex:1,height:this.props.height ||0.3 ,marginHorizontal:this.props.padding || 15,marginVertical:this.props.margin || 7, backgroundColor:this.props.color ||'#666' },this.props.style]}>
       
      </View>
    );
  }
}

