import React, { Component } from 'react';
// import {
//     Text,
//     Item,
//     Input,
//     Row,
// } from 'native-base';

import {BackHandler,View, Image, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import { $lng } from '../../utils/language';
import { Toast, Icon, Footer, Container, Content } from 'native-base';
import { dataAdapter } from '../../lib/dataAdapter';
import { Actions } from 'react-native-router-flux';
import { Util } from '../../lib/util';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    validate = (entity) => {
        if (!entity.username)
            return "نام کاربری وارد نشده";
        if (!entity.password)
            return "رمز عبور وارد نشده";
        return false;
    }
    loginUser = () => {
        let entity = { username: this.state.username, password: this.state.password }
        let validationErrMessage = this.validate(entity);
        if (validationErrMessage) {
            Toast.show({
                text: validationErrMessage,
                duration: 3000,
                type: 'danger',
                position: "top"
            })
            return
        }
        dataAdapter.login(this.state.username, this.state.password)
            .then((res) => {
                Actions.MainForm();
                this.props.doDispatch('cUser', res.member);
                BackHandler.alow = true;
                Util.saveTokenInStorage(res.member.id, res.member.token);
            })
            .catch((e) => {

                if (e.statusCode == 401)
                    Toast.show({
                        text: 'نام کاربری  یا کلمه عبور نادرست می باشد.',
                        duration: 3000,
                        type: 'danger',
                        position: "top"
                    })
                else
                    Toast.show({
                        text: 'بروز اشکال، لطفا دوباره تلاش کنید.',
                        duration: 3000,
                        type: 'danger',
                        position: "top"
                    })
            })
    }
    componentWillMount(){
       
    }
    render() {
        return (
            <Container style={{ flex: 1, height: '100%' }}>
                <Content style={styles.container}>
                    <Image source={require('../../assets/logo-text.png')} style={styles.imageStyle} />
                    < View style={{ paddingBottom: 9, marginTop: 60, }} />
                    <TextInput style={styles.input} onChangeText={(username) => this.setState({ username })} placeholder="نام کاربری" underlineColorAndroid="transparent" />

                    <View style={{ paddingBottom: 9 }} />
                    <TextInput style={styles.input} onChangeText={(password) => this.setState({ password })} placeholder="رمز عبور" underlineColorAndroid="transparent" secureTextEntry />

                    <View style={{ marginTop: 9 }} />
                    <View style={{ flexDirection: 'row', marginHorizontal: 25 }}>
                        <Icon name='ios-lock-outline' style={{ fontSize: 25, color: '#7f735f' }} />
                        <TouchableOpacity
                            onPress={() => {Actions.PasswordRecovery() }}
                            title="رمز عبور را فراموش کرده ام"
                            accessibilityLabel="رمز عبور را فراموش کرده ام"
                        >
                            <Text style={styles.forgetStyle}>رمز عبور را فراموش کرده ام</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={this.loginUser }
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>ورود</Text>
                    </TouchableOpacity>
                </Content>
            </Container>

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
        padding:10,
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
        
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'iran_sans',
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
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
}, mapDispatchToProps)(Login);


//this.props.cUser