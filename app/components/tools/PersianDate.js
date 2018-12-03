
import React, { Component } from 'react';
import {  Text } from 'react-native';

export default class PersianDate extends Component {
  
  render() {

    return (
        <Text style={this.props.style || {justifyContent:'center',alignItems:'center', textAlign:'center', fontSize: 15, color: '#000', fontFamily: 'iran_sans' }}>{new Date(this.props.jsonDate).toPersionDate(this.props.format)}</Text>
    );
  }
}

