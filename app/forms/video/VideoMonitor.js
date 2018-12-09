import React, { Component } from 'react';
import {
  Button, Text,
  Icon,
  Row,
  Grid
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import MasterPage from "../MasterPage";
import ListLoader from "../../components/Form/ListLoader";
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import VideoViewer from './VideoViewer';
import { Util } from '../../lib/util';
import Line from '../../components/tools/Line';
import Seen from '../../components/Form/Seen';

class VideoMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadTramsaction: false,
      isInProgress: false,
      headerTransparent: true,
      monitorEntity: props.monitorEntity,
      screen:Expo.ScreenOrientation.Orientation.ALL,
      monitorHight: 360
      //this.getMonitorHightFromTextLonf(props.monitorEntity.desc)
    };
  }
  getMonitorHightFromTextLonf = (text) => {
    console.log(text.length)
    console.log(Util.device.width)
    let characterWidth = 6;
    let lineHeight = 30;
    let characterNumberInOneLine = Util.device.width / characterWidth;
    console.log('characterNumberInOneLine=' + characterNumberInOneLine)
    let lineNumber = text.length / characterNumberInOneLine + 1;
    console.log('lineNumber=' + lineNumber)
    let monitorHeight = lineNumber * lineHeight;
    console.log('monitorHeight=' + monitorHeight)
    return Util.device.height / 2.7 + 80 + monitorHeight;
    //return 51;
  }
  
  render() {
    return (
      <MasterPage
        ref={(masterPage) => { this.masterPage = masterPage }}
        showMenu={true}
        footertabIndex={1}
        isList={true}
        showReturnBtn={false}
        headerTransparent={true}
        headerColor='#000'
        footerStyle={{ backgroundColor: '#333333' }}
        footerIconColor='#fff'
        containerStyle={{ backgroundColor: '#000' }}
        title="ویدئو"
        headerIconColor="#00ced1"
        headerItems={[
          { text: 'ویدئو', color: '#00ced1', },
          {
            icon: 'ios-arrow-round-back-outline', width: 30, color: '#00ced1',
            onPress: () => { Actions.pop() }
          },
        ]}
      >
        <ListLoader
          ref={(ref) => { this.list = ref; }}
          filterbarItems={[
            { text: 'اخبار داخلی', field: 'videoGroup', value: '01' },
            { text: 'رویدادها', field: 'videoGroup', value: '02' },
            { text: 'فرهنگ و ارزشها', field: 'videoGroup', value: '03' },
            { text: 'آموزشی', field: 'videoGroup', value: '04' },
            { text: 'طنز', field: 'videoGroup', value: '05' },
            { text: 'حاشیه', field: 'videoGroup', value: '06' },
            { text: 'هنر', field: 'videoGroup', value: '07' },
            { text: 'کتابخوانی', field: 'videoGroup', value: '08' },
            { text: 'مسابقات', field: 'videoGroup', value: '09' },]}
          filterbarStyle={{ backgroundColor: '#000', height: 50 }}
          filterbartextStyle={{ color: '#fff' }}
          apiPath='Videos'
          title="ویدئو"
          monitorHight={this.state.monitorHight}
          headerIconColor="#00ced1"
          headerColor='#000'
          animateHeaderStartColor='#000'
          onsort={() => { }}
          style={{ backgroundColor: '#000' }}
          seperatorColor='#000'
          onScroll={(scroolY, event) => {
            // console.log(event.velocity.y)
          }}
          pageSize={7}
          filter={{}}
          rKey="currentEntity"
          sort="id desc"
          itemHeight={100}
          renderMonitor={() => <View style={{ flex: 1, width: null, height: null }} >
            <VideoViewer entity={this.state.monitorEntity} />
          </View>
          }
          renderListHeader23454534={(entity) => <View>
            {
              this.state.monitorEntity &&
              <View style={{}}>
                <VideoViewer entity={this.props.monitorEntity} />
                <Line margin={10} padding={3} height={5} backgroundColor='#eee' />
              </View>

            }

          </View>
          }

          renderItem={(entity) => <View>
            <View style={{ flexDirection: 'row', flex: 1, margin: 10, borderRadius: 3, alignItems: 'center', }} >
              <Image style={{ borderRadius: 4, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri: Api.getFilePath('video') + entity.image }} />
              <View style={{ flex: 1, }}>
                <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#fff', fontFamily: 'iran_sans_bold' }}>{entity.title.substring(0, 50)}</Text>
                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#888', fontFamily: 'iran_sans' }}>{entity.desc.substring(0, 60)}</Text>
                <Text style={{ textAlign: 'center', paddingHorizontal: 5, fontSize: 10, fontFamily: 'iran_sans', color: '#000', backgroundColor: '#fff', width: 40, borderRadius: 2, margin: 5 }}>{entity.time} </Text>
                <Seen color='#fff' seen={entity.seen || 0 + ' بازدید'} ></Seen>

              </View>
              <Icon name={"md-more"} style={{ fontSize: 20, color: '#fff', width: 30, }} ></Icon>
            </View>
          </View>
          }
          onSelect={(entity, row, form) => {
            this.setState({ monitorEntity: entity })
            //Actions.VideoMonitor({ monitorEntity: entity })
          }}

        />

      </MasterPage>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {
    cUser: state.cUser,
  }
}, mapDispatchToProps)(VideoMonitor);