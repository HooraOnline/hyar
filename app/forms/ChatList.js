import React, { Component } from 'react';
import {
    Container, Content, Footer, FooterTab,Left, Right, Text, Button, Card,
    Col, Row,  Badge, Thumbnail
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../aRedux';
import Api from '../lib/api';
import ListBox from '../components/Form/ListBox';
import { dataAdapter } from '../lib/dataAdapter';
import { publicStyle } from '../assets/them/styles';
const { width, height } = Dimensions.get('window')
class ChatList extends Component {
    constructor(props) {
        super(props)
        window.eee = this
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
        }
    }



    componentWillMount() {

    }
    render() {
        return (
            <Container style={{ backgroundColor: '#D5D8DC' }}>
                <Content>
                    <ImageBackground resizeMode="stretch" source={require("../assets/coloured-background.jpg")} style={{ width: '100%', height: height - 55 }}>
                        <ListBox
                            formKey={this.constructor.name}
                            itemHeight={125}
                            apiPath='members'
                            pageSize={12}
                            searchBar={false}
                            filterBar={false}
                            title="لیست گفتگوها"
                            headerActions={ [{ key: 1, icon: 'ios-search-outline', onPress: function () { }, color: '' },]}
                            // itemAction={[{ name: 'edit', icon: 'ios-create-outline', permisionCode: 'ER23', func: function (selecteItem) { console.log(selecteItem.id) } }, { remove: 'edit', icon: 'ios-trash-outline', permisionCode: 'ER24' }, { name: 'sendMessage', icon: 'ios-chatbubbles-outline' },]}
                            filterFilds={[{ name: 'name', caption: 'نام', dataType: 'string' }, { name: 'mobile', caption: 'موبایل', dataType: 'number' }, { name: 'shirtColor', caption: 'رنگ پیراهن', dataType: 'color', attributs: [{ key: 'red', caption: 'قرمز' }, { key: 'blue', caption: 'آبی' }, { key: 'green', caption: 'سبز' },] }, { name: 'educationLevel', caption: 'تحصیلات', dataType: 'array', attributs: [{ key: 'Diploma', caption: 'دیپلم' }, { key: 'Expert', caption: 'کاردانی' }, { key: ' licentiate', caption: 'کارشناس' }, { key: 'MA', caption: 'فوق لیسانس' }] }]}
                            onPressRow={(model) => { dataAdapter.get('Chats/initChatRoom', null, null, {username1:this.props.cUser.id,username2:model.id}).then( (res) => {console.log(res);  Actions.Chat({roomId:res.room.id,resiver:model}) }  ); }} 
                            renderItem={(item) => <View style={{padding:10,flex:1, flexDirection:'row',borderBottomWidth:0.2}}>
                                <View style={{width:70}}>
                                    <Thumbnail source={{ uri: Api.fileContainer + "profile/download/"+item.profileImage }} />
                                </View>
                                <Left>
                                    <Text style={publicStyle.boldText}>{item.firstName + ' ' + item.lastName}</Text>
                                    <Text note>{item.postName}</Text>
                                </Left>
                                <Right>
                                    <Text note>3:43 pm</Text>
                                </Right>
                            </View>

                            } />
                    </ImageBackground>
                </Content>
                <Footer style={{ backgroundColor: '#00ced1', height: 59 }}>
                    <FooterTab style={{ backgroundColor: '#00ced1' }}>
                        <Row style={{ paddingTop: 7 }}>
                            <Col style={{ alignItems: 'center', }}>
                                <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { }}>
                                    <Icon name='ios-apps' style={{ color: '#0E6251' }} />
                                    <Text style={{  fontSize: 13, color: '#0E6251' }}>سرویسها</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', }}>
                                <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { Actions.MainForm() }}>
                                    <Icon name='md-person' style={{ color: '#0E6251' }} />
                                    <Text style={{  fontSize: 12, color: '#0E6251' }}>میز من</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'flex-end' }}  >
                                <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { }}>
                                    <Icon name='ios-chatbubbles' style={{ color: '#D6EAF8' }} />
                                    <Text style={{  fontSize: 13, color: '#fff' }}>پیامرسان</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', padding: 1, }}  >
                                <Button badge vertical style={{ justifyContent: 'flex-end' }}>
                                    <Badge style={{ backgroundColor: 'red', }}><Text style={{ fontSize: 14, marginTop: 5 }} >2</Text></Badge>
                                    <Icon name='ios-information-circle' style={{ color: '#D6EAF8' }} />
                                    <Text style={{  fontSize: 13, color: '#fff' }}>اطلاعیه</Text>
                                </Button>
                            </Col>
                        </Row>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    col: {
        alignItems: 'center',
        // padding: 1,
        // backgroundColor: '#fff',
        // marginHorizontal: 15,
        // paddingBottom: 10,
        // paddingTop: 4,
        //borderRadius: 10,
        // height: 80,
    },
   
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(ChatList);
