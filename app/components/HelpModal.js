import React, { Component } from 'react';
import { Alert, AsyncStorage, ActivityIndicator, StyleSheet, Image, Modal, ScrollView ,Dimensions} from 'react-native';
import { View, Text, Button, Header } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';




export class HelpModal extends Component {
    constructor() {
        super();
        this.state = { show: false };
    }


    componentWillReceiveProps(props) {
        this.setState({ show: props.show });
        
    }

    render() {
        return (<View style={{ margin: 0, backgroundColor: 'red' }}>
            <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={1}

                visible={this.state.show || false}
                style={{ justifyContent: "flex-end", }}
                onRequestClose={() => {

                }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={{ backgroundColor: '#FADBD8',borderTopRightRadius:6, borderTopLeftRadius:6, }}>
                    <View style={{ height: 40,backgroundColor:'red',borderTopRightRadius:6, borderTopLeftRadius:6,}}>
                        <Text style={this.props.textStyle || { color:'#fff',fontFamily:'iran_sans_bold',fontSize:14,marginTop:7,alignSelf:'center' }} >{this.props.title || "عنوان" }</Text>
                    </View>
                    <ScrollView style={{ maxHeight:Dimensions.get('window').height/2 }}>
                        <View style={{ flex: 1, padding: 4, }}>
                            <Text style={this.props.textStyle || { marginTop: 15, paddingHorizontal: 10, fontSize: 16 }} >{this.props.text}</Text>
                        </View>

                    </ScrollView>
                </View>
                <View style={{ backgroundColor: '#FADBD8', justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{backgroundColor:'red', margin: 6, width: 80, alignSelf: 'center', height: 40, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ show: false })}>
                        <Text style={{ fontSize: 13 }}>بستن</Text>
                    </Button>
                </View>



            </Modal>


        </View>)

    }


}


