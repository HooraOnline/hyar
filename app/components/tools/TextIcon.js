
import React, { Component } from 'react';
import { Row, Text,Icon, View } from 'native-base';
export default class TextIcon extends Component {
  constructor(props) {
    super(props)

    this.state = { inProgress: false }
  }

  render() {

    return (
      <View style={[{flexDirection:'row',justifyContent:"center",alignItems:'center'},this.props.style]}>
        <Icon name={this.props.icon ||"md-eye"} style={{ fontSize: 16, color: this.props.color || '#85929E',width:30,  }} ></Icon>
        <Text style={{textAlign:'left', fontSize: 12, fontFamily: 'iran_sans', color:this.props.color || '#85929E', paddingHorizontal: 10,flex:1 }}>{this.props.text || 0}</Text>
      </View>
    );
  }
}

