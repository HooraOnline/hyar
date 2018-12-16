
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
import NewsActionBar from './NewsActionBar';


class NewsViewer extends Component {
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
        if (this.props.updateEntity)
            this.props.updateEntity('news', this.props.entity);
    }
    componentDidMount() {
        this.addToseen();
    }
    componentWillReceiveProps(props) {
        this.setState({ showComments: props.showComments })
    }
    render() {
        if (!this.props.entity) 
            return null;
        return (

            <View style={{ backgroundColor: '#fff' }} >
                <View style={{}}>
                    <Image style={{ borderRadius: 0, resizeMode: 'cover', height: Util.device.height / 2.7, width: null, }} source={{ uri: Api.getFilePath('news') + this.props.entity.image }} />
                </View>
                <View style={{ margin: 10, }}>
                    <View style={{ margin: 5, flexDirection: 'row' }}>
                        <View style={{ width: 40 }}>
                            <Icon name='ios-arrow-back-outline' style={{ color: '#ffb623', fontSize: 20 }} ></Icon>
                        </View>
                        <Text style={{ fontFamily: 'iran_sans_bold', fontSize: 12, paddingHorizontal: 6, color: '#ffb623', textAlign: "justify" }} >{this.props.entity.title}</Text>

                        <View>
                        </View>
                    </View>
                    {
                        this.props.shortText ?
                            <TouchableOpacity style={{}} onPress={() => { Actions.EntityComments({formTitle:'متن خبر', entity: this.props.entity, apiPath: 'news', modelName: 'news', entityMonitor: <NewsViewer entity={this.props.entity} /> }) }}>
                                <Text style={{ fontFamily: 'iran_sans', fontSize: 15, paddingHorizontal: 12,textAlign:'justify' }}>{this.props.entity.text.substring(0, 150) + '...   '}<Text style={{ fontFamily: 'iran_sans', fontSize: 18, paddingHorizontal: 12, color: 'red' }}>ادامه خبر</Text></Text>
                            </TouchableOpacity> : <Text style={{ fontFamily: 'iran_sans', fontSize: 15, paddingHorizontal: 12, }}>{this.props.entity.text}</Text>
                           
                    }
                </View>
                <NewsActionBar entity={this.props.entity} />
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
}, mapDispatchToProps)(NewsViewer);
