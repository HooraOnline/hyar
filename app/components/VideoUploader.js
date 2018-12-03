import React, { Component } from 'react';
import {
  Container, Content, Header, Text, Button,
  Icon, Toast, Footer, FooterTab

} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, ActivityIndicator, Dimensions, } from 'react-native';
//import ImagePicker from 'react-native-image-crop-picker';
import { create } from 'apisauce'
import * as Progress from 'react-native-progress';
//import Image from 'react-native-image-progress';
import Api from '../lib/api';
import { Util } from '../lib/util';
import ProgressBar from 'react-native-progress/Bar';



export default class VideoUploader extends Component {
  constructor(props) {
    super(props)
    console.log(this)
    this.state = {
      progress: 0,
     // videoLocalPath: this.props.imagePath?Api.fileContainer+this.props.uploadFolder+"/download/"+this.props.imagePath: Api.fileContainer+ "public/download/no-image-icon.png",
      videoLocalPath:Api.fileContainer+ "public/download/no-image-icon.png",
      envidenceVideo: null,
      num: 0,
      selected: [],

    }
  }
  openVideoPicker = () => {
    // ImagePicker.openPicker({
    //   mediaType: "video",
    // }).then((video) => {
    //   console.log(video);
    //   this.setState({ envidenceVideo: video, videoLocalPath: video.path });
    // });
  }
  openCamera = () => {
    // ImagePicker.openCamera({
    //   mediaType: "video",
    // }).then((video) => {
    //   console.log(video);
    //   this.setState({ envidenceVideo: video, videoLocalPath: video.path });
    // });
  }
  uploadImage = () => {
    
    if (!this.state.envidenceVideo) {
      Toast.show({
        text: "هیچ تصویری انتخاب نشده.",
        duration: 2000,
        type: 'danger',
        position: 'top',
      })
      return;
    }
    let file = this.state.envidenceVideo
    this.setState({ isLoading: true, loadingText: "در حال آپلود تصویر ..." });
    var fileData = new FormData();
    let fileName = Math.floor((Math.random() * 1000000000000000000) + 1).toString() + ".mp4";
    fileData.append('name', fileName);
    fileData.append('video', {
      uri: file.path,
      type: 'video/mp4',
      name: fileName,
    });
    const api = create({
      baseURL: Api.apiAddress,
    })
    api.post('containers/'+this.props.uploadFolder+'/upload', fileData, {
      onUploadProgress: (e) => {
        console.log(e)
        console.log(4444)
        const progress = e.loaded / e.total;
        if (progress == 1) {
          console.log(5555)
          this.setState({ loadingText: "در حال ارسال اطلاعات به فروشنده ..." });
          console.log(fileName)
          if (this.props.onsuccess)
            this.props.onsuccess(fileName)
           Actions.pop();
        }
      }
    }).then((res) => {
      console.log(res)
      if (this.props.onerror)
        this.props.onerror(res)
    })
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#fff", }}>
        <Header style={{ backgroundColor: "#D5D8DC" }} >
          <View style={{ flexDirection: 'row', justifyContent: "center", padding: 4 }}>
            <Button success iconRight style={{ height: 40, width: 100, borderRadius: 6, marginHorizontal: 6, alignSelf: "center", backgroundColor: "#424949" }} onPress={() => { this.openCamera() }}>
              <Text style={{fontFamily:'iran_sans_bold', fontSize: 11 }}>  دوربین</Text>
              <Icon name='logo-instagram' style={{ fontSize: 25, color: '#fff' }} />
            </Button>
            <Button iconRight success style={{ height: 40, width: 100, borderRadius: 6, marginHorizontal: 20, alignSelf: "center", backgroundColor: "#424949" }} onPress={() => { this.openVideoPicker() }}>
              <Text style={{fontFamily:'iran_sans_bold', fontSize: 11 }}>  گالری</Text>
              <Icon name='ios-image' style={{ fontSize: 25, color: '#fff' }} />
            </Button>
          </View>
        </Header>
      
        <Content style={{}}>
          <View style={{ borderRadius: 4, margin: 2, backgroundColor: "#fff", marginTop: 4, justifyContent: "center", }}>
            {/* <Image style={{
              height: Util.device.height - 140,
              width: null,
              marginTop: 10
            }}
              source={{ uri: this.state.videoLocalPath }}
              indicator={Progress.Pie}
              resizeMode="contain"
              indicatorProps={{
                size: 80,
                borderWidth: 0,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
            /> */}
            {
              this.state.isLoading ?
                <Button transparent style={{ borderWidth: 0 }}>
                  <ActivityIndicator style={{ padding: 2 }} />
                </Button> : null
            }
          </View>
        </Content>
        <Footer style={{ height: 50 }}>
          <FooterTab style={{ backgroundColor: '#D5D8DC' }}>
            <Button onPress={this.uploadImage} style={{}}>
              <Icon name="md-checkmark" style={{ color: '#566573' }} />
            </Button>
            <Button onPress={() => Actions.pop()} style={{}}>
              <Icon name="md-close" style={{ color: '#566573' }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )

  }

}

const styles = StyleSheet.create({
  container: {

  },
  

});