
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Row, Icon, Grid, Col } from 'native-base';

export default class ColorBarVertical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: ['0-5', '5-40', '40-100'].reverse(),       //Array.apply(null, {length: props.max || 100}).map(Number.call, Number)
      ranges:this.props.ranges?this.props.ranges.reverse(): [{ range: [0,5], color: '#E6787D' }, { range: [5,40], color: '#9EE898' }, { range: [40,100], color: '#E6787D' },].reverse(),
      pin: props.pin || 15,
      width: props.width || 300,
      counter: 0
    };
  
  }
  renderColors = () => {

  }
  render() {
    return (
     

      
       
        <View style={{ height: this.state.height || 100, width: this.props.width || 20, borderRadius: 0,backgroundColor:'red' }}>
          {
            this.state.ranges.map((r, index) => {
              debugger
              let h= ((r.range[1]-r.range[0]) /this.state.ranges[index].range[1])*this.props.height;
              return <View key={index} style={{width: this.props.width || 20, height:h, backgroundColor: r.color, }}></View>
            })
          }
        </View>
       

     
    );
  }
}

