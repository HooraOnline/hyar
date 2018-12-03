import React, { Component } from 'react';
import { StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { View, } from 'native-base';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
export class Album extends Component {
    constructor() {
        super();
        this.state = { inProgress: false, };
    }

    render() {
        return (<Swiper activeDotColor="#fff" style={this.props.style} height={this.props.height} horizontal={true} autoplay={this.props.autoPlay}>
            {
                this.props.items &&
                this.props.items.map(item => {
                    return <TouchableOpacity  activeOpacity={0.8} key={Math.random()} onPress={item.onPress} style={[{ flex: 1, height: '100%', margin: this.props.margin || 0, }]}>
                        <View elevation={5} style={{  flex: 1,}}>
                            <ImageBackground  imageStyle={this.props.imageStyle || { borderRadius: 0 }}   opacity={this.props.opacity || 0.5}    resizeMode="cover" source={{ uri: item.image }} style={{ backgroundColor:this.props.opacityColor || "#000",flex: 1, height: '100%', width: null, }}>
                                <View style={{ flex: 1 ,height:null,width:null}}>
                                    {
                                        item.content
                                    }
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                })
            }
        </Swiper>)

    }
}
const styles = StyleSheet.create({



    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },



    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1,

    }
});


