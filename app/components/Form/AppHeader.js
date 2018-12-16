
import React, { Component } from 'react';
import { Header, Text, Icon, Col, Row, Grid, View, } from 'native-base';
import { ImageBackground, Image, TouchableHighlight } from 'react-native';
import { Util } from '../../lib/util';

export default class AppHeader extends Component {
    constructor(props) {
        super(props)

        this.state = { inProgress: false }
    }

    render() {

        return (
            <ImageBackground resizeMode="cover" source={{ uri: this.props.ImageBackgroundImage }} style={[this.props.hStyle, { justifyContent: 'center', alignItems: 'center' }, { height: 55, position: this.props.isTransparent ? 'absolute' : 'relative', top: 0, left: 0, right: 0, backgroundColor: this.props.isTransparent ? 'rgba(52, 52, 52, 0.07)' : this.props.headerColor || '#fff', zIndex: 1000 },]}>
                <Row style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <View style={{ flexDirection: 'row', position: 'absolute', top: 11, left: Util.device.width/2 }}>
                        <Image source={require('../../assets/logo.png')} style={{ resizeMode: 'contain', width: 30, height: null, }} />
                        <Text style={{ color: this.props.iconColor || '#00ced1', fontSize: 13, fontFamily: 'iran_sans_bold', textAlign: 'center', padding: 5 }}>{this.props.title}</Text>
                    </View> */}

                    {
                        this.props.items &&
                        this.props.items.map(i => {
                            return <Col key={Math.random()} style={{ width: i.width || null, alignItems: 'center', }}>
                                {
                                    i.icon &&
                                    <TouchableHighlight activeOpacity={0.8} underlayColor='#888'  style={{ width:  30,borderRadius:15, height:30, alignItems: 'center',justifyContent:'center' }} onPress={i.onPress}  >
                                        <Icon name={i.icon} activeOpacity={1} style={{ fontSize:i.iconSize|| 32, color: i.color || this.props.iconColor }} />
                                    </TouchableHighlight>

                                }
                                {
                                    i.text &&
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../assets/logo.png')} style={{ resizeMode: 'contain',width:30,height:30, }} />
                                        <Text style={{ color: i.color, fontSize: 13, fontFamily: 'iran_sans_bold', textAlign: 'center',padding:5 }}>{i.text}</Text>
                                    </View>
                                } 
                                
                            </Col>
                        })
                    }
                </Row>
            </ImageBackground>

        );
    }
}

