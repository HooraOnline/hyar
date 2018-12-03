import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row,
    Grid,
    Col
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import MasterPage from "../MasterPage";
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import { Album } from '../../components/Album';
import ListLoader from '../../components/Form/ListLoader';
import Like from '../../components/Form/Like';
import Seen from '../../components/Form/Seen';
import TextIcon from '../../components/tools/TextIcon';


class VideoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
            topVideo: [],
            viewerHeight: null,
            headerTransparent: true,
            monitorHight: 250
        };
    }
    loadTopVideoData = () => {
        let apiPath = this.props.apiPath;
        let topVideo = [];
        return this.props.fetchPagedList('videos', null, { isTop: true }, "id asc").then(nList => {
            for (let i = 0; i < nList.length; ++i)
                topVideo.push({
                    image: Api.getFilePath('video') + nList[i].image,
                     onPress: () => {  Actions.VideoMonitor({ monitorEntity: nList[i] })},
                    content: <Grid style={{ flex: 1 }} >
                        <Row style={{}} >
                            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 1, margin: 15 }}>
                                <Text style={{ fontFamily: 'iran_sans_bold', fontSize: 15, color: '#fff', padding: 5 }} >{nList[i].title}</Text>
                                <Text style={{ fontFamily: 'iran_sans', fontSize: 17, color: '#fff' }}>{nList[i].desc.substring(0,50)+'...'}</Text>
                            </View>
                        </Row>
                    </Grid>
                });
            this.setState({ topVideo });
        }).catch(e => {
            this.setState({ inProgress: false, });
        });
    }
    componentWillMount() {
        this.loadTopVideoData();
    }
    render() {
        return (
            <MasterPage
                ref={(masterPage) => { this.masterPage = masterPage }}
                showMenu={true}
                footertabIndex={1}
                isList={true}
                showReturnBtn={false}
                headerTransparent={true}
                headerColor='#000'
                footerStyle={{ backgroundColor: '#333333' }}
                footerIconColor='#fff'
                containerStyle={{ backgroundColor: '#000' }}
                title="ویدئو"
                headerIconColor="#00ced1"
                headerItems={[
                    { text: 'ویدئو', color: '#00ced1', },
                    {
                        icon: 'ios-arrow-round-back-outline', width: 30, color: '#00ced1',
                        onPress: () => { Actions.pop()}
                    },
                ]}
            >
                <ListLoader
                    ref={(ref) => { this.list = ref; }}
                    filterbarItems={[
                        { text: 'اخبار داخلی', field: 'videoGroup', value: '01' },
                        { text: 'رویدادها', field: 'videoGroup', value: '02' },
                        { text: 'فرهنگ و ارزشها', field: 'videoGroup', value: '03' },
                        { text: 'آموزشی', field: 'videoGroup', value: '04' },
                        { text: 'طنز', field: 'videoGroup', value: '05' },
                        { text: 'حاشیه', field: 'videoGroup', value: '06' },
                        { text: 'هنر', field: 'videoGroup', value: '07' },
                        { text: 'کتابخوانی', field: 'videoGroup', value: '08' },
                        { text: 'مسابقات', field: 'videoGroup', value: '09' },]}
                    filterbarStyle={{ backgroundColor: '#000', height: 50 }}
                    filterbartextStyle={{ color: '#fff' }}
                    apiPath='Videos'
                    title="ویدئو"
                    monitorHight={this.state.monitorHight}
                    headerIconColor="#00ced1"
                    headerColor='#000'
                    onsort={() => { }}
                    style={{ backgroundColor: '#000' }}
                    seperatorColor='#000'
                    onScroll={(scroolY, event) => {
                        // console.log(event.velocity.y)
                    }}
                    pageSize={7}
                    filter={{}}
                    rKey="currentEntity"
                    sort="id desc"
                    itemHeight={200}
                    renderMonitor={() => {
                        return <Album opacity={0.4} height={this.state.monitorHight} items={this.state.topVideo} />
                    }}
                    renderItem={(entity) => <View style={{ backgroundColor: '#000' }}>
                        <ImageBackground imageStyle={{ borderRadius: 0 }} opacity={0.9} resizeMode="cover" source={{ uri: Api.getFilePath('video') + entity.image }} style={{ backgroundColor: "#000", flex: 1, height: 200, width: null, }}>
                            <Grid style={{ flex: 1, }}>
                                <Row style={{ height: 30, margin: 10 }} >
                                    <Col style={{ width: 80 }} >
                                     
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                    </Col>
                                    <Col style={{ width: 80 }} >
                                        <Like apiPath="videos" entity={entity} viewMode={true} color='#fff' />
                                    </Col>
                                </Row>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} onPress={() => {
                                        Actions.VideoMonitor({ monitorEntity: entity })
                                    }}>
                                    <Image style={{ resizeMode: 'contain', alignSelf: "center", height: 60 }}  source={require('../../assets/playSign.png')} />
                                </Row>
                                <Row style={{ height: 20, margin: 10 }} >
                                    <Col style={{ width: 80, alignItems: 'center' }}>
                                        <Seen color='#fff' seen={entity.seen} />
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                    </Col>
                                    <Col style={{ width: 80 }} >
                                        <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{entity.time || '00:00'}</Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </ImageBackground>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 10, borderRadius: 3, alignItems: 'center', }} >
                            <View style={{ flex: 1, }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#000' }}>{new Date(entity.udate).toPersionDate('dateTime')} </Text>
                                <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#fff', fontFamily: 'iran_sans_bold' }}>{entity.title.substring(0, 90)}</Text>
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#a0a0a0', fontFamily: 'iran_sans' }}>{entity.desc.substring(0, 60)}</Text>
                            </View>
                            <Icon name={"md-more"} style={{ fontSize: 20, color: '#fff', width: 30, }} ></Icon>
                        </View>

                    </View>
                    }
                    onSelect={(entity, row, form) => {
                        //Actions.VideoMonitor({ monitorEntity: entity })
                    }}

                />

            </MasterPage>
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
}, mapDispatchToProps)(VideoList);