
import React, { Component } from 'react';
import { Container, Content, Text, Toast, View, Icon, Button, Textarea, Item, Row, Col, Footer } from 'native-base';
import { StyleSheet, Keyboard, Dimensions } from 'react-native'
import { Image } from 'react-native'
import { ProgressBarPT } from './ProgressBarPT';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../aRedux';
import connect from 'react-redux/lib/connect/connect';
import ListLoader from './ListLoader';
import Like from './Like';
import Api from '../../lib/api';
class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = { keyboardHeight: 0, mobile: '09', inProgress: false, text: '', }
  }
  componentWillReceiveProps(props) {
    this.setState({ height: Dimensions.get('window').height, })
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = (e) => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      normalHeight: Dimensions.get('window').height,
      shortHeight: Dimensions.get('window').height - e.endCoordinates.height,
    })
  }
  _keyboardDidHide = (e) => {
    this.setState({ keyboardHeight: 0, })
  }
  sendComment = () => {

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
      memberAvatar: this.props.cUser.profileImage,
      text: this.state.commentText,
      modelName: this.props.modelName,
      entityId: this.props.model.id,
      writerName: this.props.cUser.firstName + ' ' + this.props.cUser.lastName,
      isDeleted: 0,
      cdate: new Date(),
      udate: new Date(),
    };
    this.setState({ commentText: '', inProgress: true })
    this.props.addList('comments', [commentEntity], 'commentList')
      .then(() => {
        this.setState({ inProgress: false })
        // Toast.show({
        //   text: 'نظر شما دریافت شد.',
        //   duration: 3000,
        //   type: 'success',
        //   position: "top"
        // })

        this.props.model.commentNumber = this.props.model.commentNumber ? this.props.model.commentNumber + 1 : 1;
        this.props.updateEntity(this.props.modelName, this.props.model);
      });

  }
  render() {
    let cUser = {};
    cUser.accessList = ['rg12']
    if (this.props.accessCode && cUser.accessList.indexOf(this.props.accessCode) == -1)
      return (
        <Text style={{ alignSelf: "center", justifyContent: "center", color: 'red', fontFamily: 'iran_sans_bold', padding: 15, paddingTop: 30 }} > شما به این بخش دسترسی ندارید.</Text>
      );
    return (<Container>
      <Content style={[{ flex: 1 }, this.props.style, { borderWidth: 0, backgroundColor: this.props.backgroundColor, }]}>
        <View style={{ paddingBottom: 100 }} >
          <ListLoader
            apiPath='comments'
            haveAnimate={false}
            pageSize={this.props.pageSize || 10}
            seperatorHight={0}
            formStyle={this.props.contentStyle}
            monitorHight={0.2}
            animateHeaderHeight={0.1}
            haveLine={false}
            emptyText="اولین نظر را شما ثبت کنید."
            headerColor={this.props.headerColor}
            animateHeaderStartColor={this.props.headerColor}
            seperatorHight={0.7}
            filter={{ entityId: this.props.model.id, isDeleted: 0 }}
            reduxSelectedKey="currentEntity2"
            reduxListKey='commentList'
            renderListHeader={this.props.renderListHeader}
            sort="id desc"
            title={this.props.title || "نظرات"}
            renderItem={(entity) => <View style={{ padding: 0.3, flex: 1, flexDirection: 'row', borderBottomWidth: 0, marginVertical: 5 }}>
              {
                this.props.renderItem &&
                this.props.renderItem(entity)
              }
              {
                !this.props.renderItem &&
                <View style={{ borderBottomColor: '#999', margin: 10, borderRadius: 0, flex: 1, backgroundColor: this.props.backgroundColor }}>
                  <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Col style={{ width: 40 }}>
                      <Image source={{ uri: Api.getFilePath('profile') + entity.memberAvatar }} style={styles.avatar} onPress={this.sendComment} />
                    </Col>

                    <Col style={{ flex: 1, }}>
                      <Text style={{ fontFamily: 'iran_sans', }}> <Text style={{ fontFamily: 'iran_sans_bold', color: '#222222', fontSize: 12, paddingTop: 12, paddingVertical: 6 }}> {entity.writerName + '    '} </Text>{entity.text}</Text>
                    </Col>
                    <Col style={{ width: 70, alignItems: 'flex-end' }}>
                      <Like vertical style={{}} size={this.props.iconSize || 18} apiPath="comments" storeKey="currentEntity2" entity={entity} />
                    </Col>
                    {/* {
                      this.props.cUser.isAdmin &&
                      <Col style={{ width: 20, alignItems: 'flex-end' }}>
                        <Icon name='ios-trash' style={{ fontSize: 25, color: 'red' }} onPress={() => {
                          entity.isDeleted = 1;
                          this.props.updateEntity('comments', entity, 'commentList');
                        }} />
                      </Col>
                    } */}


                  </Row>
                  <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ paddingHorizontal: 10, fontSize: 13, color: '#000', fontFamily: 'iran_sans', color: '#555', paddingTop: 12 }}>  {new Date(entity.udate).toPersionDate('weak')}<Text style={{  fontSize: 13, color: 'red', fontFamily: 'iran_sans', paddingTop: 12 }}> ({new Date(entity.udate).timeToNow()})  </Text> </Text>
                  </Row>
                </View>
              }
            </View>
            } />
        </View>

      </Content>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: this.state.keyboardHeight, backgroundColor: '#efefef', paddingVertical: 5, backgroundColor: '#ECF0F1', borderColor: '#cecece', borderTopWidth: 0.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', margin: 10, marginBottom: 2, alignItems: 'center' }}>
          <Image source={{ uri: Api.getFilePath('profile') + this.props.cUser.profileImage }} style={styles.avatar} />
          <Item rounded style={{ flex: 1, borderWidth: 0, margin: 2, borderRadius: 15, backgroundColor: '#fff' }}>
            {
              !this.state.inProgress ?
                <Textarea autoCorrection={true} onChangeText={(commentText) => this.setState({ commentText })} value={this.state.commentText} rowSpan={2} style={{ flex: 1, fontFamily: 'iran_sans', fontSize: 15, }} placeholder={this.props.plactHolder || "نظر خود را بنویسید..."} />
                : null
            }

            {

              this.state.commentText ? <Col style={{ width: 43 }} onPress={() => this.sendComment()} >
                <Text style={{ fontFamily: 'iran_sans', fontSize: 15, paddingHorizontal: 5, color: '#faaa22' }}>ارسال</Text>
              </Col> : null
            }
            {

              this.state.inProgress ? <Col style={{}} onPress={() => this.sendComment()} >
                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 15, paddingHorizontal: 5 }}>در حال ارسال...</Text>
              </Col> : null
            }


          </Item>


        </View>
      </View>

    </Container>



    );
  }
}
const styles = StyleSheet.create({

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'center',
  },

});

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
