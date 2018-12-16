import React, { Component } from 'react';
import {
  Button, Row, Icon


} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, } from 'react-native';

import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';
import Api from '../lib/api';
import { Util } from '../lib/util';
import { ActionCreators } from '../aRedux';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';

class ExpoImageManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      imagePath: this.getInitPath(),
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
      <TouchableOpacity style={[{ alignItems: 'center', justifyContent: "center", }, this.props.style]} onPress={() => {
        if (this.props.editable)
          Actions.ExpoImageUploader({
            uploadFolder: this.props.uploadFolder,
            imagePath: Api.fileContainer + this.props.uploadFolder + "/download/" + this.props.entity[this.props.imageField],
            onsuccess: (uplodedImageName) => {
              this.props.entity[this.props.imageField] = uplodedImageName; this.props.updateEntity(this.props.apiPath, this.props.entity, this.props.storeKey)
                .then((entity) => { if (this.props.onsuccess) this.props.onsuccess(entity) })
            }
          })
      }} >
        <Icon name='md-camera' style={{ zIndex: 1000, fontSize: 35, color: 'green', alignSelf: 'center', position: 'absolute', top: 0, left: 0 }} />
        <Image style={[{}, this.props.imageStyle]}
          source={{ uri: this.getInitPath() }}
          indicator={Progress.Pie}
          resizeMode="contain"
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
      </TouchableOpacity>
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
}, mapDispatchToProps)(ExpoImageManager);