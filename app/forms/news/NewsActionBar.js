
import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row, Col,
    Grid
} from 'native-base';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import Like from '../../components/Form/Like';
import Comment from '../../components/Form/Comment';
import { Util } from '../../lib/util';
import { Actions } from 'react-native-router-flux';
import PersianDate from '../../components/tools/PersianDate';
import Seen from '../../components/Form/Seen';
import TextIcon from '../../components/tools/TextIcon';

class NewsActionBar extends Component {
    render() {
        if (!this.props.entity)
            return (<Text>متن خبر  موجود نیست.</Text>)
        return (
            <View style={{ margin: 8, flexDirection: 'row'}}>
                <Col style={{ width: 120, justifyContent: 'center' }} >
                    <PersianDate jsonDate={this.props.entity.udate} format='dateTime' style={{ backgroundColor: '#00ced1', textAlign: 'center', paddingHorizontal: 5, fontSize: 12, paddingTop: 1, height: 20, fontFamily: 'iran_sans', color: '#fff' }} />
                </Col>
                <Col style={{ flex: 1 }} >
                    <View style={{flex:1, flexDirection: 'row', height: 25, justifyContent: 'flex-start',marginHorizontal:20 }}>
                        <Seen style={{ marginRight: 10 }} color='#00ced1' seen={this.props.entity.seen} />
                         <Like apiPath="news" color='#00ced1' storeKey="currentEntity2" entity={this.props.entity} />
                        <TextIcon style={{ flex: 1,paddingTop:3 }} text={this.props.entity.commentNumber || 0} icon='md-chatbubbles' color='#00ced1' onPress={() => Actions.EntityComments({ entity: this.props.entity, apiPath: 'news', modelName: 'news',  entityMonitor: null })} />
                    </View>
                </Col>
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
}, mapDispatchToProps)(NewsActionBar);
