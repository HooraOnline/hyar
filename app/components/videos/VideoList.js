import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
} from "react-native";
import axios from 'axios';
import VideoDetail from './VideoDetail'
import Api from "../../lib/api";

class VideoList extends Component {
    // MOUNTING VIDEOS ARRAY ...
    constructor(props) {
        super(props);
        this.state = { videos: [] };
    }
    componentDidMount() {
        // DEBUGING MODE...
        //console.warn('componentDidMount was executed...');
        // MAKE AN AJAX REQUEST WITH AXIOS
       
        axios.get( 'http://185.88.154.168/api/Videos').then(r => this.setState({ videos: r.data }));
    }

    // HELPER METHOD FOR CREATING VIDEO LIST
    renderVideos(props) {
        return this.state.videos.map(video =>
            <VideoDetail
                key={video.id}
                video={video}
            />
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderVideos()}
            </ScrollView>
        );
    }
};

export default VideoList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    }
});