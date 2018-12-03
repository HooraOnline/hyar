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
                    onPress: () => Actions.EntityComments({ entity: nList[i] }),
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
                //scrollY={this.state.scrollY}
                footerStyle={{ backgroundColor: '#ffb623' }}
                title="اخبار"
                headerIconColor="#00ced1"
                headerItems={[
                    { text: 'اخبار', color: '#00ced1', },
                    {
                        icon: 'ios-arrow-round-back-outline', width: 30, color: '#00ced1',
                        onPress: () => { Actions.pop() }
                    },
                ]}
            >
                <ListLoader
                    ref={(ref) => { this.list = ref; }}
                    sortbarStyle={{ backgroundColor: '#AAB7B8', height: 50 }}
                    sortbarItems={[{ text: 'تازه ترین اخبار', sort: 'id desc', selected: true }, { text: 'پربازدیدترین اخبار', sort: 'seen desc' }]}
                    apiPath='News'
                    title="اخبار"
                    monitorHight={this.state.monitorHight}
                    headerIconColor="#00ced1"
                    headerColor='#fff'
                    onsort={() => { }}
                    onScroll={(scroolY, event) => {
                        // console.log(event.velocity.y)
                    }}
                    pageSize={7}
                    filter={{}}
                    rKey="currentEntity"
                    sort="id desc"
                    itemHeight={100}
                    renderMonitor={() => {
                        return  <Album opacity={0.5} height={this.state.monitorHight} items={this.state.topNews} />
                                   
                       
                    }}
                    renderItem={(entity) => <View>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 10, borderRadius: 3, alignItems: 'center', }} >
                            <Image style={{ borderRadius: 4, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri: Api.getFilePath('news') + entity.image }} />
                            <View style={{ flex: 1, }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#000' }}>{new Date(entity.udate).toPersionDate('dateTime')} </Text>
                                <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#000', fontFamily: 'iran_sans_bold' }}>{entity.title.substring(0, 90)}</Text>
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#555', fontFamily: 'iran_sans' }}>{entity.desc.substring(0, 110)}</Text>
                                <View style={{ flexDirection: 'row', width: '90%', marginTop: 10 }}>
                                    <Row style={{}} >
                                        <Icon name="md-thumbs-up" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                                        <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E', paddingHorizontal: 5 }}>{entity.like || 0}</Text>
                                    </Row>
                                    <Row style={{}}>
                                        <Icon name="md-eye" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                                        <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E', paddingHorizontal: 5 }}>{entity.seen || 0}</Text>
                                    </Row>
                                    <Row style={{}}>
                                        <Icon name="md-chatbubbles" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                                        <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E', paddingHorizontal: 5 }}>{entity.commentNumber || 0}</Text>
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