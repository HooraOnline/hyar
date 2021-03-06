import React, { Component } from 'react';
import {  ActivityIndicator ,Modal} from 'react-native';
import { View, Text,Header } from 'native-base';
export class ProgressBarPT extends Component {
    constructor() {
        super();
        this.state = {isLoading:false };
    }
    render(){
      return(<View style={{ marginTop: 0 }}>
        <Modal
            animationType="none"
            transparent={true}
            state={{zIndex:20}}
            visible={this.props.show|| false}
            onRequestClose={() => {
   
            }}>
            <Header style={this.props.style || { backgroundColor:"red" }}>
                <View style={{ flexDirection: 'row',justifyContent:"center"}}>
                    <Text style={this.props.textStyle || {color:"#fff",marginTop:15,paddingHorizontal:10,fontFamily:'iran_sans_bold',fontSize:13} } >{this.props.text || "در حال اجرا ..." }</Text>
                    {/* <Image style={{width:40,height:40}} source={require("../assets/loading.png")} /> */}
                    {this.props.iconshow || true? <ActivityIndicator size={this.props.size || 'small'} color={this.props.color || "#fff"} style={this.props.pStyle || {paddingHorizontal:30,marginTop:10} }/>:null}              
                </View>
            </Header>
        </Modal>

       
    </View>)  
          
    }
   

}


