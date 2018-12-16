import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row,
    Grid
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import MasterPage from "../MasterPage";
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import { Album } from '../../components/Album';
import ListLoader from '../../components/Form/ListLoader';
import NewsViewer from './NewsViewer';
import Like from '../../components/Form/Like';
import { Util } from '../../lib/util';


class NewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
            topNews: [],
            viewerHeight: null,
            headerTransparent: true,
            monitorHight: 250
        };
    }
    loadTopNewsData = () => {
        let apiPath = this.props.apiPath;
        let topNews = [];
        return this.props.fetchPagedList('news', null, { isTop: true }, "id asc").then(nList => {
            for (let i = 0; i < nList.length; ++i)
                topNews.push({
                    image: Api.getFilePath('news') + nList[i].image,
                    onPress: () => Actions.EntityComments({formTitle:'متن خبر', entity: nList[i] ,apiPath:'news',modelName:'news',headerColor:'#ffb623', entityMonitor:<NewsViewer entity={nList[i]} />}),
                    content: <Grid style={{ flex: 1 }} >
                        <Row style={{}} >
                            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 1, margin: 15 }}>
                                <Text style={{ fontFamily: 'iran_sans_bold', fontSize: 15, color: '#fff', padding: 5 }} >{nList[i].title}</Text>
                                <Text style={{ fontFamily: 'iran_sans', fontSize: 17, color: '#fff' }}>{nList[i].desc.substring(0,50)+'...'}</Text>
                            </View>
                        </Row>
                    </Grid>
                });
            this.setState({ topNews });
        }).catch(e => {
            this.setState({ inProgress: false, });
        });
    }
    componentWillMount() {
        this.loadTopNewsData();
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
                headerColor='#ffb623'
                //scrollY={this.state.scrollY}
                footerStyle={{ backgroundColor: '#ffb623' }}
                title="اخبار"
                headerIconColor="#fff"
                headerItems={[
                    { text: 'اخبار', color: '#fff', },
                    {
                        icon: 'ios-arrow-round-back-outline', width: 30, color: '#fff',
                        onPress: () => { Actions.pop() }
                    },
                ]}
            >
                <ListLoader
                    ref={(ref) => { this.list = ref; }}
                    sortbarStyle={{ backgroundColor: '#AAB7B8', height: 30 }}
                    sortbarItems={[{ text: 'تازه ترین اخبار', sort: 'id desc', selected: true }, { text: 'پربازدیدترین اخبار', sort: 'seen desc' }]}
                    apiPath='news/list'
                    title="اخبار"
                    monitorHight={this.state.monitorHight}
                    headerColor='#ffb623'
                    headerIconColor="#00ced1"
                    onsort={() => { }}
                    pageSize={5}
                    filter={{}}
                    reduxListKey='newsList'
                    reduxSelectedKey="currentEntity"
                    sort="id desc"
                    itemHeight={100}
                    renderMonitor={() => {
                        return  <Album opacity={0.5} height={this.state.monitorHight} items={this.state.topNews} />
                                   
                       
                    }}
                    renderItem={(entity) => <View>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 10, borderRadius: 3, alignItems: 'center', }} >
                            <Image style={{ borderRadius: 4, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri:  entity.image }} />
                            <View style={{ flex: 1, }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#000' }}>{entity.udate?new Date(entity.udate).toPersionDate('dateTime'):''} </Text>
                                <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#000', fontFamily: 'iran_sans_bold' }}>{entity.title.substring(0, 90)}</Text>
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#555', fontFamily: 'iran_sans' }}>{entity.desc.substring(0, 110)}</Text>
                                <View style={{ flexDirection: 'row', width: Util.device.width <100? '80%': '50%', marginTop: 10,marginHorizontal:15, }}>
                                    <Row style={{flex:1}} >
                                        <Like apiPath="news" storeKey="currentEntity2" entity={entity} showUserLike={false} viewMode={true}/> 
                                    </Row>
                                    <Row style={{flex:0.6}}>
                                        <Icon name="md-eye" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                                        <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E', }}>{entity.seen || 0}</Text>
                                    </Row>
                                    <Row style={{flex:1}}>
                                        <Icon name="md-chatbubbles" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                                        <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E',  }}>{entity.commentNumber || 0}</Text>
                                    </Row>
                                </View>
                            </View>
                        </View>

                    </View>
                    }
                    onSelect={(entity, row, form) => {
                        Actions.NewsMonitor({ monitorEntity: entity })
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
}, mapDispatchToProps)(NewsList);