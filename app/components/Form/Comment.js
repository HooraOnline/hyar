
import React, { Component } from 'react';
import { Container, Text, Toast, View, Icon, Button, FooterTab, Left, Right, Input, Textarea, Item, Row, Col } from 'native-base';
import { ActivityIndicator } from 'react-native'
import { ProgressBarPT } from './ProgressBarPT';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../aRedux';
import connect from 'react-redux/lib/connect/connect';
import ListLoader from './ListLoaderOld';
import Like from './Like';
import Line from '../tools/Line';
class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = { mobile: '09', inProgress: false, text: '', showCommentTextBox: props.showCommentTextBox || false }
  }
  componentWillReceiveProps(props) {
    this.setState({ showCommentTextBox: props.showCommentTextBox })
  }
  render() {
    let cUser = {};
    cUser.accessList = ['rg12']
    if (this.props.accessCode && cUser.accessList.indexOf(this.props.accessCode) == -1)
      return (
        <Text style={{ alignSelf: "center", justifyContent: "center", color: 'red', fontFamily: 'iran_sans_bold', padding: 15, paddingTop: 30 }} > شما به این بخش دسترسی ندارید.</Text>
      );
    return (
      <View style={[{ flex: 1 }, this.props.style, { borderWidth: 0, backgroundColor: this.props.backgroundColor }]}>
        {/* <View style={this.props.headerStyle || { height: 30, backgroundColor: this.props.backgroundColor, paddingTop: 5 }}>
          <Text style={{ flex: 1, fontFamily: 'iran_sans_bold', alignSelf: 'center', fontSize: 14, color: '#fff', }}>{this.props.title || 'نظرات'}</Text>
        </View> */}



        <ListLoader
          apiPath='comments'
          pageSize={this.props.pageSize || 10}
          formStyle={this.props.contentStyle}
          filter={{ entityId: this.props.model.id }}
          rKey="currentEntity2"
          renderCustomEntity={this.props.renderEntity}
          sort="id desc"
          title={this.props.title || "نظرات"}
          loadingTheme={(list) => {
            return null;
            //     return <View style={{ borderBottomColor: '#999', borderBottomWidth: 0.4, marginHorizontal: 10, borderRadius: 0, padding: 7, flex: 1, backgroundColor: this.props.backgroundColor }}>
            //   <Row>
            //       {
            //         list.state.inLoading &&
            //         <ActivityIndicator size="small" color="#000" style={{}} />
            //       }
            //     <Col >
            //       <Text style={{ fontFamily: 'iran_sans', color: '#fff' }}>.......
            //         <Text style={{ paddingHorizontal: 10, fontSize: 17, color: '#000', fontFamily: 'iran_sans', color: '#555', }}> ......  <Text style={{ margin: 10, fontSize: 17, color: '#444444', fontFamily: 'iran_sans' }}>
            //         </Text>   </Text>  </Text>
            //     </Col>
            //   </Row>
            //   <Text style={{ fontFamily: 'iran_sans', }}>..............................................................................................</Text>
            // </View>
          }

          }
          renderItem={(entity) => <View style={{ padding: 0.3, flex: 1, flexDirection: 'row', borderBottomWidth: 0 }}>
            {
              this.props.renderItem &&
              this.props.renderItem(entity)
            }
            {
              !this.props.renderItem &&
              <View style={{ borderBottomColor: '#999', marginHorizontal: 10, borderRadius: 0, flex: 1, backgroundColor: this.props.backgroundColor }}>
                <Row>
                  <Col >
                    <Text style={{ fontFamily: 'iran_sans', color: '#222222' }}>{entity.writerName+'     '}
                      <Text style={{ paddingHorizontal: 10, fontSize: 17, color: '#000', fontFamily: 'iran_sans', color: '#555', }}>
                        {new Date(entity.udate).toPersionDate('dateTime')}
                        <Text style={{ margin: 10, fontSize: 17, color: '#444444', fontFamily: 'iran_sans' }}>
                        </Text>
                      </Text>
                    </Text>
                  </Col>
                  <Col style={{ width: 100, padding: 10, }}>
                    <Like apiPath="comments" storeKey="currentEntity2" entity={entity} />
                  </Col>
                </Row>
                <Text style={{ fontFamily: 'iran_sans', }}>{entity.text}</Text>
                <Line margin={20} padding={20} />
              </View>

            }

          </View>
          } />
        {
          this.state.showCommentTextBox &&
          <View>
            <Textarea autoCorrection={true} onChangeText={(commentText) => this.setState({ commentText })} value={this.state.commentText} rowSpan={5} style={{ borderWidth: 0.2, margin: 5, borderRadius: 2, backgroundColor: '#fff' }} placeholder={this.props.plactHolder || "نظر خود را بنویسید..."} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button style={{ backgroundColor: 'green', margin: 6, width: 100, alignSelf: 'center', height: 40, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  if (!this.state.commentText) {
                    Toast.show({
                      text: 'نظر خود را وارد کنید.',
                      duration: 3000,
                      type: 'danger',
                      position: "top"
                    })
                    return;
                  }

                  let commentEntity = {
                    memberId: this.props.cUser.id,
                    text: this.state.commentText,
                    modelName: this.props.modelName,
                    entityId: this.props.model.id,
                    writerName: this.props.cUser.firstName+this.props.cUser.lastName,
                    cdate: new Date(),
                    udate: new Date(),
                  };
                  this.props.addList('comments', [commentEntity], 'currentEntity', 'currentList')
                    .then(() => {
                      Toast.show({
                        text: 'نظر شما دریافت شد.',
                        duration: 3000,
                        type: 'success',
                        position: "bottom"
                      })
                      this.setState({ commentText: '', showCommentTextBox: false });
                      this.props.model.commentNumber = this.props.model.commentNumber ? this.props.model.commentNumber + 1 : 1;
                      this.props.updateEntity(this.props.modelName, this.props.model);
                    });
                }}>
                <Text style={{ fontSize: 13, fontFamily: 'iran_sans_bold', color: '#fff', paddingTop: 5 }}>ثبت نظر</Text>
              </Button>
              <Button style={{ backgroundColor: 'red', margin: 6, width: 100, alignSelf: 'center', height: 40, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => this.setState({ commentText: '', showCommentTextBox: false })}>
                <Text style={{ fontSize: 13, fontFamily: 'iran_sans_bold', color: '#fff', paddingTop: 5 }}>انصراف</Text>
              </Button>

            </View>

          </View>
        }
      </View>



    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state, props) => {
  return {
    store: state,
    cUser: state.cUser,
    entity: state[props.storeKey],
  }
}, mapDispatchToProps)(Comment);
