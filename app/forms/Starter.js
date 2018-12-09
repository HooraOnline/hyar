import React, { Component } from 'react';
import {
    Text, Container, Col, Icon,
} from 'native-base';
import { StyleSheet, NetInfo, I18nManager, ImageBackground ,TouchableOpacity} from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Util } from '../lib/util';
import { forms } from '../presentation';
import { ActionCreators } from '../aRedux';


I18nManager.forceRTL(true);
class Starter extends Component {
    constructor(props) {
        super(props)
        //I18nManager.forceRTL(true);
        this.state = { connected: -1, fontLoaded: false }
    }
    componentDidMount() {
        // try {
        //     I18nManager.forceRTL(true);
        //     I18nManager.allowRTL(true);
        //     I18nManager.isRTL = true;
        // } catch (e) {
        //     console.log(e);
        // }
    }
    componentWillMount() {
        //this.handelConectionChange(true);
       
        NetInfo.isConnected.addEventListener('connectionChange', this.handelConectionChange);


    }

    componentWillUnMount() {
        NetInfo.isConnected.RemoveEventListener('connectionChange', this.handelConectionChange);

    }

    handelConectionChange = (isConnected) => {
        this.setState({ connected: isConnected });
        if (isConnected) {
            // if (Actions._currentParams && Actions._currentParams.title != "Starter")
            //     Actions.Starter();
            // else
                this.startApplication();
        } else {
            Actions.CheckInternet();
        }
    }
    // startApplication() {

    //     let self = this;
    //     Util.getTokenFromStorage(function (userId, token) {
    //         self.props.fetchById('members', 'cUser', userId)
    //             .then((user) => Actions.MainForm(user))
    //             .catch((e) => Actions.Login());//Actions.EnterMobile()
    //     }, function (e) {
    //         Actions.Login();
    //         //Actions.EnterMobileForRegister();
    //     });
    // }
    render() {
        return (
            <Container style={{ backgroundColor: '#000', flex: 1,justifyContent:'center',alignItems:'center' }}>
              <TouchableOpacity activeOpacity={0.8} key={Math.random()} onPress={() => { if (this.props.cUser.id) Actions.MainForm(); }} style={[{ flex: 1, height: null, width:null, margin: this.props.margin || 0, }]}>
                <ImageBackground resizeMode="cover" source={require("../assets/splash.png")} style={{ flex: 1, height: 400, width: 400, borderWidth: 0, borderColor: '#000', borderRadius: 0 }}>
                    
                </ImageBackground>

            </TouchableOpacity>

            </Container>
            



        )
    }
}
const styles = StyleSheet.create({


});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(Starter);







