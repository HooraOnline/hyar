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




export default class ImageUploader extends Component {
  constructor(props) {
    super(props)
    console.log(this)
    this.state = {
      progress: 0,
     // imageLocalPath: this.props.imagePath?Api.fileContainer+this.props.uploadFolder+"/download/"+this.props.imagePath: Api.fileContainer+ "public/download/no-image-icon.png",
      imageLocalPath:Api.fileContainer+ "public/download/no-image-icon.png",
      envidenceImage: null,
      num: 0,
      selected: [],

    }
  }
  openImagePicker = () => {
    // ImagePicker.openPicker({
    //   mediaType: "photo",
    //   //width: 300,
    //   //height: 200,
    //   //cropping: true,
    //   //includeBase64: true,
    //   cropperToolbarTitle: "برش عکس",
    //   //cropperCircleOverlay: true,
    //   compressImageMaxWidth: 500,
    //   compressImageMaxHeight: 700,
    //   //hideBottomControls: true,
    //   enableRotationGesture: true,
    //   compressImageQuality: 1

    // }).then((image) => {
    //   this.setState({ envidenceImage: image, imageLocalPath: image.path });
    // });
  }
  openCamera = () => {
    // ImagePicker.openCamera({
    //   mediaType: "photo",
    //   //width: 300,
    //   //height: 200,
    //   //cropping: true,
    //   //includeBase64: true,
    //   cropperToolbarTitle: "برش عکس",
    //   //cropperCircleOverlay: true,
    //   compressImageMaxWidth: 500,
    //   compressImageMaxHeight: 700,
    //   //hideBottomControls: true,
    //   enableRotationGesture: true,
    //   compressImageQuality: 1

    // }).then((image) => {
    //   this.setState({ envidenceImage: image, imageLocalPath: image.path });
    // });
  }
  uploadImage = () => {
    
    if (!this.state.envidenceImage) {
      Toast.show({
        text: "هیچ تصویری انتخاب نشده.",
        duration: 2000,
        type: 'danger',
        position: 'top',
      })
      return;
    }
    let file = this.state.envidenceImage
    this.setState({ isLoading: true, loadingText: "در حال آپلود تصویر ..." });
    var fileData = new FormData();
    let fileName = Math.floor((Math.random() * 1000000000000000000) + 1).toString() + ".jpeg";
    fileData.append('name', fileName);
    fileData.append('photos', {
      uri: file.path,
      type: 'image/jpeg',
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
              <Text style={{ fontFamily:'iran_sans_bold', fontSize: 11 }}>  دوربین</Text>
              <Icon name='logo-instagram' style={{ fontSize: 25, color: '#fff' }} />
            </Button>
            <Button iconRight success style={{ height: 40, width: 100, borderRadius: 6, marginHorizontal: 20, alignSelf: "center", backgroundColor: "#424949" }} onPress={() => { this.openImagePicker() }}>
              <Text style={{ fontFamily:'iran_sans_bold', fontSize: 11 }}>  گالری</Text>
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
              source={{ uri: this.state.imageLocalPath }}
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