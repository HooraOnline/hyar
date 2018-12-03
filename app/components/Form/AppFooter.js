
import React, { Component } from 'react';
import {
   Footer, FooterTab,  Text, Button,
   Icon,  Col, Row, Badge, 
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
export default class AppFooter extends Component {
  constructor(props) {
    super(props)

    this.state = { inProgress: false }
  }

  render() {
    return (
        <Footer style={{ backgroundColor:  this.props.footertBackgroundcolor || '#4e4e4e', height: 73  ,paddingBottom:7, }}>
            <FooterTab style={[{marginTop:7, backgroundColor: '#efefef',marginHorizontal:5,borderRadius:10,borderBottomLeftRadius:30,borderBottomRightRadius:30 },this.props.style]}>
                <Row style={{  }}>
                    <Col style={{ alignItems: 'center',marginHorizontal:2, borderTopColor:'#00ced1',borderTopWidth: this.props.selected==1?2:0}}>
                        <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => {  Actions.MainForm() }}>
                            <Icon name="ios-easel-outline" size={32}style={{ fontSize:25,color: this.props.selected==1?'#00ced1':this.props.iconColor ||'#000' }}  />
                            <Text style={{ fontFamily:'iran_sans', fontSize: 12, color: this.props.selected==1?'#00ced1':this.props.iconColor ||'#000' }}>ویترین</Text>
                        </Button>
                    </Col>
                    <Col style={{ alignItems: 'center',marginHorizontal:2, borderTopColor:'#00ced1',borderTopWidth: this.props.selected==2?2:0}} >
                        <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => {
                            Actions.ColleagList()
                            }}>
                            <Icon name='ios-people-outline' style={{ fontSize:25,color: this.props.selected==2?'#00ced1':this.props.iconColor ||'#000' }} />
                            <Text style={{ fontFamily:'iran_sans', fontSize: 12, color: this.props.selected==2?'#00ced1':this.props.iconColor ||'#000' }}>همکاران</Text>
                        </Button>
                    </Col> 
                    <Col style={{ alignItems: 'center', }}>
                        <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { }}>
                            <Icon name='ios-apps-outline' style={{ fontSize:25,color: this.props.selected==3?'#00ced1':this.props.iconColor ||'#000' }} />
                            <Text style={{ fontFamily:'iran_sans', fontSize: 12, color:this.props.selected==3?'#00ced1':this.props.iconColor ||'#000' }}>خدمات</Text>
                        </Button>
                    </Col> 
                    <Col style={{ alignItems: 'center', padding: 1, }}>
                        <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={()=>{}}>
                            <Badge style={{backgroundColor:'red' }}><Text style={{ fontSize: 12, }} >2</Text></Badge>
                            <Icon name='ios-text-outline' style={{fontSize:25, color: this.props.selected==4?'#00ced1':this.props.iconColor ||'#000' }} />
                            <Text style={{fontFamily:'iran_sans', fontSize: 12, color: this.props.selected==4?'#00ced1':this.props.iconColor ||'#000' }}>پیغام</Text>
                        </Button>
                    </Col>
                </Row>
            </FooterTab>
         </Footer>
    );
  }
}

