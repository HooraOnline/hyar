import React, { Component } from 'react';
import { StyleSheet,Text, View,ImageBackground, TouchableHighlight, Icon } from 'react-native';
import { Col, Row } from 'native-base';
import Badge2 from './tools/Badge2';
import { AppSetting } from '../utils/appSetting';
export class Tile extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <View style={[this.props.style, { flex: this.props.flex || 1, flexDirection: this.props.vertical ? 'column' : 'row', height: this.props.height }]}>
               
                {
                    this.props.cols.map((col) => {
                        return <TouchableHighlight activeOpacity={0.7} underlayColor='#000'   key={Math.random()} onPress={col.onPress} style={[{borderRadius:5, flex: col.flex, height: '100%',backgroundColor:col.backgroundColor ||'#f3f3f3', margin: this.props.margin || 0, }]}>
                            <ImageBackground imageStyle={{ borderRadius: 5 }} resizeMode="cover" source={{ uri: col.image }} style={{ height: '100%', width: null,borderWidth:3,borderColor:'#f3f3f3', borderRadius:4}}>
                                <View style={{ flex: 1 }}>
                                        {
                                            col.content
                                        }
                                </View>
                                <Row style={{ height: 32,}}>
                                    <Col style={{ flex: 1 }}>

                                    </Col>
                                    {
                                        col.badge &&
                                        <Col style={{ flex:1,justifyContent:'flex-end' ,alignItems:'flex-end',margin:5}}>
                                           <Badge2 text={col.badge}/>
                                        </Col>
                                    }
                                </Row>
                            </ImageBackground>
                        </TouchableHighlight>




                    })
                }
            </View>

        )

    }


}


