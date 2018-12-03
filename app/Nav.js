// RNRF logic here
import React, { Component } from 'react';
import { Root } from "native-base";
import { Router, Scene } from 'react-native-router-flux';
import Starter from './forms/Starter.js';
import CheckInternet from './components/CheckInternet.js';
import SearchForm from './components/Form/SearchForm.js';
import EntityBox from './components/Form/EntityBox.js';
import ListBox from './components/Form/ListBox.js';
import ActionForm from './components/Form/ActionForm.js';
import VideoUploader from './components/VideoUploader.js';
import GiftChat from './components/GiftChat.js';
import MainForm from './forms/MainForm'
import Services from './forms/Services.js';
import Chat from './forms/Chat.js';
import ChatList from './forms/ChatList.js';
import ExpoImageUploader from './components/ExpoImageUploader.js';
import Players from './components/videos/Players';
import EnterMobileForRegister from './forms/EnterMobileForRegister.js';
import Profile from './forms/member/Profile.js';
import Login from './forms/authenticate/Login.js';
import ChangePassword from './forms/authenticate/ChangePassword.js';
import PasswordRecovery from './forms/authenticate/PasswordRecovery.js';
import ColleagList from './forms/member/ColleagList.js';
import ContactColleague from './forms/member/ContactColleague.js';
import MasterPage from './forms/MasterPage.js';
import EntityComments from './forms/EntityComments.js';
import TestForm from './forms/TestForm.js';
import VideoList from './forms/video/VideoList.js';
import NewsList from './forms/news/NewsList.js';
import NewsMonitor from './forms/news/NewsMonitor.js';
import VideoMonitor from './forms/video/VideoMonitor.js';


export default class App extends Component {
  render() {
    return (
      <Root>
        <Router hideNavBar={true} type="modal">
          <Scene key="root">

            
            <Scene key="MainForm" component={MainForm} title="MainForm" hideNavBar={true} initial={true} />
            <Scene key="TestForm" component={TestForm} title="TestForm" hideNavBar={true}   />
            {/****** Component*****/}
            <Scene key="ActionForm" component={ActionForm} title="ActionForm" hideNavBar={true} />
            <Scene key="ListBox" component={ListBox} title="ListBox" hideNavBar={true} />
            <Scene key="EntityBox" component={EntityBox} title="EntityBox" hideNavBar={true} />
            <Scene key="ExpoImageUploader" component={ExpoImageUploader} title="ExpoImageUploader" hideNavBar={true} />
            <Scene key="VideoUploader" component={VideoUploader} title="VideoUploader" hideNavBar={true} />
            <Scene key="GiftChat" component={GiftChat} title="GiftChat" hideNavBar={true} />
            {/****** Public Forms*****/}
            <Scene key="CheckInternet" component={CheckInternet} title="CheckInternet" hideNavBar={true} />
            <Scene key="SearchForm" component={SearchForm} title="SearchForm" hideNavBar={true} />
            <Scene key="EnterMobileForRegister" component={EnterMobileForRegister} title="EnterMobileForRegister" hideNavBar={true} />

            {/******HamrahYar Forms*****/}
            <Scene key="Services" component={Services} title="Services" hideNavBar={true} />
            <Scene key="Chat" component={Chat} title="Chat" hideNavBar={true} />
            <Scene key="ChatList" component={ChatList} title="ChatList" hideNavBar={true} />
           
            {/********** News & ... ******/}
            <Scene key="NewsList" component={NewsList} title="NewsList" hideNavBar={true} />
            <Scene key="NewsMonitor" component={NewsMonitor} title="NewsMonitor" hideNavBar={true}  />

             {/********* Video Sections********/}
             <Scene key="VideoList" component={VideoList} title="VideoList" hideNavBar={true}  />
             <Scene key="Players" component={Players} title="Players" hideNavBar={false} />
             <Scene key="VideoMonitor" component={VideoMonitor} title="VideoMonitor" hideNavBar={true} />
            {/********** member ******/}
            <Scene key="Profile" component={Profile} title="Profile" hideNavBar={true} />
            <Scene key="Login" component={Login} title="Login" hideNavBar={true} />
            <Scene key="ChangePassword" component={ChangePassword} title="ChangePassword" hideNavBar={true} />
            <Scene key="PasswordRecovery" component={PasswordRecovery} title="PasswordRecovery" hideNavBar={true} />
            <Scene key="ColleagList" component={ColleagList} title="ColleagList" hideNavBar={true} />
            <Scene key="ContactColleague" component={ContactColleague} title="ContactColleague" hideNavBar={true} />
            
            <Scene key="MasterPage" component={MasterPage} title="MasterPage" hideNavBar={true} />
            <Scene key="EntityComments" component={EntityComments} title="EntityComments" hideNavBar={true} />
          </Scene>
        </Router>
      </Root>
    );
  }
}
