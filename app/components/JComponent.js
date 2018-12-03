import React, { Component } from 'react';
import { View, FooterTab, Button, Icon, Text } from 'native-base';
export default class JComponent extends Component {
  json2React = (rjson) => {

    return <Text>rrrrrr</Text>
  }
  render() {
    return (
      <View style={{}}>
        {
          this.json2React(this.props.render)
        }
      </View>
    );
  }
}