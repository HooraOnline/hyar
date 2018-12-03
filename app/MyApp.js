
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
//import ImageManager from './components/ImageManager';

//const yaml = require('js-yaml');


window.myApp = {};

myApp.openList = (formProps) => {
  Actions.ListBox(formProps)
}
myApp.openList2 = (formName) => {

  new Function('actions', 'myapp', "actions.ListBox(myapp.form." + formName + ")")(Actions, myApp);
}
myApp.openList3 = (formProps) => {
  let formPropsStr = JSON.stringify(formProps);
  new Function('actions', 'actions.ListBox(' + formPropsStr + ')')(Actions);
}

// Api.getCollection('AppConfigs', {})
//   .then((configs) => {
//     myApp.config = configs[0];
myApp.public = {
  actions: {
    boxActions: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function (selecteItem) { console.log(selecteItem.id) } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
    editorActions: [{ name: 'ok', icon: 'ios-checkmark-circle-outline', permisionCode: 'ER23', onPress: (actionF) => { actionF.saveEntity() } }, { name: 'cancel', icon: 'ios-close-circle-outline', onPress: () => Actions.pop() }],
  },
  boxProps: { showReturnedBtn: false, },
};





