
import React, { Component } from 'react';
import {
    Text, Col, Row, Grid,

} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { I18nManager, StyleSheet, View, NetInfo, TouchableOpacity, ImageBackground,Linking } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../aRedux'
import Api from '../lib/api';
import { Album } from '../components/Album';
import { Tile } from '../components/Tile';
import { Util } from '../lib/util';
import MasterPage from './MasterPage';

class MainForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
            loginSuccess: false,
        }
    }
    getTileInfo = () => {
        if (this.props.disignInfo.length)
            return
        this.props.fetchList('albums')
            .then((disignInfo) => {
                let dInfo = {};
                for (let i = 0; i < disignInfo.length; ++i)
                    dInfo[disignInfo[i].key] = disignInfo[i];
                this.props.doDispatch('disignInfo', dInfo)
            })
    }
    componentDidMount() {
       
     
        this.getTileInfo();
    }

    componentWillMount() {
        if (!this.props.cUser.id) {
            this.startApplication();
            NetInfo.isConnected.addEventListener('connectionChange', this.handelConectionChange);
        }
    }

    componentWillUnMount() {
        if (!this.props.cUser.id) {
            NetInfo.isConnected.RemoveEventListener('connectionChange', this.handelConectionChange);
        }
    }

    handelConectionChange = (isConnected) => {
        this.setState({ connected: isConnected });
        if (isConnected)
            this.startApplication();
        else
            Actions.CheckInternet();
    }
    startApplication() {
        let self = this;
        Util.getTokenFromStorage(function (userId, token) {
            self.props.fetchById('members', 'cUser', userId)
                .then((user) => {
                    self.setState({ loginSuccess: true })
                })
                .catch((e) => {
                    //Actions.EnterMobile()
                    Actions.Login({});
                });
        }, function (e) {
            if (!self.props.cUser.id)
                Actions.Login();
        });
    }
    render() {
        if (!this.props.cUser.id)
            return (<View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.8} key={Math.random()} onPress={() => { if (this.props.cUser.id) Actions.MainForm(); }} style={[{ flex: 1, height: null, width: null, margin: this.props.margin || 0, }]}>
                    <ImageBackground resizeMode="cover" source={require("../assets/splash.png")} style={{ flex: 1, height: 400, width: 400, borderWidth: 0, borderColor: '#000', borderRadius: 0 }}>

                    </ImageBackground>
                </TouchableOpacity>
            </View>)

        if (!this.props.disignInfo.videoPortal)
            return null;

        return (
            <MasterPage
                showMenu={true}
                footertabIndex={1}
                containerStyle={{ backgroundColor: '#f2f4f7', }}
                footerStyle={{ backgroundColor: '#fff' }}
                title="هم راه"
                headerItems={[
                    { text: 'هم راه', color: '#00ced1', },
                    { icon: 'ios-search-outline', width: 30, color: '#00ced1', onPress: () => { } },
                ]}
            >

                <Album height={Util.device.height / 3.5}
                    imageStyle={{ borderRadius: 6, }}
                    style={{ margin: 5 }}
                    opacity={0.9}
                    opacityColor='#f2f4f7'
                    items={[
                        { image: Api.getFilePath('design') + "banner2.png", onPress: () => {Linking.openURL('https://article.tebyan.net/224343/%D8%B2%D9%86%D8%AF%DA%AF%DB%8C-%D8%B3%D8%A7%D9%84%D9%85-%D8%A8%D8%A7-%D8%AA%D8%BA%D8%B0%DB%8C%D9%87-%D8%B3%D8%A7%D9%84%D9%85');} },
                        // { image: Api.fileContainer + "monitor/download/asreertebat_01-03-2018-1514932363.jpg" },
                        // {  image: Api.fileContainer + "monitor/download/710064_267.jpg", },

                    ]} />

                <View style={{ marginTop: 0, marginBottom: 2, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Tile vertical height={Util.device.height / 3.5} margin={0} cols={[{
                            image: Api.getFilePath('design') + this.props.disignInfo.videoPortal.image, flex: 1, badge: this.props.cUser.unseenVideo, onPress: () => { Actions.VideoList() },
                            content: <View style={{ flexDirection: 'column', height: '100%' }} >
                                <View style={{ flex: 8, }} >

                                </View>
                                <View style={{ flex: 1.3, }} >
                                    <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, textAlign: 'center' }}>{this.props.disignInfo.videoPortal.title}</Text>
                                </View>
                            </View>
                        }]} style={{}}></Tile>
                        <Tile vertical height={Util.device.height / 3.5} margin={0} cols={[{
                            image: Api.getFilePath('design') +  this.props.disignInfo.mainFormsalamati.image, flex: 1, onPress: () => { Actions.MedicalTests() },
                            content: <Row style={{ height: '160%' }} >
                                <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
                                    <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>{this.props.disignInfo.mainFormsalamati.title}</Text>
                                </Col>
                                <Col style={{ flex: 1, }} >

                                </Col>
                            </Row>
                        }, {
                            title: 'اخبار', titleStyle: { color: '#fff', paddingTop: 30, textAlign: 'left', padding: 30 }, image: Api.getFilePath('design') + this.props.disignInfo.newsMainPage.image, badge: this.props.cUser.unseenNews, flex: 1, onPress: () => Actions.NewsList(),
                            content: <Row style={{ height: '160%' }} >
                                <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
                                    <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>{this.props.disignInfo.newsMainPage.title}</Text>
                                </Col>
                                <Col style={{ flex: 1, }} >

                                </Col>
                            </Row>
                        }]} style={{}}></Tile>
                    </View>
                    <Tile vertical height={Util.device.height / 6} margin={0} cols={[{
                        image: Api.getFilePath('design') + this.props.disignInfo.kmMainPage.image, flex: 1, badge: 10,
                        content: <Row style={{ height: '160%' }} >
                            <Col style={{ flex: 1, }} >

                            </Col>
                            <Col style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }} >
                                <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>{this.props.disignInfo.kmMainPage.title}</Text>
                                <Text style={{ color: '#fff', fontFamily: 'iran_sans', fontSize: 16, alignSelf: 'center' }}>  امتیاز من: 243</Text>
                                <Text style={{ color: '#fff', fontFamily: 'iran_sans', fontSize: 16, alignSelf: 'center' }}>نفر اول: 485</Text>
                            </Col>
                        </Row>
                    }]} style={{}}></Tile>
                    <View style={{ flexDirection: 'row', }}>
                        <Tile vertical height={Util.device.height / 4} margin={0} cols={[{
                            image: Api.getFilePath('design') +this.props.disignInfo.yadgiriMainPage.image , flex: 1,
                            content: <Row style={{ height: '160%' }} >
                                <Col style={{ flex: 15, alignItems: 'center', justifyContent: 'center', }} >
                                    <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>{this.props.disignInfo.yadgiriMainPage.title}</Text>
                                </Col>
                                <Col style={{ flex: 0.5, }} >

                                </Col>
                            </Row>
                        }, {
                            image: Api.getFilePath('design') + this.props.disignInfo.etelaeiehMainPage.image, flex: 1,

                            content: <Row style={{ height: '160%' }} >
                                <Col style={{ flex: 1, }} >

                                </Col>
                                <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
                                    <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>{ this.props.disignInfo.etelaeiehMainPage.title}</Text>
                                </Col>

                            </Row>
                        }]} style={{}}></Tile>
                        <Tile vertical height={Util.device.height / 4} margin={0} cols={[{
                            image: Api.getFilePath('design') +  this.props.disignInfo.mosharekatMainPage.image, flex: 1,
                            content: <Grid style={{ height: '100%' }} >
                                <Row style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, textAlign: 'center' }}>{ this.props.disignInfo.mosharekatMainPage.title}</Text>
                                </Row>
                                <Row style={{ flex: 1, }} >

                                </Row>
                            </Grid>
                        }]} style={{}}></Tile>
                    </View>
                    <Tile vertical height={Util.device.height / 6} margin={0} cols={[{
                        image: Api.getFilePath('design') + this.props.disignInfo.foodMainPage.image, flex: 1,
                        content: <Row style={{ height: '160%' }} >
                            <Col style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }} >
                                <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>{ this.props.disignInfo.foodMainPage.title}</Text>
                                <Text style={{ color: '#fff', fontFamily: 'iran_sans', fontSize: 16, alignSelf: 'center' }}> اعتبار من: 2,100,000 ریال</Text>
                            </Col>
                            <Col style={{ flex: 1, }} >

                            </Col>
                        </Row>
                    }]} flex={1} style={{}}></Tile>
                </View>
            </MasterPage>
        )
    }
}
const styles = StyleSheet.create({
    col: {
        alignItems: 'center',
        padding: 1,
        marginHorizontal: 3,
        paddingBottom: 3,
        paddingTop: 4,
        borderRadius: 0,
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
        disignInfo: state.disignInfo,

    }
}, mapDispatchToProps)(MainForm);
