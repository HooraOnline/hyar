import React, { Component } from 'react';
import {
    Container, Content, Footer, FooterTab, Header, Left, Right, Body, Title, Text, Button, Card,
    CardItem, Form, Item, Input, Icon, Drawer, Col, Row, Grid, Badge, DeckSwiper, Tabs, Tab, Thumbnail
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../aRedux';
import GiftChat from '../components/GiftChat';
import Api from '../lib/api';
import { dataAdapter } from '../lib/dataAdapter';
const { width, height } = Dimensions.get('window')
class Chat extends Component {
    constructor(props) {
        super(props)
        window.eee = this
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
            roomId:null,
            reciver:null,

        }
    }



    componentDidMount() {
        if(!this.props.reciver)
         return;
        dataAdapter.get('Chats/initChatRoom', null, null, {username1:this.props.cUser.id,username2:this.props.reciver.id}).then( (res) => {this.setState({roomId:res.room.id,reciver:this.props.reciver})}  );
    }
    render() {
        if(!this.state.reciver)
         return  <Text style={{padding:20,marginTop:30,fontFamily:'iran_sans_bold'}}> در  حال برقراری ارتباط...</Text>
        return (
           
            <Container style={{ backgroundColor: '#D5D8DC' }}>
                <Row style={{ height: 70, backgroundColor: '#fff', }}>
                    <Col style={{ alignContent: 'center', justifyContent: 'center', width: 60 }} onPress={() => { Actions.pop() }}>
                        <Thumbnail source={{ uri:  Api.getFilePath("profile")+this.state.reciver.profileImage }} />
                    </Col>
                    <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                        <Text style={{ alignSelf: 'center', color: '#5DADE2' }}>{this.state.reciver.firstName+' '+this.state.reciver.lastName}</Text>
                    </Col>
                    <Col style={{ alignContent: 'center', justifyContent: 'center', width: 50 }} onPress={() => { Actions.pop() }}>
                        <Icon name='ios-people-outline' style={{ color: '#5DADE2', paddingHorizontal: 10 }} />
                    </Col>
                </Row>
                <Content>
                    <ImageBackground resizeMode="stretch" source={require("../assets/coloured-background.jpg")} style={{ width: '100%', height: height - 90 }}>
                        <GiftChat roomId={this.state.roomId}/>
                    </ImageBackground>
                </Content>
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
}, mapDispatchToProps)(Chat);
