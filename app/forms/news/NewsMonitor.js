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
import NewsViewer from './NewsViewer';
import { Util } from '../../lib/util';
import Line from '../../components/tools/Line';
import Like from '../../components/Form/Like';
class NewsMonitor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadTramsaction: false,
      isInProgress: false,
      headerTransparent: true,
      monitorEntity: props.monitorEntity,
      monitorHight: this.getMonitorHightFromTextLonf(props.monitorEntity.text)
    };
  }
  getMonitorHightFromTextLonf = (text) => {
    //let textlength=text.length;
    let textlength = text.length < 300 ? text.length : 300;
    let characterWidth = 6;
    let lineHeight = 25;
    let characterNumberInOneLine = Util.device.width / characterWidth;
    console.log('characterNumberInOneLine=' + characterNumberInOneLine)
    let lineNumber = textlength / characterNumberInOneLine + 1;
    console.log('lineNumber=' + lineNumber)
    let paragraphHeight = lineNumber * lineHeight;
    console.log('paragraphHeight=' + paragraphHeight)
    return Util.device.height / 2.7 + 80 + paragraphHeight;
    //return Util.device.height / 2.7+200;
  }
  componentWillMount() {

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
        //scrollY={this.state.scrollY}
        footerStyle={{ backgroundColor: '#ffb623' }}
        title="خبر"
        headerIconColor="#fff"
        headerItems={[
          { text: 'خبر', color: '#fff', },
          {
            icon: 'ios-arrow-round-back-outline', width: 30, color: '#fff',
            onPress: () => { Actions.pop() }
          },
        ]}
      >
        <ListLoader
          ref={(ref) => { this.list = ref; }}
          sortbarStyle={{ backgroundColor: '#AAB7B8', height: 30 }}
          sortbarItems={[{ text: 'تازه ترین اخبار', sort: 'id desc', selected: true }, { text: 'پربازدیدترین اخبار', sort: 'seen desc' }]}
          apiPath='News'
          title="اخبار"
          animateHeaderHeight={50}
          monitorHight={410}
          headerIconColor="#00ced1"
          headerColor='#ffb623'
          onsort={() => { this.state.monitorEntity = null }}
          onScroll={(scroolY, event) => {
            // console.log(event.velocity.y)
          }}
          pageSize={7}
          filter={{}}
          reduxListKey='newsList'
          reduxSelectedKey="currentEntity"
          sort="id desc"
          itemHeight={100}
          renderMonitor={() => <View  >
            <NewsViewer entity={this.props.monitorEntity} shortText={true} />
          </View>
          }

          renderListHeader2={(entity) => <View>
            {
              this.state.monitorEntity &&
              <View>
                <NewsViewer entity={this.props.monitorEntity} />
                <Line margin={10} padding={3} height={5} backgroundColor='#eee' />
              </View>

            }
          </View>
          }

          renderItem={(entity) => <View>
            <View style={{ flexDirection: 'row', flex: 1, margin: 10, borderRadius: 3, alignItems: 'center', }} >
              <Image style={{ borderRadius: 4, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri: Api.getFilePath('news') + entity.image }} />
              <View style={{ flex: 1, }}>
                <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#000' }}>{entity.udate ? new Date(entity.udate).toPersionDate('dateTime') : ''} </Text>
                <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#000', fontFamily: 'iran_sans_bold' }}>{entity.title.substring(0, 90)}</Text>
                <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#555', fontFamily: 'iran_sans' }}>{entity.desc.substring(0, 110)}</Text>
                <View style={{ flexDirection: 'row', width:Util.device.width <100? '80%': '50%', marginTop: 10, marginHorizontal: 15, }}>
                  <Row style={{ flex: 1 }} >
                    <Like apiPath="news" storeKey="currentEntity2" entity={entity} showUserLike={false} viewMode={true} />
                  </Row>
                  <Row style={{ flex: 0.6 }}>
                    <Icon name="md-eye" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                    <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E', }}>{entity.seen || 0}</Text>
                  </Row>
                  <Row style={{ flex: 1 }}>
                    <Icon name="md-chatbubbles" style={{ fontSize: 16, color: '#85929E', flex: 1 }} ></Icon>
                    <Text style={{ fontSize: 12, fontFamily: 'iran_sans', color: '#85929E', }}>{entity.commentNumber || 0}</Text>
                  </Row>
               
                </View>
              </View>
            </View>

          </View>
          }
          onSelect={(entity, row, form) => {
            Actions.NewsMonitor({ monitorEntity: entity })
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
}, mapDispatchToProps)(NewsMonitor);