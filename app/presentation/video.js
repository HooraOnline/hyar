import React, { Component } from 'react';
import {
  Text, Button, Icon, Item, Input, Toast, Row, Left, Right, Thumbnail, Col,
} from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import { UIhelper, UIDesiner } from '../lib/uiHelper';
import { Actions } from 'react-native-router-flux';
import { publicStyle } from '../assets/them/styles';
import Api from '../lib/api'
export const crudActions={
  boxActions: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function (selecteItem) { console.log(selecteItem.id) } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
  editorActions: [{ name: 'ok', icon: 'ios-checkmark-circle-outline', permisionCode: 'ER23', onPress: (actionF) => { actionF.saveEntity() } }, { name: 'cancel', icon: 'ios-close-circle-outline', onPress: () => Actions.pop() }],
}
export const VideoList2= {
    title: "لیست ویدئوها",
    apiPath: "videos",
    textSearchFields: ['title'],
    pageSize: 20,
    showReturnedBtn: true,
    searchBar: true,
    filterBar: true,
    formStyle:{backgroundColor:'#000'},
    filterFilds: [{ name: 'Color', caption: 'رنگ پیراهن', dataType: 'color', attributs: [{ key: 'red', caption: 'قرمز' }, { key: 'blue', caption: 'آبی' }, { key: 'green', caption: 'سبز' },] }, { name: 'group', caption: 'گروه', dataType: 'array', attributs: [{ key: 'education', caption: 'آموزشی' }, { key: 'Expert', caption: 'سرگرمی' }, { key: ' licentiate', caption: 'ورزشی' }, { key: 'MA', caption: 'علمی' }] }],
    sortFilds: [{ name: "title", caption: "مرتب سازی بر حسب عنوان", sort: "title desc", dataType: "string" }, { name: "cdate", caption: "جدیترین ویدئوها", sort: "cdate desc", dataType: "string" }, { name: "cdate", caption: "قدیمیترین ویدئوها ویدئوها", sort: "cdate desc", dataType: "string" }],
    itemAction: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function () { } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
    onPressRow: (entity) => {
      Actions.EntityBox({
        entity: entity, title: entity.title,
        footerActions: [
          { name: 'comment', icon: 'md-albums', permisionCode: 'ER23', onPress: function () { } },
          { name: 'like', icon: 'md-thumbs-up', onPress: function () { } }],
        dataBind: (entity, form) => <View style={{}}>
          {/* <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri: Api.fileContainer + "video/download/" + entity.image }} /> */}
          <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri: entity.image }} />
          <Item style={{ flex: 1, }}>
            <Text style={[publicStyle.boldText, { padding: 10 }]}>{entity.title}</Text>
          </Item>
          { 
            UIDesiner.showModel(entity,
              [
                { key: 'title', caption: '' },
                { key: 'desc', caption: ' ', },
               
              ]
            )
          }
        </View>
      })
    },
    headerActions: [
      { key: 1, icon: 'ios-add-circle-outline', onPress: function () { Actions.ActionForm(VideoEditor) }, color: '' },
      {
        key: 'search', icon: 'ios-search-outline', onPress: function () {
          UIhelper.openSearchForm('members', 125,
            (entity) => <View style={{ padding: 10, flex: 1, flexDirection: 'row', borderBottomWidth: 0.2 }}>

              <Left>
                <Text style={publicStyle.boldText}>{entity.title}</Text>
                <Text note>{entity.desc}</Text>
              </Left>
              <View style={{ width: 70 }}>
                <Thumbnail source={{ uri:  Api.getFilePath("video") + entity.image }} />
              </View>
            </View>, ["title"], "جستجوی ویدئوها")
        }, color: ''
      },
    ],
    renderItem: (entity) => <View style={{ backgroundColor:'#555', flex: 1,  margin: 3, height: 250, borderWidth: 0.3, borderRadius: 3, padding: 4, borderColor: '#888' }} >
      {/* <Image style={{ borderRadius: 6, resizeMode: 'cover', height: 115, width: 100, }} source={{ uri:  Api.getFilePath("video") + entity.image }} /> */}
      <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 200, width: null, }} source={{ uri: entity.image }} />
      <View>
        <Text style={{ fontSize: 15, paddingHorizontal: 10, color: '#fff' }}>{entity.title}</Text>
        <Text style={{ paddingHorizontal: 10, fontSize: 15, color: '#d1d1d1' }}>{entity.desc}</Text>
      </View>
    </View>
  };
  

//**********************************************************************************


export const VideoEditor= {
    title: 'ویدئو جدید',
    storeKey: 'currentEntity',
    apiPath: 'videos',
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
      <Item><Text style={[publicStyle.padingText, {}]}>توضیحات: </Text><Input value={entity.desc} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
      <Item><Text style={[publicStyle.padingText, {}]}>توضیحات: </Text><Input value={entity.image} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
      <Item><Text style={[publicStyle.padingText, {}]}>توضیحات: </Text><Input value={entity.video} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
    </View>
  };


  //********************************************************************** */

  export const AlbumList= {
    title: "آلبوم تصاویر",
    apiPath: "albums",
    textSearchFields: ['title'],
    pageSize: 20,
    showReturnedBtn: true,
    searchBar: true,
    filterBar: true,
    formStyle:{backgroundColor:'#000'},
    filterFilds: [{ name: 'Color', caption: 'رنگ پیراهن', dataType: 'color', attributs: [{ key: 'red', caption: 'قرمز' }, { key: 'blue', caption: 'آبی' }, { key: 'green', caption: 'سبز' },] }, { name: 'group', caption: 'گروه', dataType: 'array', attributs: [{ key: 'education', caption: 'آموزشی' }, { key: 'Expert', caption: 'سرگرمی' }, { key: ' licentiate', caption: 'ورزشی' }, { key: 'MA', caption: 'علمی' }] }],
    sortFilds: [{ name: "title", caption: "مرتب سازی بر حسب عنوان", sort: "title desc", dataType: "string" }, { name: "cdate", caption: "جدیترین تصاویر", sort: "cdate desc", dataType: "string" }, { name: "cdate", caption: "قدیمیترین ویدئوها ویدئوها", sort: "cdate desc", dataType: "string" }],
    itemAction: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function () { } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
    onPressRow: (entity) => {
      Actions.EntityBox({
        entity: entity, title: entity.title,
        footerActions: [
          { name: 'comment', icon: 'md-albums', permisionCode: 'ER23', onPress: function () { } },
          { name: 'like', icon: 'md-thumbs-up', onPress: function () { } }],
        dataBind: (entity, form) => <View style={{}}>
          <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri:  Api.getFilePath("album") + entity.image }} /> 
          <Item style={{ flex: 1, }}>
            <Text style={[publicStyle.boldText, { padding: 10 }]}>{entity.title}</Text>
          </Item>
          { 
            UIDesiner.showModel(entity,
              [
                { key: 'title', caption: '' },
                { key: 'desc', caption: ' ', },
               
              ]
            )
          }
        </View>
      })
    },
    headerActions: [
      { key: 1, icon: 'ios-add-circle-outline', onPress: function () { Actions.ActionForm(AlbumEditor) }, color: '' },
      {
        key: 'search', icon: 'ios-search-outline', onPress: function () {
          UIhelper.openSearchForm('members', 125,
            (entity) => <View style={{ padding: 10, flex: 1, flexDirection: 'row', borderBottomWidth: 0.2 }}>

              <Left>
                <Text style={publicStyle.boldText}>{entity.title}</Text>
                <Text note>{entity.desc}</Text>
              </Left>
              <View style={{ width: 70 }}>
                <Thumbnail source={{ uri:  Api.getFilePath("album") + entity.image }} />
              </View>
            </View>, ["title"], "جستجوی تصاویر")
        }, color: ''
      },
    ],
    renderItem: (entity) => <View style={{ backgroundColor:'#555', flex: 1,  margin: 3, height: 250, borderWidth: 0.3, borderRadius: 3, padding: 4, borderColor: '#888' }} >
      {/* <Image style={{ borderRadius: 6, resizeMode: 'cover', height: 115, width: 100, }} source={{ uri: Api.getFilePath("album") + entity.image }} /> */}
      <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 200, width: null, }} source={{ uri: Api.getFilePath("album")+entity.image }} />
      <View>
        <Text style={{ fontSize: 15, paddingHorizontal: 10, color: '#fff' }}>{entity.title}</Text>
        <Text style={{ paddingHorizontal: 10, fontSize: 15, color: '#d1d1d1' }}>{entity.desc}</Text>
      </View>
    </View>
  };
  

//**********************************************************************************


export const AlbumEditor= {
    title: 'ویدئو جدید',
    storeKey: 'currentEntity',
    apiPath: 'albums',
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
      <Item><Text style={[publicStyle.padingText, {}]}>توضیحات: </Text><Input value={entity.text} onChangeText={value => { entity.desc = value; form.setState({ entity }) }}></Input></Item>
    </View>
  };