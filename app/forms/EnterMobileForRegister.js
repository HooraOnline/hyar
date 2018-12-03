import React, { Component } from 'react';
import {
  Text, Item, Input, Col,
} from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import ActionForm from '../components/Form/ActionForm';
import { $lng } from '../utils/language';
import { Util } from '../lib/util';
import { forms } from '../presentation';
import { ActionCreators } from '../aRedux';

class EnterMobileForRegister extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, }
  }


  componentWillMount() {

  } 
  render() {
    return (
      <ActionForm
        super={this}
        ref={(ref) => { this.baseForm = ref; }}
        showReturnedBtn={false}
        title={$lng.enter_mobile_number}
        accessCode="rg12"
        storeKey='cUser'
        entity={this.props.cUser}
        showActionFooter={true}
        showActionHeader={true}
        footerText={$lng['hamrhayar_1397']}
        ref={(ref) => { this.form = ref; }}
        action='saveEntity'
        apiPath='members'
        showActionBtn={true}
        onValidate={(model) => {
          if (!model.mobile)
            return $lng.Mobile_number_not_arrived;
          if (!Util.mobileReg.test(model.mobile))
            return " شماره موبایل وارد شده درست نیست";
          return false;
        }}
        onActionSuccess={(entity, form) => {
          Actions.ActionForm(EnterSMScode);
        }}
        onbeforeAction={(user) => user.username = user.mobile}
        content={(form, entity) => <View style={{}}>
          <Item style={{ flex: 1, }}>
            <Input style={[ { textAlign: 'left' }]} placeholder="09" onChangeText={text => { entity.mobile = text; }} value={entity.mobile} keyboardType="phone-pad"
              keyboardType="phone-pad" maxLength={11} />
          </Item>
          <Text style={[ { marginTop: 6 }]} > {$lng.enter_your_mobile}</Text>
          <Col onPress={() => Actions.ActionForm( forms.LoginByMobile)}>
            <Text style={[ { margin: 10, color: 'blue', marginTop: 30, textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000" }]}  > {$lng.register_before}</Text>
          </Col>
          <Image style={[{ marginTop: 40 }]} source={require("../assets/logo.png")} />
        </View>

        } />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {
    cUser: state.cUser,
  }
}, mapDispatchToProps)(EnterMobileForRegister);







