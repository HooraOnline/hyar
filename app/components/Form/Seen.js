
import React, { Component } from 'react';
import { Row, Text,Icon, View } from 'native-base';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import { ActionCreators } from '../../aRedux';
class Seen extends Component {
  constructor(props) {
    super(props)

    this.state = { inProgress: false }
  }

  render() {

    return (
      <View activeOpacity={0.7} style={[{flexDirection:'row',justifyContent:"center",alignItems:'center'},this.props.style]}>
        <Icon name="md-eye" style={{ fontSize: 15, color: this.props.color || '#85929E',  }} ></Icon>
        <Text style={{textAlign:'left', fontSize: 15, fontFamily: 'iran_sans', color:this.props.color || '#85929E', paddingHorizontal: 10, }}>{this.props.seen || 0}</Text>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state, props) => {
  return {
    store: state,
  }
}, mapDispatchToProps)(Seen);
