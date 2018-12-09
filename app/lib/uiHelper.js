import React, { Component } from 'react';
import { Util } from "./util";
import { Actions } from "react-native-router-flux";
import {
  Text, Item, Input,
} from 'native-base';
import { } from 'react-native';
import { View, Image, StyleSheet,BackHandler } from 'react-native';
import { publicStyle } from "../assets/them/styles";
import { forms } from '../presentation';
import { dataAdapter } from './dataAdapter';


class uiHelper {
  login = (username,password) => {
    
  }
  logout = () => {
    Actions.Login();
    Util.clearTokenFromLocalStorage();
    //BackHandler.alow = false;
  }
  openSearchForm = (fetchListApi, itemHeight, renderItem, textSearchFields, title) => {
    Actions.SearchForm({
      apiPath: fetchListApi,
      itemHeight: itemHeight,
      renderItem: renderItem,
      textSearchFields: textSearchFields,
      searchTitle: title
    })
  }
  openListActivity = (listProps) => {
    Actions.listActivity(listProps);
  }
  openEditor = (editorProps) => {
   
  }

}
export const UIhelper = new uiHelper();

class UiDesiner {
  getTextItem = (title, value) => {
    return <Text style={[publicStyle.padingText, {}]}>{title}: {value}</Text>
  }
  showModel = (entity, fields) => {
    if (!fields) {
      let fi = [];
      for (var i in entity) {
        fi.push({key: i,value: entity[i]});
      }
      return fi.map((field) => { return <Text key={Math.random().toString()} style={[publicStyle.padingText, {}]}>{field.key}: {field.value}</Text> })
    }
    return <View  style={{ borderWidth: 0, borderRadius: 6, padding: 4, borderColor: '#ededed' }}>{ fields.map((field) => { return <View  key={Math.random().toString()} ><Text key={field.key} style={[publicStyle.padingText, {}]}>{field.caption}: {!field.format?entity[field.key]:field.format(entity[field.key]) }</Text></View> })}</View>
  }
  getEditTheme = (form,entity, fields) => {
    if (!fields) {
      let fi = [];
      for (var i in entity) {
        fi.push({key: i,value: entity[i]});
      }
    return fi.map((field) => { return   <Item key={Math.random().toString()}><Text  style={[publicStyle.padingText, {}]}>{field.key}: </Text><Input value={field.value}  onChangeText={value =>{entity[field.key]= value;}}></Input></Item>  })
    }
    return fields.map((field) => { return <Item key={Math.random().toString()}><Text  style={[publicStyle.padingText, {}]}>{field.caption}: </Text><Input value={entity[field.key]}  onChangeText={value =>{console.log(value);entity[field.key]= value;}}></Input></Item>  })
  }
}
export const UIDesiner = new UiDesiner();