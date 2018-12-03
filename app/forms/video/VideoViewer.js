
import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row, Col,
    Grid
} from 'native-base';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import Like from '../../components/Form/Like';
import Comment from '../../components/Form/Comment';
import { Util } from '../../lib/util';
import { Actions } from 'react-native-router-flux';
import PersianDate from '../../components/tools/PersianDate';
import VideoPlayerPlus from '../../components/tools/VideoPlayerPlus';
class VideoViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: props.entity,
            showComments: this.props.showComments || false
        }
    }
    addToseen = () => {
        if (!this.props.entity)
            return;
        this.props.entity.seen = this.props.entity.seen ? this.props.entity.seen + 1 : 1;
        if(this.props.entity && this.props.entity.id)
           this.props.updateEntity('videos', this.props.entity);
    }
    componentDidMount() {
        this.addToseen();
    }
    componentWillReceiveProps(props) {
        this.setState({ showComments: props.showComments })
    }
    render() {
        if (!this.props.entity)
            return (<Text> ویدئو  موجود نیست.</Text>)
        return (
            <View style={{ flex: 1, width: null, height: null}}>

                {/* <Image style={{ borderRadius: 0, resizeMode: 'cover', height: Util.device.height / 2.7, width: null, }} source={{ uri: Api.getFilePath('video') + this.props.entity.image }} /> */}
                <View style={{ flex: 1, height: Util.device.height / 2.7 }}>
                    <VideoPlayerPlus video={Api.getFilePath('video') + this.props.entity.videop} />
                </View>
         <View style={{height:10}}></View>
                <View style={{ flexDirection: 'row', }} >
                    <Image style={{ borderRadius: 4,marginHorizontal:10, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri: Api.getFilePath('video') + this.props.entity.image }} />
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#fff' }}>{new Date(this.props.entity.udate).toPersionDate('dateTime')} </Text>
                            <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#fff', fontFamily: 'iran_sans_bold' }}>{this.props.entity.title.substring(0, 90)}</Text>
                            <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#eee', fontFamily: 'iran_sans' }}>{this.props.entity.desc.substring(0, 110)}</Text>
                        </View>
                        <View style={{ margin: 8, flexDirection: 'row', }}>
                            <Col style={{}} >
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#fff', fontFamily: 'iran_sans' }}><Icon name='md-eye' style={{ color: '#fff', fontSize: 18 }} /> {this.props.entity.seen || 0}</Text>
                            </Col>
                            <Col style={{}} >
                                <Like apiPath="videos" color='#fff' storeKey="currentEntity2" entity={this.props.entity} />
                            </Col>
                            {/* <Col style={{}} onPress={() => { Actions.EntityComments({ entity: this.props.entity }) }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#fff', fontFamily: 'iran_sans' }}><Icon name='md-chatbubbles' style={{ color: '#fff', fontSize: 18 }} /> {this.props.entity.commentNumber || 0}</Text>
                            </Col> */}
                            <Col style={{}} >

                            </Col>
                            <Col style={{}} >

                            </Col>
                        </View>
                    </View>

                </View>

                {/* {
                    this.state.showComments &&
                    <Comment backgroundColor='#B3B6B7' style={{ marginTop: 10, }} contentStyle={{}} modelName='video' model={this.props.entity} entity2={this.props.entity} pageSize={10} />
                } */}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    col: {
        alignItems: 'center',

    },

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(VideoViewer);
