
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Row, Icon, Grid, Col } from 'native-base';

export default class ColorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: ['0-5', '5-40', '40-100'].reverse(),       //Array.apply(null, {length: props.max || 100}).map(Number.call, Number)
      ranges:this.props.ranges?this.props.ranges.reverse(): [{ range: [0,5], color: '#E6787D' }, { range: [5,40], color: '#9EE898' }, { range: [40,100], color: '#E6787D' },].reverse(),
      pin: props.pin || 15,
      width: props.width || 300,
      counter: 0
    };
    console.log('pin='+this.state.pin )
    console.log('range1='+this.state.ranges[0].range[1] )
    console.log((this.state.pin /this.state.ranges[this.state.ranges.length-1].range[1] ) * this.state.width)
  }
  renderColors = () => {

  }
  render() {
    return (
      <Grid style={{ height: 10, }}>

        {/* <Row style={{ width: this.state.width, height: 20 }}>
          <LinearGradient
            style={[{ width:this.state.width, borderRadius: 4, }, this.props.style]}
            colors={['#E6787D',  '#52BE80','#E6787D']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 13, color: '#fff', }}>  خطرناک </Text>
              <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 13, color: '#777', }}>  ریسک </Text>
              <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 13, color: '#fff', }}>  خطرناک </Text>
            </View>
          </LinearGradient>
        </Row> */}
        <Row style={{ width: this.state.width, justifyContent: 'flex-end', height: 20, }}>
          <View style={{ width: (this.state.pin /this.state.ranges[0].range[1] ) * this.state.width, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'flex-start', }}>
              <Icon name='ios-man-outline' style={{ color: '#0c6366', fontSize: 25 }} />
              <Text style={{ fontSize: 16, fontFamily: 'iran_sans', color: '#0c6366',paddingHorizontal:2 }}>{this.state.pin}</Text>
            </View>
          </View>
        </Row>
        <Row style={{ width: this.state.width, height: this.props.height, borderRadius: 4 }}>
          {
            this.state.ranges.map((r, index) => {
              return <Col key={index} style={{ width: ((r.range[1]-r.range[0]) /this.state.ranges[index].range[1])*this.state.width, backgroundColor: r.color, }}></Col>
            })
          }
        </Row>
        <Row style={{ width: this.state.width, height: 20, }}>
          {
            this.state.ranges.map((r, index) => {
              return <Col key={index} style={{ width: ((r.range[1]-r.range[0]) /this.state.ranges[index].range[1] )*this.state.width, }}><Text style={{fontFamily:'iran_sans', fontSize:13, flex:1,textAlign:'left' }}>{r.range[1]}</Text></Col>
            })
          }
        </Row>

      </Grid>
    );
  }
}

