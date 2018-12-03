import React, { Component } from 'react';
import {
  Button, Row, Col, Icon, Text, Grid, Input, Item


} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, ActivityIndicator, Dimensions, } from 'react-native';
import Api from '../lib/api';
import { Util } from '../lib/util';
import { ActionCreators } from '../aRedux';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
//import Video from 'react-native-video';

class VideoManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      videoPath: this.getInitPath(),
      envidenceVideo: null,
      play: 0,
      currentPosition: 10,
    }
  }
  getInitPath = () => {
    if (this.props.entity[this.props.videoField])
      return Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.entity[this.props.videoField];
    if (this.props.noVideo)
      return Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.noVideo;
    return Api.fileContainer + "public/download/no-image-icon.png"
  }
  componentDidMount() {
    // this.player.presentFullscreenPlayer()
  }
  render() {
    return (
      <Grid onPress2={() => { if (this.props.editable) Actions.VideoUploader({ uploadFolder: this.props.uploadFolder, videoPath: Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.entity[this.props.videoField], onsuccess: (uplodedVideoName) => { this.props.entity[this.props.videoField] = uplodedVideoName; this.props.updateEntity(this.props.apiPath, this.props.entity, this.props.storeKey) } }) }}>
        <Row style={{ backgroundColor: '#efefef', alignItems: 'center', justifyContent: "center" }} >
          <Item style={{ flex: 1, }}>
            <Icon style={{ margin: 10, fontSize: 40 }} name="md-paw" onPress={() => this.setState({ currentPosition: this.state.currentPosition - 1 })} />
          </Item>
        </Row>
        <Row>
          {/* <Video
            ref={(ref) => { this.video = ref; }}
            style={{ width: this.props.width || Util.device.width, height: this.props.height || Util.device.height, }}
            source={{ uri: Api.apihost+"containers/profile/download/153071571607142700.mp4" }}
            //paused={true}
            //poster="https://baconmockup.com/300/200/"
            //posterResizeMode="stretch"
            rate={this.state.play}
            resizeMode="cover"
            autoPlay={false}
            currentPosition={Number(this.state.currentPosition)}
            paused={false}
            repeat={true}
            shouldPlay={false}
            isMuted={false}
            volume={0}
            muted={false}
            playInBackground={false}
            playWhenInactive={false}
            progressUpdateInterval={250.0}
            onLoad={() => this.setState({ onBuffer: false })}
            onError={() => this.setState({ onBuffer: true })}
          /> */}
        </Row>
        <Row style={{ backgroundColor: '#efefef', alignItems: 'center', justifyContent: "center" }} >
          <Icon style={{ margin: 10, fontSize: 40 }} name={this.state.play == 0 ? "md-play" : "md-pause"} onPress={() => this.setState({ play: this.state.play == 0 ? 1 : 0 })} />
        </Row>
      </Grid>


    )

  }

}

const styles = StyleSheet.create({
  container: {

  },
 


});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state, props) => {
  console.log(props)
  return {
    entity: state[props.storeKey],
  }
}, mapDispatchToProps)(VideoManager);