import React, { Component } from 'react';
// import {
//     Text,
//     Item,
//     Input,
//     Row,
// } from 'native-base';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import { $lng } from '../../utils/language';
import { Toast, Icon, Footer, Container, Content } from 'native-base';
import { dataAdapter } from '../../lib/dataAdapter';
import { Actions } from 'react-native-router-flux';
import { Util } from '../../lib/util';
import MasterPage from '../MasterPage';


class ChangePassword extends React.Component {

  validate = (entity) => {
console.log(entity.password);
console.log(this.state.rePassword)
    if (!entity.oldPassword)
      return "رمز فعلی وارد نشده";
    if (!entity.password)
      return "رمز جدید وارد نشده";
    if (entity.password!=this.state.rePassword)
      return "تکرار رمز اشتباه است";
    return false;
  }
  ChangePass = () => {
    let entity = {id:this.props.cUser.id, oldPassword: this.state.oldPassword ,password: this.state.password,}
    let validationErrMessage = this.validate(entity);
    if (validationErrMessage) {
      Toast.show({
        text: validationErrMessage,
        duration: 3000,
        type: 'danger',
        position: "top"
      })
      return;
    }
    this.props.updateEntity('members', entity, 'cUser').then((res) => {
        Actions.Login();
        Toast.show({
          text: 'رمز با موفقیت تغییر یافت، دوباره وارد شوید',
          duration: 7000,
          type: 'success',
          position: "top"
        })
    }).catch(e => {
     console.log(e)
      Toast.show({
        text: 'بروز اشکال لطفا دوباره تلاش کنید.',
        duration: 3000,
        type: 'danger',
        position: "top"
      })
    });
  }

  render() {
    return (
      <MasterPage
        showMenu={true}
        footertabIndex={1}
        isList={false}
        showReturnBtn={true}
        footerStyle={{ backgroundColor: '#fff' }}
        containerStyle={{ backgroundColor: '#f2f4f3' }}
        backgroundColor={{ backgroundColor: '#f2f4f3' }}
        footerIconColor='#000'
        title="تغییر رمز"
        headerItems={[
          { text: 'تغییر رمز عبور', },

        ]}
      >
    
            <View>
              <Text style={{color:'#7f735f' ,textAlign: 'center', paddingTop: 40, fontFamily: 'iran_sans', fontSize: 17, padding: 10 }}>
                تغییر رمز عبور
              </Text>
            </View>
            < View style={{ marginTop: 9 }} />
            <TextInput style={styles.input} onChangeText={(oldPassword) => this.setState({ oldPassword })}  placeholder="رمز عبور فعلی " underlineColorAndroid="transparent" />
            < View style={{ marginTop: 9 }} />
            <TextInput style={styles.input} onChangeText={(password) => this.setState({ password })}  secureTextEntry placeholder="رمز عبور جدید" underlineColorAndroid="transparent" />
            < View style={{ marginTop: 9 }} />
            <TextInput style={styles.input} onChangeText={(rePassword) => this.setState({ rePassword })} secureTextEntry placeholder="تکرار رمز عبور جدید" underlineColorAndroid="transparent" />

            <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={this.ChangePass}
              underlayColor='#fff'>
              <Text style={styles.submitText}>ثبت</Text>
            </TouchableOpacity>

       
      </MasterPage>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f4f3",
    flex: 1,

  },
  imageStyle: {
    height: 70,
    resizeMode: 'contain',
    width: 200,
    marginTop: 110,
    alignSelf: 'center',
    alignContent: 'center',
  },
  imageStyle2: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    marginBottom: 0

  },
  input: {
    height: 40,
    color: '#7f735f',
    textAlign: 'right',
    backgroundColor: '#fff',
    marginRight: 20,
    marginLeft: 20,
    paddingHorizontal:10,
    fontFamily:'iran_sans',
  
  },
  loginScreenButton: {
    marginTop: 25,
       width:120,
        backgroundColor: '#7f735f',
        height: 37,
        alignSelf:'center',
        borderRadius:4,
        justifyContent:'center',
        fontFamily:'iran_sans'
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'iran_sans',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'iran_sans',
    color: '#fff',

  },
  forgetStyle: {
    color: '#7f735f',
    fontFamily: 'iran_sans',
    fontSize: 14,
    textAlign: 'left',
    paddingTop: 5,
    paddingHorizontal: 5,
  }
});


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {
    cUser: state.cUser,
  }
}, mapDispatchToProps)(ChangePassword);

