import React, { Component } from 'react';
import {
  Text, Button, Icon, Item, Input, Toast, Row, Left, Right, Thumbnail, Col, Root,
} from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import { UIhelper, UIDesiner } from '../lib/uiHelper';
import { Actions } from 'react-native-router-flux';
import { publicStyle } from '../assets/them/styles';
import Api from '../lib/api'
import Comment from '../components/Form/Comment';
import Like from '../components/Form/Like';
export const crudActions = {
  boxActions: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function (selecteItem) { console.log(selecteItem.id) } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
  editorActions: [{ name: 'ok', icon: 'ios-checkmark-circle-outline', permisionCode: 'ER23', onPress: (actionF) => { actionF.saveEntity() } }, { name: 'cancel', icon: 'ios-close-circle-outline', onPress: () => Actions.pop() }],
}
export const NewsList = {
  title: "لیست خبرها",
  apiPath: "News",
  permisionCode: 'ER233',
  textSearchFields: ['title'],
  pageSize: 10,
  showReturnedBtn: true,
  searchBar: true,
  filterBar: true,
  showPublicHeader:true,
  showActionFooter: false,
  formStyle: { backgroundColor: '#000' },
  filterFilds: [
    { name: 'group', caption: 'گروه خبر', dataType: 'array', attributs: [{ key: 'education', caption: 'آموزشی' }, { key: 'Expert', caption: 'اقتصادی' }, { key: ' licentiate', caption: 'ورزشی' }, { key: 'MA', caption: 'علمی' }] },
    { name: 'Color', caption: 'رنگ خبر', dataType: 'color', attributs: [{ key: 'red', caption: 'قرمز' }, { key: 'blue', caption: 'آبی' }, { key: 'green', caption: 'سبز' },] },
    { name: 'date', caption: 'تاریخ خبر', dataType: 'array', attributs: [{ key: 'today', caption: 'امروز' }, { key: 'yesteday', caption: 'دیروز' }, { key: ' lastweek', caption: 'هفته پیش' }, { key: 'lastMonth', caption: 'ماه پیش' }] },
  ],
  sortFilds: [{ name: "seen", caption: "پربازدید ترین خبرها", sort: "seen desc", dataType: "string" }, { name: "cdate", caption: "قدیمیترین خبرها ", sort: "cdate desc", dataType: "string" }],
  itemAction: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function () { } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
  onPressRow: (entity, row, form) => {
    Actions.ActionForm({
      formStyle: { backgroundColor: '#000' },
      showActionFooter: false,
      showActionHeader: false,
      // footerActions: [
      //   { name: 'comment', icon: 'md-albums', permisionCode: 'ER23', onPress: function () { } },
      //   {
      //     name: 'like', icon: 'md-thumbs-up', onPress: function () {
      //       entity.like = entity.like == undefined ?0 : ++entity.like;
      //       form.props.updateEntity('news', entity, 'currentEntity')
      //     }
      //   }
      // ],
      content: () => <View style={{ backgroundColor: '#555' }}>
        <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri: Api.getFilePath('news') + entity.image }} />
        <Row>
          <Col >
            <Text style={[publicStyle.boldText, { padding: 10, fontFamily: 'iran_sans_bold', color: '#fff' }]}>{entity.title}</Text>
          </Col>
          <Col style={{width:100,padding: 10,}}>
            <Like apiPath="news" storeKey="currentEntity" entity={entity} />
          </Col>
        </Row>
        <Text style={{ fontSize: 15, paddingHorizontal: 10, color: '#fff', fontFamily: 'iran_sans' }}>{entity.desc} </Text>
        <Text style={{ paddingHorizontal: 10, fontSize: 15, color: '#fff', marginTop: 30, fontFamily: 'iran_sans' }}>{entity.text}</Text>
        <Comment style={{ marginTop: 10, backgroundColor: '#888' }} contentStyle={{ backgroundColor: '#000' }} modelName='news' entityId={entity.id} pageSize={2000} />
      </View>
    })
  },
  headerActions: [
    { key: 1, icon: 'ios-add-circle-outline', onPress: function () { Actions.ActionForm(NewsEditor) }, color: '' },
    {
      key: 'search', icon: 'ios-search-outline', onPress: function () {
        UIhelper.openSearchForm('members', 125,
          (entity) => <View style={{ padding: 10, flex: 1, flexDirection: 'row', borderBottomWidth: 0.2 }}>
            <Left>
              <Text style={publicStyle.boldText}>{entity.title}</Text>
              <Text note>{entity.desc}</Text>
            </Left>
            <View style={{ width: 70 }}>
              <Thumbnail source={{ uri: Api.fileContainer + "news/download/" + entity.image }} />
            </View>
          </View>, ["title"], "جستجوی خبرها")
      }, color: ''
    },
  ],
  renderItem: (entity) => <View style={{ flexDirection: 'row', backgroundColor: '#555', flex: 1, margin: 3, height: 110, borderWidth: 0.3, borderRadius: 3, padding: 4, borderColor: '#888' }} >
    <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 100, width: 100, }} source={{ uri: Api.getFilePath('news') + entity.image }} />
    <View style={{ flex: 1 }}>
      <Text style={{ paddingHorizontal: 10, fontSize: 15, color: '#d1d1d1', fontFamily: 'iran_sans', color: '#fefefe' }}>{new Date(entity.udate).toPersionDate()} <Text style={{ margin: 10, fontSize: 17, color: '#fefefe', fontFamily: 'iran_sans' }}><Icon name='ios-thumbs-up-outline' style={{ color: '#fefefe', fontSize: 20 }} /> {entity.like} </Text></Text>
      <Text style={{ fontSize: 14, paddingHorizontal: 10, color: '#fff', fontFamily: 'iran_sans_bold' }}>{entity.title}</Text>
      <Text style={{ paddingHorizontal: 10, fontSize: 15, color: '#d1d1d1', fontFamily: 'iran_sans' }}>{entity.desc}</Text>
    </View>
  </View>
};


//**********************************************************************************


export const NewsEditor = {
  title: 'خبر جدید',
  storeKey: 'currentEntity',
  apiPath: 'news',
  mode: 'add',
  footerActions: crudActions.editorActions,
  onActionSuccess: () => { Actions.pop() },
  onValidate: (entity) => {
    if (!entity.title)
      return 'عنوان وارد نشده';
    if (!entity.desc)
      return 'توضیحات وارد نشده';

    return false;
  },
  content: (form, entity) => <View style={{}}>
    <Item><Text style={[publicStyle.padingText, {}]}>عنوان: </Text><Input value={entity.title} onChangeText={value => { entity.title = value; form.setState({ entity }) }}></Input></Item>
    <Item><Text style={[publicStyle.padingText, {}]}>توضیح کوتاه: </Text><Input value={entity.desc} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
    <Item><Text style={[publicStyle.padingText, {}]}>تصویر: </Text><Input value={entity.image} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
    <Item><Text style={[publicStyle.padingText, {}]}>متن خبر: </Text><Input value={entity.news} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
  </View>
};





