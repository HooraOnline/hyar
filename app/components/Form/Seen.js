
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
      <View style={[{flexDirection:'row',justifyContent:"center",alignItems:'center'},this.props.style]}>
        <Icon name="md-eye" style={{ fontSize: 16, color: this.props.color || '#85929E',width:30,  }} ></Icon>
        <Text style={{textAlign:'left', fontSize: 12, fontFamily: 'iran_sans', color:this.props.color || '#85929E', paddingHorizontal: 10,flex:1 }}>{this.props.seen || 0}</Text>
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
