
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Row, Icon, Grid, Col } from 'native-base';

export default class ColorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

      ranges: this.props.ranges ? this.props.ranges.reverse() : [{ range: [0, 5], color: '#E6787D' }, { range: [5, 40], color: '#9EE898' }, { range: [40, 100], color: '#E6787D' },].reverse(),
      counter: 0
    };

  }
  renderColors = () => {

  }
  render() {
    return (

      <View style={{flex:1,width:'100%',}} >
        <Row style={{ height: 20, }}>
          <Col style={{ flex: (1 - (Number(this.props.pin) / this.state.ranges[0].range[1])), }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
              <Text style={{ fontSize: 16, fontFamily: 'iran_sans', color: '#0c6366', paddingHorizontal: 2 }}>{this.props.pin}</Text>
              <Icon name='ios-man-outline' style={{ color: '#0c6366', fontSize: 25 }} />
            </View>
          </Col>
        </Row>
        <Row style={{ height: this.props.height, }}>
          {
            this.state.ranges.map((r, index) => {
              if (index == 0)
                return <Col key={index} style={{ borderTopStartRadius: 3, borderBottomStartRadius: 3, flex: ((r.range[1] - r.range[0]) / this.state.ranges[0].range[1]), backgroundColor: r.color, }}></Col>
              if (index == this.state.ranges.length - 1)
                return <Col key={index} style={{ borderTopEndRadius: 3, borderBottomEndRadius: 3, flex: ((r.range[1] - r.range[0]) / this.state.ranges[0].range[1]), backgroundColor: r.color, }}></Col>
              return <Col key={index} style={{ flex: ((r.range[1] - r.range[0]) / this.state.ranges[0].range[1]), backgroundColor: r.color, }}></Col>
            })
          }
        </Row>
        <Row style={{ flexDirection: 'row', height: 20, alignContent: 'flex-end' }}>

          {
            this.state.ranges.map((r, index) => {
              return <Col key={index} style={{ flex: ((r.range[1] - r.range[0]) / this.state.ranges[0].range[1]), }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 16, fontFamily: 'iran_sans', color: '#0c6366', paddingHorizontal: 2 }}>{r.range[1]}</Text>
                </View>
              </Col>
            })
          }
          <Col style={{ width: 10, }}>
            <View style={{}}>
              <Text style={{ fontSize: 16, fontFamily: 'iran_sans', justifyContent: 'flex-start', color: '#0c6366', paddingHorizontal: 0 }}>{this.state.ranges[this.state.ranges.length - 1].range[0]}</Text>
            </View>
          </Col>
        </Row>


      </View>






    );
  }
}

