// import Expo from 'expo';
// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   Container, Content, Header, Text, Button,
//   Icon, Toast, Footer, FooterTab

// } from 'native-base';
// import { Actions } from 'react-native-router-flux';
// //import ImagePicker from 'react-native-image-crop-picker';
// import { create } from 'apisauce'
// import * as Progress from 'react-native-progress';
// import Api from '../lib/api';
// export default class ExpoImageUploader extends React.Component {
//   state = {
//     progress: 0,
//     // imageLocalPath: this.props.imagePath?Api.fileContainer+this.props.uploadFolder+"/download/"+this.props.imagePath: Api.fileContainer+ "public/download/no-image-icon.png",
//      imageLocalPath:Api.fileContainer+ "public/download/no-image-icon.png",
//      imageUri: null,
//      num: 0,
//      selected: [],
//   }
//   uploadImage = () => {
    
//     if (!this.state.imageUri) {
//       Toast.show({
//         text: "هیچ تصویری انتخاب نشده.",
//         duration: 2000,
//         type: 'danger',
//         position: 'top',
//       })
//       return;
//     }
//     let file = this.state.imageUri
//     this.setState({ isLoading: true, loadingText: "در حال آپلود تصویر ..." });
//     var fileData = new FormData();
//     let fileName = Math.floor((Math.random() * 1000000000000000000) + 1).toString() + ".jpeg";
//     fileData.append('name', fileName);
//     fileData.append('photos', {
//       uri: this.state.imageUri,
//       type: 'image/jpeg',
//       name: fileName,
//     });
//     const api = create({
//       baseURL: Api.apiAddress,
//     })
//     api.post('containers/'+this.props.uploadFolder+'/upload', fileData, {
//       onUploadProgress: (e) => {
//         console.log(e)
//         const progress = e.loaded / e.total;
//         if (progress == 1) {
//           this.setState({ loadingText: "در حال ارسال اطلاعات  ..." });
//           if (this.props.onsuccess)
//             this.props.onsuccess(fileName)
//            Actions.pop();
//         }
//       }
//     }).then((res) => {
//       console.log(res)
//       if (this.props.onerror)
//         this.props.onerror(res)
//     })
//   }
// // When "Choose" is pressed, we show the user's image library
//   // so they may show a photo from disk inside the image view.
//   _onChoosePic = async () => {
//     const {
//       cancelled,
//       uri,
//     } = await Expo.ImagePicker.launchImageLibraryAsync();
//     if (!cancelled) {
//       this.setState({ imageUri: uri });
//       // console.log(uri) // this logs correctly
//       // TODO: why isn't this showing up inside the Image on screen?
//     }
//   }

//   // When "Take" is pressed, we show the user's camera so they
//   // can take a photo to show inside the image view on screen.
//   _onTakePic = async () => {
//     const {
//       cancelled,
//       uri,
//     } = await Expo.ImagePicker.launchCameraAsync({});
//     if (!cancelled) {
//       this.setState({ imageUri: uri });
//     }
//   }

//   // When "Save" is pressed, we snapshot whatever is shown inside 
//   // of "this.imageView" and save it to the device's camera roll.
//   _onSave =() => {
//     this.uploadImage();
//     //const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    
//     //await CameraRoll.saveToCameraRoll(uri);
    
//     // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
//   }
//   render() {
//     return (
//       <Container style={{ backgroundColor: "#fff", }}>
//       <Header style={{ backgroundColor: "#D5D8DC" }} >
//         <View style={{ flexDirection: 'row', justifyContent: "center", padding: 4 }}>
//           <Button success iconRight style={{ height: 40, width: 100, borderRadius: 6, marginHorizontal: 6, alignSelf: "center", backgroundColor: "#424949" }}  onPress={this._onTakePic}>
//             <Text style={{  fontSize: 11 }}>  دوربین</Text>
//             <Icon name='logo-instagram' style={{ fontSize: 25, color: '#fff' }} />
//           </Button>
//           <Button iconRight success style={{ height: 40, width: 100, borderRadius: 6, marginHorizontal: 20, alignSelf: "center", backgroundColor: "#424949" }}  onPress={this._onChoosePic}>
//             <Text style={{  fontSize: 11 }}>  گالری</Text>
//             <Icon name='ios-image' style={{ fontSize: 25, color: '#fff' }} />
//           </Button>
//         </View>
//       </Header>
    
//       <Content style={{}}>
//         <View style={{ borderRadius: 4, margin: 2, backgroundColor: "#fff", marginTop: 4, justifyContent: "center", }}>
//           {/* <Image style={{
//             height: Util.device.height - 140,
//             width: null,
//             marginTop: 10
//           }}
//             source={{ uri: this.state.imageLocalPath }}
//             indicator={Progress.Pie}
//             resizeMode="contain"
//             indicatorProps={{
//               size: 80,
//               borderWidth: 0,
//               color: 'rgba(150, 150, 150, 1)',
//               unfilledColor: 'rgba(200, 200, 200, 0.2)'
//             }}
//           /> */}
//           <Image ref={(ref) => this.imageView = ref}
//           style={{ width: 300, height: 300, backgroundColor: '#dddddd' }}
//           source={{ uri: this.state.imageUri }}
//         />
//           {
//             this.state.isLoading ?
//               <Button transparent style={{ borderWidth: 0 }}>
//                 <ActivityIndicator style={{ padding: 2 }} />
//               </Button> : null
//           }
//         </View>
//       </Content>
//       <Footer style={{ height: 50 }}>
//         <FooterTab style={{ backgroundColor: '#D5D8DC' }}>
//           <Button  onPress={this._onSave} style={{}}>
//             <Icon name="md-checkmark" style={{ color: '#566573' }} />
//           </Button>
//           <Button onPress={() => Actions.pop()} style={{}}>
//             <Icon name="md-close" style={{ color: '#566573' }} />
//           </Button>
//         </FooterTab>
//       </Footer>
//     </Container>
     
    
//     );
//   }
  
  
  
// }

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 28,
//     margin: 20,
//   },
//   buttonText: {
//     fontSize: 21,
//   },
//   button: {
//     padding: 13,
//     margin: 15,
//     backgroundColor: '#dddddd',
//   },
//   container: {
//     marginTop: Expo.Constants.statusBarHeight + 40,
//     flex: 1,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     height:200
//   },
// });