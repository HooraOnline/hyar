import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { Toast } from 'native-base'
import connect from 'react-redux/lib/connect/connect';
import { ActionCreators } from '../../aRedux';
import { bindActionCreators } from 'redux';
import MasterPage from '../MasterPage';
import Api from '../../lib/api';
import { Actions } from 'react-native-router-flux';
import { ProgressBarPT } from '../../components/Form/ProgressBarPT';




class PasswordRecovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            inProgress: false,
            email: null,

        };
    }
    sendPassword = (newPass) => {
        let text = ` رمز عبور موقت شما ${newPass} می باشد، لطفا بعد از ورود به اپلیکیشن رمز خود را تغییر دهید.`
        this.props.addEntity('Messages/sendMessage', { from: 'اپلیکشن سازمانی همراه اول.', to: this.state.email, subject: 'رمز عبور موقت', text: text })
            .then(() => {
                this.setState({inProgress:false});
                Actions.Login();
                Toast.show({
                    text: 'رمز یکبار مصرف به ایمیل شما ارسال شد، اکیدا توصیه می شود بلافاصله بعد از ورود به سیستم رمز خود را تغییر دهید.',
                    duration: 10000,
                    type: 'success',
                    position: "top"
                })
            }).catch(e => {
                this.setState({inProgress:false});
                Toast.show({
                    text: 'بروز اشکال در ارسال رمز موقت، لطف دوباره تلاش کنید.',
                    duration: 3000,
                    type: 'danger',
                    position: "top"
                })
            });

    }

    changePass = (member) => {
        let newPass = Math.floor((Math.random() * 1000000)).toString()
        member.password=newPass;
        member.tempPassword=newPass;
        this.props.updateEntity('members', member).then((res) => {
            this.sendPassword(newPass);
        }).catch(e => {
            this.setState({ inProgress: false });
            Toast.show({
                text: 'بروز اشکال لطفا دوباره تلاش کنید.',
                duration: 3000,
                type: 'danger',
                position: "top"
            })
        });
    }
    checkMailExist = () => {
        if (!this.state.email) {
            Toast.show({
                text: 'ایمیل وارد نشده.',
                duration: 3000,
                type: 'danger',
                position: "top"
            })
            return;
        }
        this.setState({ inProgress: true });
        Api.token = 'zxifRURSYqF75LYS15yS1Djvovar8tqGzGKDeM559AmcVE8joJWEh2Duz6mITP6V';
        this.props.fetchPagedList('members', null, { email: this.state.email })
            .then((list) => {
                if (list[0])
                    this.changePass(list[0]);
                else {
                    this.setState({ inProgress: false });
                    Toast.show({
                        text: 'چنین ایمیلی در سیستم ثبت نشده است، لطفا ایمیل خود را با دقت بیشتری ثبت کنید.',
                        duration: 3000,
                        type: 'danger',
                        position: "top"
                    })
                }

            }).catch(e => {
                this.setState({ inProgress: false });
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
                ref={(masterPage) => { this.masterPage = masterPage }}
                showMenu={true}
                footertabIndex={1}
                isList={true}
                showReturnBtn={true}
                showMenu={false}
                headerTransparent={false}
                showFooter={false}
                headerColor='#fff'
                title="هم راه"
                headerIconColor="#2a8892"
                headerItems={[
                    { text: 'هم راه',  },

                ]}
            >
                <ProgressBarPT text="در حال آماده سازی وارسال رمز" show={this.state.inProgress} />
                <View style={styles.container}>
                    <Text style={{ color: '#7f735f', alignSelf: 'center', padding: 10, fontFamily: 'iran_sans_bold' }}>بازیابی رمز عبور</Text>
                    <Text style={{ color: '#7f735f', alignSelf: 'center', padding: 10, fontFamily: 'iran_sans' }}>همکار محترم جهت بازیابی رمز عبور لطفا ایمیل سازمانی خود را وارد کنید</Text>
                    <TextInput style={styles.input} onChangeText={(email) => this.setState({ email })} placeholder="ایمیل سازمانی" underlineColorAndroid="transparent" />
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={this.checkMailExist}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>ارسال رمز موقت</Text>
                    </TouchableOpacity>
                </View>
            </MasterPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f4f3",
        flex: 1,
        paddingTop: 0,
        paddingTop: 150

    },


    input: {
        height: 40,
        color: '#7f735f',
        textAlign: 'right',
        backgroundColor: '#fff',
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
        fontFamily: 'iran_sans',
    },
    loginScreenButton: {
        marginTop: 25,
        width: 140,
        backgroundColor: '#7f735f',
        height: 37,
        alignSelf: 'center',
        borderRadius: 4,
        justifyContent: 'center'
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

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(PasswordRecovery);
