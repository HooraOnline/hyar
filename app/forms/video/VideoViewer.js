
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
import { Util } from '../../lib/util';
import { Actions } from 'react-native-router-flux';
import { Video } from 'expo';
import TextIcon from '../../components/tools/TextIcon';
import VideoItem from './VideoItem';
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
        if (this.props.entity && this.props.entity.id && this.props.updateEntity)
            this.props.updateEntity('videos', this.props.entity);
    }
    componentWillUnmount() {

        this.videoRef.pauseAsync();
    }


    componentWillReceiveProps(props) {
        this.setState({ showComments: props.showComments })
    }
    componentDidMount() {
        this.addToseen();
        //Expo.ScreenOrientation.allow(this.state.screen);
        //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
        //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    }
    render() {
        if (!this.props.entity)
            return (<Text> ویدئو  موجود نیست.</Text>)
        return (
            <View style={{ flex: 1, width: null, height: null, backgroundColor: '#000' }}>
                <Video
                    source={{ uri: Api.getFilePath('video') + this.props.entity.videop }}
                    rate={this.state.rate || 1.0}
                    ref={(ref) => { this.videoRef = ref; }}
                    volume={this.state.volume || 1.0}
                    isMuted={this.state.isMuted || false}
                    resizeMode="contain"
                    shouldPlay={this.state.shouldPlay || true}
                    useNativeControls
                    isLooping={this.state.isLooping || true}
                    style={{ flex: 1, width: null, height: 300, marginTop: 10, backgroundColor: '#000' }}
                    onFullscreenUpdate={(e) => {
                        if (e.fullscreenUpdate == 0)
                            Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
                        if (e.fullscreenUpdate == 2)
                            Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
                    }}
                />
                <View style={{ height: 10 }}></View>
                <VideoItem entity={this.props.entity} />
                <View style={{ height: 10 }}></View>
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
