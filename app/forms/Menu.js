import React, { Component } from 'react';
import {
  Container, Content, Header, Left, Right, Body, Title, Text, Button, Card,
  CardItem, Form, Item, Input, Icon, Toast, Thumbnail, Col, Row, Grid
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../aRedux'
import { bindActionCreators } from 'redux'
import { forms } from '../presentation';
import { UIhelper } from '../lib/uiHelper';
import { Util } from '../lib/util';
import Api from '../lib/api';
class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    if (this.props.drawerIsOpen == false)
      return (<View></View>)
    return (
      <View style={{ flex: 1, backgroundColor: '#5d949c' }}>
        <View style={{ justifyContent: 'flex-start', paddingTop: 0, paddingHorizontal: 0 }}>
          <View style={{ alignItems: 'center', paddingVertical: 30 }} >
            <Thumbnail large source={{ uri: Api.getFilePath('profile') + this.props.cUser.profileImage }} />
          </View>
          <View>
            <Button iconLeft transparent style={{}} onPress={() => { Actions.Profile() }}>
              <Icon style={{ color: "#fff" }} name="md-person" />
              <Text style={{ fontFamily: 'iran_sans_bold', marginTop: 6, color: "#fff" }}> پروفایل</Text>
            </Button>
          </View>
          <View>
            <Button iconLeft transparent style={{}} onPress={() => Actions.ChangePassword()}>
              <Icon style={{ color: "#fff" }} name="md-lock" />
              <Text style={{ fontFamily: 'iran_sans_bold', marginTop: 6, color: "#fff", }}>تغییر رمز ورود</Text>
            </Button>
          </View>
          <View>
            <Button iconLeft transparent style={{}} onPress={() => {UIhelper.logout();}}>
              <Icon style={{ color: "#fff" }} name="md-power" />
              <Text style={{ fontFamily: 'iran_sans_bold', marginTop: 6, color: "#fff" }}>خروج از سیستم</Text>
            </Button>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    color: '#fff'
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },

});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {
    cUser: state.cUser,

  }
}, mapDispatchToProps)(Menu);