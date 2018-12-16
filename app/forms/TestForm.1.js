import React, { Component } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Button, Text,
    Icon,
    Row,
    Grid
} from 'native-base';
import ListLoader2 from '../components/Form/ListLoader2';
import Line from '../components/tools/Line';
import NewsViewer from './news/NewsViewer';
import Api from '../lib/api';
import { Util } from '../lib/util';
import ListLoader from '../components/Form/ListLoader';
import MasterPage from './MasterPage';

export default class TestForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    handleScroll = (e) => {

    }
    render() {
        return (
            <MasterPage
                ref={(masterPage) => { this.masterPage = masterPage }}
                showMenu={true}
                footertabIndex={1}
                isList={true}
                showReturnBtn={false}
                headerTransparent={this.state.headerTransparent}
                //scrollY={this.state.scrollY}
                footerStyle={{ backgroundColor: '#ffb623' }}
                title="اخبار"
                headerIconColor="#00ced1"
                headerItems={[
                    { text: 'اخبار', color: '#00ced1', },
                    {
                        icon: 'ios-arrow-round-back-outline', width: 30, color: '#00ced1',
                        onPress: () => { if (this.state.selectedEntity) Actions.NewsList(); else Actions.MainForm() }
                    },
                ]}

            >
                <ListLoader2
                    ref={(ref) => { this.list = ref; }}
                    sortbarStyle={{ backgroundColor: '#AAB7B8', height: 30 }}
                    sortbarItems={[{ text: 'تازه ترین اخبار', sort: 'id desc', selected: true }, { text: 'پربازدیدترین اخبار', sort: 'seen desc' }]}
                    apiPath='News'
                    title="اخبار"
                    headerIconColor="#00ced1"
                    onsort={() => { }}
                    onScroll={(scroolY, event) => {
                        // console.log(event.velocity.y)
                        // if (scroolY > 0 && this.state.viewerHeight == null && !this.state.selectedEntity)
                        //     this.setState({ viewerHeight: 0, headerTransparent: false });
                        // else if (scroolY < 10 && this.state.viewerHeight == 0 && !this.state.selectedEntity)
                        //     this.setState({ viewerHeight: null, headerTransparent: true });
                       
                        

                    }}
                    pageSize={20}
                    filter={{}}
                    reduxSelectedKey="currentEntity2"
                    sort="id desc"
                    itemHeight={100}
                    renderSelected={(entity) => <View  >
                        <NewsViewer entity={entity} />
                        <Line height={1} />
                    </View>
                    }
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

                        this.setState({ selectedEntity: entity, headerTransparent: false })

                    }}
                    onunSelect={(entity, row, form) => {
                        this.setState({ selectedEntity: null, headerTransparent: true });
                    }}
                />
            </MasterPage>
        );
    }
}

const styles = StyleSheet.create({

});