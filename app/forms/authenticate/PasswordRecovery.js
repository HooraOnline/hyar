import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { ActionCreators } from '../../aRedux';
import { bindActionCreators } from 'redux';
import MasterPage from '../MasterPage';



class PasswordRecovery extends React.Component {
    sendPassword=()=>{
       // this.props.callApi('sendEmail',)
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
                title="همراه یار"
                headerIconColor="#00ced1"
                headerItems={[
                    { text: 'همراه یار', color: '#00ced1', },
                  
                ]}
            >
                <View style={styles.container}>
                    <Text style={{ color: '#7f735f',alignSelf:'center',padding:10,fontFamily:'iran_sans_bold'}}>بازیابی رمز عبور</Text>
                    <Text style={{ color: '#7f735f',alignSelf:'center',padding:10,fontFamily:'iran_sans'}}>همکار محترم جهت بازیابی رمز عبور لطفا ایمیل سازمانی خود را وارد کنید</Text>
                    <TextInput style={styles.input} onChangeText={(email) => this.setState({ email })}  placeholder="ایمیل سازمانی" underlineColorAndroid="transparent" />
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={this.sendPassword}
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
        paddingTop:0,
        paddingTop:150
       
    },
  
   
    input: {
        height: 40,
        color: '#7f735f',
        textAlign: 'right',
        backgroundColor: '#fff',
        marginRight: 20,
        marginLeft: 20,
        padding:10,
        fontFamily: 'iran_sans',
    },
    loginScreenButton: {
        marginTop: 25,
       width:140,
        backgroundColor: '#7f735f',
        height: 37,
        alignSelf:'center',
        borderRadius:4,
        justifyContent:'center'
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