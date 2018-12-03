import React, { Component } from 'react';
import {
  Button, Row, Col, Icon, Text, Grid, Input, Item


} from 'native-base';

import { View, StyleSheet, ActivityIndicator, Dimensions, } from 'react-native';

import { ActionCreators } from '../aRedux';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
//import VideoPlayer from 'react-native-video-player';
//import Video from 'react-native-af-video-player'
const VIMEO_ID = '179859217';

class VideoPlayerr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      envidenceVideo: null,
      play: 0,
      currentPosition: 10,
      video: { width: undefined, height: undefined, duration: undefined },
      thumbnailUrl: undefined,
      videoUrl: undefined,

    }
  }
  componentDidMount() {

  }
  componentDidMount() {
    global.fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then(res => res.json())
      .then(res => this.setState({
        thumbnailUrl: res.video.thumbs['640'],
        videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
        video: res.video,
      }));
  }
  render() {
    return (
      <Grid>
        <View>
        {/* <Video url='https://view.vzaar.com/12543158/video' /> */}
          {/*  <Text style={{ fontSize: 22, marginTop: 22 }}>React Native Video Player</Text>
         <VideoPlayer
            endWithThumbnail
            // thumbnail={{ uri: this.state.thumbnailUrl }}
            // video={{ uri: this.state.videoUrl }}
            thumbnail={{ uri: 'https://i.vimeocdn.com/video/587891969_640.jpg' }}
            video={{ uri: "https://view.vzaar.com/12543158/video" }}
            videoWidth={this.state.video.width}
            videoHeight={this.state.video.height}
            duration={this.state.video.duration/* I'm using a hls stream here, react-native-video
            can't figure out the length, so I pass it here from the vimeo config 
          disableControlsAutoHide={true}
          disableFullscreen={false}
          fullScreenOnLongPress={true}
          ref={r => this.player = r}
          /> */}
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button onPress={() => this.player.stop()} style={{ margin:5 }}  >
              <Text>Stop</Text>
            </Button>
            <Button onPress={() => this.player.pause()} style={{ margin:5 }} >
              <Text>Pause</Text>
            </Button>
            <Button onPress={() => this.player.resume()} style={{ margin:5 }} >
              <Text>Resume</Text>
            </Button>
          </View> */}
        </View>
        <Row style={{ backgroundColor: '#efefef', alignItems: 'center', justifyContent: "center" }} >
          <Item style={{ flex: 1, }}>
            <Icon style={{ margin: 10, fontSize: 40 }} name="md-paw" onPress={() => this.setState({ currentPosition: this.state.currentPosition - 1 })} />
          </Item>
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
}, mapDispatchToProps)(VideoPlayerr);