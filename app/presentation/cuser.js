import React, { Component } from 'react';
import {
  Text, Button, Icon, Item, Input, Toast, Row, Left, Right, Thumbnail, Col,
} from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import { UIhelper, UIDesiner } from '../lib/uiHelper';
import { Actions } from 'react-native-router-flux';
import { publicStyle } from '../assets/them/styles';
import Api from '../lib/api'
import { Util } from '../lib/util';
import { $lng } from '../utils/language';
import  ExpoImageManager  from '../components/ExpoImageManager';

  export const crudActions={
    boxActions: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function (selecteItem) { console.log(selecteItem.id) } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
    editorActions: [{ name: 'ok', icon: 'ios-checkmark-circle-outline', permisionCode: 'ER23', onPress: (actionF) => { actionF.saveEntity() } }, { name: 'cancel', icon: 'ios-close-circle-outline', onPress: () => Actions.pop() }],
  }
export const EnterMobileForRegister={
    title: $lng.enter_mobile_number,
    storeKey: 'cUser',
    showReturnedBtn: false,
    accessCode: "rg12",
    showActionFooter: true,
    showActionHeader: true,
    apiPath: 'members',
    footerText: $lng['hamrhayar_1397'],
    action: 'saveEntity',
    showActionBtn: true,
    onValidate: (entity) => {
      if (!entity.mobile)
        return $lng.Mobile_number_not_arrived;
      if (!Util.mobileReg.test(entity.mobile))
        return " شماره موبایل وارد شده درست نیست";
      return false;
    },
    onActionSuccess: (entity, form) => {
      Actions.ActionForm(EnterSMScode);
    },
    onFiledMassage: 'شما قبلا ثبت نام کرده اید، وارد شوید.',
    onActionFailed: (e, form) => {
      if (e.statusCode == 500)
        Actions.ActionForm(LoginByMobile);
      else
        Toast.show({
          text: 'بروز اشکال، لطفا دوباره تلاش کنید.',
          duration: 3000,
          type: 'danger',
          position: "top"
        })
    },
    onbeforeAction: (user) => { user.username = user.mobile },
    content: (form, entity) => <View style={{}}>
      <Item style={{ flex: 1, }}>
        <Input style={[publicStyle.input, { textAlign: 'left' }]} placeholder="09" onChangeText={text => { entity.mobile = text; }}  keyboardType="phone-pad"
          keyboardType="phone-pad" maxLength={11} />
      </Item>
      <Text style={[publicStyle.normalText, { marginTop: 6 }]} > {$lng.enter_your_mobile}</Text>
      <Col onPress={() => Actions.ActionForm(LoginByMobile)}>
        <Text  style={[publicStyle.normalText, { margin: 10, color: 'blue', marginTop: 30, textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000" }]}  > {$lng.register_before}</Text>
      </Col>
      <Image style={[publicStyle.logo, { marginTop: 40 }]} source={require("../assets/logo.png")} />
    </View>
  };

  //*****************************************************************************************************



  export const EnterSMScode= {
    title: $lng.sms_recived_code,
    storeKey: 'cUser',
    showReturnedBtn: false,
    accessCode: "rg12",
    showActionFooter: true,
    showActionHeader: true,
    footerText: $lng['hamrhayar_1397'],
    action: 'getData',
    actionsParams: (entity, form) => { return { username: entity.username, password: entity.password } },
    apiPath: 'Members/loginMember',
    xPath: 'member',
    showActionBtn: true,
    onValidate: (entity, form) => {
      if (!entity.password)
        return "کد 5 رقمی را وارد نمایید";
      if (!Util.digitReg.test(entity.password))
        return "فقط عدد وارد کنید";
      return false;
    },
    onActionSuccess: (res) => {
      Util.saveTokenInStorage(res.member.id, res.member.token);
      Actions.MainForm();
    },
    onActionFailed: (e) => {
      if (e.statusCode == 401)
        Toast.show({
          text: 'کد نادرست می باشد.',
          duration: 3000,
          type: 'danger',
          position: "top"
        })
      else
        Toast.show({
          text: 'بروز اشکال، لطفا دوباره تلاش کنید.',
          duration: 3000,
          type: 'danger',
          position: "top"
        })
    },
    content: (form, entity) => <View style={{}}>
      <Item style={{ flex: 1, }}>
        <Input style={[publicStyle.input, { textAlign: 'left' }]} placeholder="_ _ _ _ _"  onChangeText={text => { entity.password = text; }} keyboardType="phone-pad"
          keyboardType="phone-pad" maxLength={5} />
      </Item>
      <Text style={[publicStyle.normalText, { marginTop: 6 }]} > {$lng.enter_sms_recived_password}</Text>
      <Text style={[publicStyle.normalText, { marginTop: 6 }]} > Your Number: {entity.mobile}</Text>
      <Image style={[publicStyle.logo, { marginTop: 40 }]} source={require("../assets/logo.png")} />
    </View>
  };

//***********************************************************************************


  export const LoginByMobile={
    title: 'ورود به همراه یار',
    storeKey: 'cUser',
    showReturnedBtn: true,
    accessCode: "rg12",
    showActionFooter: false,
    showActionHeader: true,
    footerText: $lng['hamrhayar_1397'],
    action: 'getData',
    actionsParams: (entity, form) => { return { username: entity.username, password: entity.password } },
    apiPath: 'Members/loginMember',
    xPath: 'member',
    showActionBtn: true,
    onValidate: (entity, form) => {
      if (!entity.username)
        return $lng.Mobile_number_not_arrived;
      if (!Util.mobileReg.test(entity.username))
        return " شماره موبایل وارد شده درست نیست";
      if (!entity.password)
        return "رمز عبور وارد نشده";
      return false;
    },
    onActionSuccess: (res) => {
      Util.saveTokenInStorage(res.member.id, res.member.token);
      Actions.MainForm();
    },
    onActionFailed: (e) => {
      if (e.statusCode == 401)
        Toast.show({
          text: 'شماره موبایل  یا کلمه عبور نادرست می باشد.',
          duration: 3000,
          type: 'danger',
          position: "top"
        })
      else
        Toast.show({
          text: 'بروز اشکال، لطفا دوباره تلاش کنید.',
          duration: 3000,
          type: 'danger',
          position: "top"
        })
    },
    content: (form, entity) => <View style={{}}>
      <Item style={{ flex: 1, }}>
        <Input style={[publicStyle.input, { textAlign: 'left' }]} placeholder="شماره موبایل" onChangeText={text => { entity.username = text; }}  keyboardType="phone-pad" keyboardType="phone-pad" maxLength={11} />
      </Item>
      <Item style={{ flex: 1, }}>
        <Input style={[{ textAlign: 'left' }]} placeholder="رمز عبور" onChangeText={text => { entity.password = text; }}  />
      </Item>
      <Text style={[publicStyle.normalText, { marginTop: 6 }]} >شماره موبایل و رمز عبور خود را وارد کنید</Text>
      <Row onPress={() => form.doAction()} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={[publicStyle.logo, { marginTop: 40 }]} source={require("../assets/Password.png")} />
      </Row>
    </View>
  };

  //****************************************************************************


  export const ChangePassword= {
    title: 'تغییر رمز عبور',
    storeKey: 'cUser',
    apiPath: 'members',
    showActionFooter: false,
    //footerActions: crudActions,
    action: 'saveEntity',
    showActionBtn: true,
    onValidate: (entity, form) => {
      if (!entity.password)
        return 'رمز جدید وارد نشده';
      if (entity.password != form.state.rPassword)
        return 'تکرار رمز با رمز اصلی مطابق نیست';
      return false;
    },
    onbeforeAction: (user) => user.username = user.mobile,
    onActionSuccess: () => {
      Actions.ActionForm(LoginByMobile);
      Toast.show({
        text: 'رمز شما با موفقیت تغییر یافت، دوباره لاگین کنید.',
        duration: 5000,
        type: 'danger',
        position: "top"
      })
    },


    content: (form, entity) => <View style={{}}>
      <Item><Text style={[publicStyle.padingText, {}]}>رمز جدید: </Text><Input value={entity.password} onChangeText={text => { entity.password = text; form.setState({ entity }) }}></Input></Item>
      <Item><Text style={[publicStyle.padingText, {}]}>تکرار رمز جدید: </Text><Input value={form.state.rPassword} onChangeText={rPassword => { form.setState({ rPassword }) }}></Input></Item>
    </View>
  };
  //****************************************************************************************************** */


  //  export const ManageUser= {
  //   title: myApp.config.title,
  //   apiPath: myApp.config.apiPath,
  //   textSearchFields: ['mobile'],
  //   pageSize: 20,
  //   showReturnedBtn: myApp.config.showReturnedBtn,
  //   searchBar: myApp.config.searchBar,
  //   filterBar: myApp.config.filterBar,
  //   filterFilds: eval(myApp.config.filterFilds),
  //   sortFilds: myApp.config.sortFilds,
  //   itemAction: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function () { } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
  //   headerActions: [
  //     { key: 'add', icon: 'ios-add-circle-outline', onPress: () => { UserEditor.entity = {}; Actions.ActionForm(UserEditor) }, color: '' }, { key: 2, icon: 'ios-checkmark-circle-outline', onPress: function () { }, color: '' },
  //     {
  //       key: 'search', icon: 'ios-search-outline', onPress: function () {
  //         UIhelper.openSearchForm('members', 125,
  //           (entity) => <View style={{ flex: 1, flexDirection: 'row', margin: 3, height: 125, borderWidth: 1, borderRadius: 6, padding: 4, borderColor: '#ededed' }} >
  //             <Image style={{ borderRadius: 6, resizeMode: 'cover', height: 115, width: 100, }} source={{ uri: "http://n.diemacher.at/assets/front/images/team/david-boehm.jpg" }} />
  //             <View>
  //               <Text style={{  fontSize: 14, paddingHorizontal: 10, }}>{entity.name || 'سعید رضایی'}</Text>
  //               <Text style={{ paddingHorizontal: 10, }}>موبایل: {entity.mobile}</Text>
  //               <Text style={{ paddingHorizontal: 10, }}>کد دعوت: {entity.invitationCode}</Text>
  //             </View>
  //           </View>, ["invitationCode", "mobile"], "جستجوی کارمندان")
  //       }, color: ''
  //     },
  //   ],
  //   renderItem: (entity) => <View style={{ flex: 1, flexDirection: 'row', margin: 3, height: 125, borderWidth: 1, borderRadius: 6, padding: 4, borderColor: '#ededed' }} >
  //     <Image style={{ borderRadius: 6, resizeMode: 'cover', height: 115, width: 100, }} source={{ uri: "http://n.diemacher.at/assets/front/images/team/david-boehm.jpg" }} />
  //     <View>
  //       <Text style={{  fontSize: 14, paddingHorizontal: 10, }}>{entity.firstName ? entity.firstName + ' ' + entity.lastName : 'علی موسوی'}</Text>
  //       <Text style={{ paddingHorizontal: 10, }}>موبایل: {entity.mobile}</Text>
  //       <Text style={{ paddingHorizontal: 10, }}>کد دعوت: {entity.invitationCode}</Text>
  //     </View>
  //   </View>,
  //   onPressRow: (entity) => { Actions.ActionForm(UserMonitor) },
  // };



  //******************************************************************************* */

  export const UserMonitor= {
    title: 'مشاهده کاربر',
    storeKey: 'cUser',
    showReturnedBtn: true,
    showActionHeader: true,
    footerActions: [
      { name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function () { Actions.ActionForm(UserEditor) } },
      { name: 'remove', icon: 'ios-trash-outline', permisionCode: 'ER24' },
      { name: 'chat', icon: 'ios-chatbubbles-outline', onPress: function () { Actions.GiftChat() } }],
    content: (form, entity) => <View style={{}}>
      <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri: "http://n.diemacher.at/assets/front/images/team/david-boehm.jpg" }} />
      <Item style={{ flex: 1, }}>
        <Text style={[publicStyle.boldText, { padding: 10 }]}>{entity.firstName && entity.firstName + ' ' + entity.lastName}</Text>
      </Item>
      {
        UIDesiner.showModel(entity,
          [
            { key: 'mobile', caption: 'موبایل' },
            { key: 'invitationCode', caption: 'کد دعوت' },
            { key: 'cdate', caption: 'تاریخ عضویت', }
          ]
        )
      }
    </View>
  };

  //************************************************************************************* */

 export const UserEditor= {
    title: 'ویرایش کاربر',
    storeKey: 'currentEntity',
    apiPath: 'members',
    footerActions: crudActions.editorActions,
    onActionSuccess: () => { Actions.pop() },
    onbeforeAction: (user) => user.username = user.mobile,
    onValidate: (entity) => {
      if (!entity.firstName)
        return 'نام وارد نشده';
      if (!entity.lastName)
        return 'نام خانوادگی وارد نشده';
      if (!entity.mobile)
        return 'موبایل وارد نشده';
      if (!Util.mobileReg.test(entity.mobile))
        return " شماره موبایل وارد شده درست نیست";
      return false;
    },
    content: (form, entity) => <View style={{}}>
      <Item><Text style={[publicStyle.padingText, {}]}>نام: </Text><Input value={entity.firstName} onChangeText={firstName => { entity.firstName = firstName; form.setState({ entity }) }}></Input></Item>
      <Item><Text style={[publicStyle.padingText, {}]}>نام خانوادگی: </Text><Input value={entity.lastName} onChangeText={lastName => { entity.lastName = lastName; form.setState({ entity }) }}></Input></Item>
      <Item><Text style={[publicStyle.padingText, {}]}>موبایل: </Text><Input value={entity.mobile} onChangeText={mobile => { entity.mobile = mobile; form.setState({ entity }) }}></Input></Item>
    </View>
  };

  //********************************************************************************************************************* */

  export const Profile= {
    title: ' پروفایل',
    storeKey: 'cUser',
    showReturnedBtn: true,
    showActionHeader: false,

    footerActions: [
      { name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: (form) => { Actions.ActionForm(ProfileEditor) } },
      { name: 'password', icon: 'ios-unlock-outline', onPress: (form) => { Actions.ActionForm(ChangePassword) } },
    ],
    content: (form, entity) => <View style={{}}>
      {/* <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri: Api.getFilePath("profile")+entity.profileImage  }} /> */}
      {/* <ImageManager editable={true} height={300} storeKey="cUser" imageField="profileImage" apiPath="members" uploadFolder="profile" noImage="profileNoImage.jpg" /> */}

      <Item style={{ flex: 1, }}>
        <Text style={[publicStyle.boldText, { padding: 10 }]}>{entity.firstName && entity.firstName + ' ' + entity.lastName}</Text>
      </Item>
      <Item style={{ flex: 1,height:300 }}>
      <ExpoImageManager editable={true} height='100%' storeKey="cUser" imageField="profileImage" apiPath="members" uploadFolder="profile" noImage="profileNoImage.jpg" />
      </Item>
      
      {
        UIDesiner.showModel(entity,
          [
            { key: 'mobile', caption: 'موبایل', },
            { key: 'invitationCode', caption: 'کد دعوت' },
            { key: 'cdate', caption: 'تاریخ عضویت', format: (value) => new Date(value).toPersionDate() }
          ]
        )
      }
    </View>
  };
  
  export const ProfileEditor= {
    title: 'ویرایش پروفایل',
    storeKey: 'cUser',
    apiPath: 'members',
    footerActions: crudActions.editorActions,
    onActionSuccess: () => { Actions.pop() },
    onbeforeAction: (user) => user.username = user.mobile,
    onValidate: (entity) => {
      if (!entity.firstName)
        return 'نام وارد نشده';
      if (!entity.lastName)
        return 'نام خانوادگی وارد نشده';
      if (!entity.mobile)
        return 'موبایل وارد نشده';
      if (!Util.mobileReg.test(entity.mobile))
        return " شماره موبایل وارد شده درست نیست";
      return false;
    },

    content: (form, entity) => <View style={{}}>
      {/* <Item><Text style={[publicStyle.padingText, {}]}>نام: </Text><Input value={entity.firstName} onChangeText={firstName => { entity.firstName = firstName; form.setState({ entity }) }}></Input></Item>
          <Item><Text style={[publicStyle.padingText, {}]}>نام خانوادگی: </Text><Input value={entity.lastName} onChangeText={lastName => { entity.lastName = lastName; form.setState({ entity }) }}></Input></Item>
          <Item><Text style={[publicStyle.padingText, {}]}>موبایل: </Text><Input value={entity.mobile} onChangeText={mobile => { entity.mobile = mobile; form.setState({ entity }) }}></Input></Item> */}
      {
        UIDesiner.getEditTheme(form, entity,
          [
            { key: 'firstName', caption: 'نام' },
            { key: 'lastName', caption: 'نام خانوادگی' },
            { key: 'postName', caption: 'پست سازمانی' },
          ]
        )
      }
    </View>
  };

  //************************************************************************************************************ */

  export const ContactList= {
    title: "همکاران",
    apiPath: "members",
    textSearchFields: ['fName', 'lName'],
    pageSize: 20,
    showReturnedBtn: true,
    searchBar: true,
    filterBar: true, 
    filterFilds: [{ name: 'name', caption: 'نام', dataType: 'string' }, { name: 'mobile', caption: 'موبایل', dataType: 'number' }, { name: 'shirtColor', caption: 'رنگ پیراهن', dataType: 'color', attributs: [{ key: 'red', caption: 'قرمز' }, { key: 'blue', caption: 'آبی' }, { key: 'green', caption: 'سبز' },] }, { name: 'educationLevel', caption: 'تحصیلات', dataType: 'array', attributs: [{ key: 'Diploma', caption: 'دیپلم' }, { key: 'Expert', caption: 'کاردانی' }, { key: ' licentiate', caption: 'کارشناس' }, { key: 'MA', caption: 'فوق لیسانس' }] }],
    sortFilds: [{ name: "fName", caption: "مرتب سازی بر حسب نام", sort: "fName desc", dataType: "string" }, { name: "lName", caption: "مرتب سازی بر حسب نام خانوادگی", sort: "lName desc", dataType: "string" }],
    itemAction: [{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', onPress: function () { } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },],
    onPressRow: (entity,row,form) => {
      Actions.EntityBox({
        entity: entity, title: entity.firstName + ' ' + entity.lastName,
        footerActions: [
          { name: 'contact', icon: 'md-call', permisionCode: 'ER23', onPress: function () { } },
          { name: 'chat', icon: 'ios-chatbubbles-outline', onPress: ()=> Actions.Chat({reciver:entity}) }
        ],
        dataBind: (entity, form) => <View style={{}}>
          <Image style={{ borderRadius: 2, resizeMode: 'cover', height: 320, width: null, }} source={{ uri: Api.getFilePath("profile") +  entity.profileImage }} />
          <Item style={{ flex: 1, }}>
            <Text style={[publicStyle.boldText, { padding: 10 }]}>{entity.firstName && entity.firstName + ' ' + entity.lastName}</Text>
          </Item>
          {
            UIDesiner.showModel(entity,
              [
                { key: 'mobile', caption: 'موبایل' },
                { key: 'postName', caption: ' پست سازمانی', }
              ]
            )
          }
        </View>
      })
    },
    headerActions: [
      {
        key: 'search', icon: 'ios-search-outline', onPress: function () {
          UIhelper.openSearchForm('members', 125,
            (entity) => <View style={{ padding: 10, flex: 1, flexDirection: 'row', borderBottomWidth: 0.2 }}>

              <Left>
                <Text style={publicStyle.boldText}>{entity.firstName + ' ' + entity.lastName}</Text>
                <Text style={publicStyle.boldText}>{entity.mobile}</Text>
                <Text note>{entity.postName}</Text>
              </Left>
              <View style={{ width: 70 }}>
                <Thumbnail source={{ uri:  Api.getFilePath("profile") + entity.profileImage }} />
              </View>
            </View>, ["firstName", "lastName", "mobile"], "جستجوی همکاران")
        }, color: ''
      },
    ],
    renderItem: (entity) => <View style={{ padding: 10, flex: 1, flexDirection: 'row', borderBottomWidth: 0.2 }}>

      <Left>
        <Text style={publicStyle.boldText}>{entity.firstName + ' ' + entity.lastName}</Text>
        <Text style={{}}>{entity.mobile}</Text>
        <Text note>{entity.postName}</Text>
      </Left>
      <View style={{ width: 70 }}>
        <Thumbnail source={{ uri: Api.getFilePath("profile") + entity.profileImage }} />
      </View>
    </View>,

  };

//**********************************************************************************








