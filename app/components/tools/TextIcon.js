
import React, { Component } from 'react';
import { Text, Icon, View } from 'native-base';
import { TouchableHighlight } from 'react-native'
export default class TextIcon extends Component {
  constructor(props) {
    super(props)

    this.state = { inProgress: false }
  }

  render() {

    return (
      <TouchableHighlight style={[this.props.style]} onPress={this.props.onPress}>
        <View style={{ flexDirection: 'row', justifyContent: "center",flex:1}}>
          <Icon name={this.props.icon || "md-eye"} style={{ fontSize: 16, color: this.props.color || '#85929E', width: 30, }} ></Icon>
          <Text style={{ textAlign: 'left', fontSize: 12, fontFamily: 'iran_sans', color: this.props.color || '#85929E', paddingHorizontal: 10, flex: 1 }}>{this.props.text || 0}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

