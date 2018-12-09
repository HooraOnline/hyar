
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import { Video } from 'expo';

class VideoPlayerPlus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullScreen: this.props.fullScreen || false
        }
    }
    componentWillUnmount() {
        // Expo.ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    }
    render() {
        return (
          

                <Video
                    source={{ uri: this.props.video }}
                    rate={this.props.rate || 1.0}
                    volume={this.props.volume || 1.0}
                    isMuted={this.props.isMuted || false}
                    resizeMode="contain"
                    shouldPlay={this.state.shouldPlay || true}
                    useNativeControls
                    isLooping={this.props.isLooping || false}
                    style={[{ flex: 1, width: null, height: 300, marginTop: 10, backgroundColor: '#000' }, this.props.videoStyle]}
                    onFullscreenUpdate={(e) => {
                        //    if(this.state.fullScreen){
                        //         Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE)

                        //         this.state.fullScreen=false
                        //    }else{
                        //         Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT)
                        //         this.state.fullScreen=true;
                        //    }

                    }}
                />
               
           
        );
    }
};
export default VideoPlayerPlus;
const styles = StyleSheet.create({

});