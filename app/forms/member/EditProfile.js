
import React, { Component } from 'react';
import {
    Text,
    Item,
    Spinner,
    CheckBox
} from 'native-base';

import ExpoImageManager from '../../components/ExpoImageManager';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import MasterPage from '../MasterPage';
import Api from '../../lib/api';
import { Actions } from 'react-native-router-flux';



class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inProgress: false,
        }
    }
    updateUser = (user) => {
        this.setState({ inProgress: true })
        this.props.updateEntity('members', user, 'cUser')
            .then(() => this.setState({ inProgress: false }))
            .catch(() => this.setState({ inProgress: false }));
    }
    render() {
        return (
            <MasterPage
                showMenu={true}
                footertabIndex={1}
                showReturnBtn={true}
                footerStyle={{ backgroundColor: '#35536d' }}
                footerIconColor='#fff'
                headerTransparent={false}
                headerStyle={{ backgroundColor: '#35536d' }}
                title="ویرایش پروفایل"
                headerColor='#35536d'
                headerIconColor="#fff"
                headerItems={[
                    { text: 'ویرایش پروفایل', color: '#fff', },

                ]}
            >
                <View style={styles.container}>
                    <Item>
                        <ExpoImageManager  style={{ width: '100%', height: 200 }}
                         imageStyle={{ width: '100%', height: 200 }} 
                         editable={true} height='100%' storeKey="cUser"
                          imageField="profileImage" apiPath="members" 
                          uploadFolder="profile"
                          onsuccess={(user)=>console.log(user)} 
                          noImage="profileNoImage.jpg" 
                           />
                    </Item>


                    {/* <Image source={{ uri: Api.getFilePath('profile') + this.props.cUser.profileImage }} style={styles.avatar} />  */}

                    <View style={styles.body}>

                        <View style={styles.bodyContent}>
                            <Text style={[{ fontFamily: 'iran_sans_bold' }]}>{this.props.cUser.firstName + ' ' + this.props.cUser.lastName}</Text>
                            <Text style={styles.info}>{this.props.cUser.postName}</Text>
                            {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
                        </View>

                        <View style={styles.horizentalLine} />
                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> موبایل </Text>
                            <Text style={{ flex: 1, fontFamily: 'iran_sans' }}> {this.props.cUser.mobile}</Text>
                        </View>
                        <View style={styles.horizentalLine} />
                        <View style={[styles.viewStyle]} >
                            <Text style={styles.lableStyle}>نمایش موبایل به همکاران</Text>
                            <View style={{ width: 40 }}>
                                {
                                    this.state.inProgress ?
                                        <Spinner size={12} color='green' style={{ paddingTop: 60 }} />
                                        : <CheckBox color='#145A32' checked={this.props.cUser.showMobile} onPress={() => { if (this.state.inProgress) return; this.props.cUser.showMobile = !this.props.cUser.showMobile; this.updateUser(this.props.cUser) }} />
                                }
                            </View>
                        </View>
                        <View
                            style={styles.horizentalLine}
                        />
                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> تلفن </Text>
                            <Text style={{ flex: 1, fontFamily: 'iran_sans' }}> {this.props.cUser.phoneNumber}</Text>
                        </View>
                        <View
                            style={styles.horizentalLine}
                        />
                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> ایمیل </Text>
                            <Text style={{ flex: 1 }}> {this.props.cUser.email}</Text>
                        </View>
                    </View>
                </View >

            </MasterPage >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        // fontWeight: '600',
        fontFamily: 'iran_sans_bold'
    },
    body: {
        marginTop: 40,
        margin: 5
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name1: {
        fontSize: 20,
        color: "#696969",
        fontWeight: "600",
        fontFamily: 'iran_sans'
    },
    info: {
        fontSize: 16,
        color: "#777",
        marginTop: 0,
        fontFamily: 'iran_sans'
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    lableStyle: {
        flex: 1,
        textAlign: 'left',
        marginBottom: 5,
        fontFamily: 'iran_sans_bold',
        fontSize: 13,
        //textDecorationLine: 'underline',
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 40,
    },
    horizentalLine: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginRight: 5,
        marginLeft: 5,
    }
});


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(EditProfile);


