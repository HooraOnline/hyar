
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Row, Icon } from 'native-base';
export default class ColorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //min:props.min || 0,
      //max: props.max ||100,
      //step:props.step || 10,
      numbers: [10, 9, 80, 7, 6, 5, 4, 3, 2, 1, 0],       //Array.apply(null, {length: props.max || 100}).map(Number.call, Number)
      userPin: 5,

    };
  }
  render() {

    return (
      <View style={{ height: 60 }}>
        <Row style={{ width: 200 }}>
          <LinearGradient
            style={[{ width: 200, height: 20, borderRadius: 4, marginLeft: 9 }, this.props.style]}
            colors={['#E74C3C', '#F9E79F', '#F9E79F', '#52BE80']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 13, color: '#fff', }}>  سالم </Text>
              <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 13, color: '#777', }}>  ریسک </Text>
              <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 13, color: '#fff', }}>  خطرناک </Text>
            </View>
          </LinearGradient>
        </Row>
        <Row style={{ width: 205 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: -10 }}>
            {
              this.state.numbers.map((i) => {

                return <Text style={{ flex: 1, backgroundColor: 'transparent', fontFamily: 'iran_sans', fontSize: 12, color: '#777', }}>  {i} </Text>
              })

            }
          </View>
        </Row>
        <Row style={{ width: 200 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: -10 }}>
            {
              this.state.numbers.map((i) => {
                if (i == this.state.userPin)
                  return <View>
                    <Icon name='md-arrow-round-up' style={{ color: 'red', fontSize: 18 }} />
                    <Text style={{ fontSize: 14, fontFamily: 'iran_sans',color:'red' }}>{this.state.userPin}</Text>
                  </View>
              })

            }
          </View>
        </Row>
      </View>
    );
  }
}

