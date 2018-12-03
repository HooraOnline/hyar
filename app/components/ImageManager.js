import React, { Component } from 'react';
import {
  Button, Row, Col,


} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, ActivityIndicator, Dimensions, } from 'react-native';

import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';
import Api from '../lib/api';
import { Util } from '../lib/util';
import { ActionCreators } from '../aRedux';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
const { width } = Dimensions.get('window')
class ImageManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      imagePath:this.getInitPath(),
      envidenceImage: null,
      num: 0,
      selected: [],

    }
  }
  getInitPath = () => {
    if (this.props.entity[this.props.imageField])
      return Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.entity[this.props.imageField];
    if (this.props.noImage)
     return Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.noImage;
    return Api.fileContainer + "public/download/no-image-icon.png"
  }
  render() {
    return (
      <Col style={{ borderRadius: 4,alignItems:'center', justifyContent: "center", height:this.props.height || 300 }} onPress={() => { if(this.props.editable) Actions.ImageUploader({uploadFolder:this.props.uploadFolder, imagePath: Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.entity[this.props.imageField], onsuccess: (uplodedImageName) => { this.props.entity[this.props.imageField] = uplodedImageName; this.props.updateEntity(this.props.apiPath, this.props.entity, this.props.storeKey) } }) }} >
         <Image style={{  width,flex: 1,borderRadius:10 }}
          source={{ uri: this.getInitPath() }}
          indicator={Progress.Pie}
          // resizeMode="contain"
          resizeMode="cover"
          indicatorProps={{ 
            size: 80,
            borderWidth: 0,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)'
          }}
        />  
        {
          this.state.isLoading ?
            <Button transparent style={{ borderWidth: 0 }}>
              <ActivityIndicator style={{ padding: 2 }} />
            </Button> : null
        }
      </Col>
    )

  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state, props) => {
  console.log(props)
  return {
    entity: state[props.storeKey],
  }
}, mapDispatchToProps)(ImageManager);
