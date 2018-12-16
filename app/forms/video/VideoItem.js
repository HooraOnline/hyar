
import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row, Col,
    Grid
} from 'native-base';
import { Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import Like from '../../components/Form/Like';
import { Actions } from 'react-native-router-flux';
import TextIcon from '../../components/tools/TextIcon';
import Seen from '../../components/Form/Seen';
class VideoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: props.entity,
            showComments: this.props.showComments || false
        }
    }
    render() {
        if (!this.props.entity)
            return (<Text> ویدئو  موجود نیست.</Text>)
        return (
            <Row style={{ height: 100 }} >
                <Col style={{ width: 120 }}>
                    <Image style={{ borderRadius: 4, marginHorizontal: 10, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri: Api.getFilePath('video') + this.props.entity.image }} />
                </Col>
                <Col style={{}}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                        <View style={{ paddingBottom: 5, }}>
                            <Text style={{ fontSize: 11, fontFamily: 'iran_sans', color: '#fff' }}>{new Date(this.props.entity.udate).toPersionDate('dateTime')} </Text>
                            <Text style={{ fontSize: 10, color: '#fff', fontFamily: 'iran_sans_bold' }}>{this.props.entity.title.substring(0, 90)}</Text>
                            <Text style={{ fontSize: 12, color: '#eee', fontFamily: 'iran_sans' }}>{this.props.entity.desc.substring(0, 110)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 25, justifyContent: 'flex-start', }}>
                            <Seen style={{marginRight:10}} color='#fff' seen={this.props.entity.seen} ></Seen>
                            <Like style={{}} apiPath="videos" color='#fff' storeKey="currentEntity2" entity={this.props.entity} />
                            <TextIcon style={{flex:1,paddingTop:3}} text={this.props.entity.commentNumber || 0} icon='md-chatbubbles' color='#fff' onPress={() => {Actions.pop(); Actions.EntityComments({ entity: this.props.entity, apiPath: 'videos', modelName: 'videos', entityMonitor: null }) }} />
                        </View>
                    </View>
                </Col>
            </Row>
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
}, mapDispatchToProps)(VideoItem);
