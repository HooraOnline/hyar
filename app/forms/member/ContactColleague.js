
import React, { Component } from 'react';
import {
    Text,
    Item,
    Icon
} from 'native-base';

import ExpoImageManager from '../../components/ExpoImageManager';
import { StyleSheet, View, TouchableOpacity, Image, Linking } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import MasterPage from '../MasterPage';
import Api from '../../lib/api';
import { dataAdapter } from '../../lib/dataAdapter';



class ContactColleague extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <MasterPage
                showMenu={true}
                footertabIndex={2}
                showReturnBtn={true}
                headerTransparent={false}
                headerColor='#35536d'
                footerStyle={{ backgroundColor: '#35536d' }}
                footerIconColor='#fff'
                title="تماس"
                headerColor='#35536d'
                headerIconColor="#fff"
                headerItems={[
                    { text: 'تماس', color: '#fff', },

                ]}
            >
                <View>

                    <Image source={{ uri: Api.getFilePath('profile') + this.props.entity.profileImage }} style={styles.avatar} />

                    <View style={styles.bodyContent}>
                        <Text style={styles.name1}>{this.props.entity.firstName + ' ' + this.props.entity.lastName}</Text>
                        <Text style={styles.info}>{this.props.entity.postName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 40, justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }} >
                        <View>
                            <Icon name='ios-chatbubbles' style={{ fontSize: 40, color: '#35536d' }} onPress={
                                () => dataAdapter.get('Chats/initChatRoom', null, null, { username1: this.props.cUser.id, username2: this.props.entity.id }).then((res) => { console.log(res); Actions.Chat({ roomId: res.room.id, resiver: this.props.entity }) })
                            } />
                            <Text style={{ color: '#35536d', fontSize: 13, fontFamily: 'iran_sans_bold' }}>گفتگو</Text>
                        </View>
                        <View>
                            <Icon name='ios-call' style={{ fontSize: 40, color: '#35536d' }} onPress={() => { Linking.openURL(`tel:${this.props.cUser.mobile}`); }} />
                            <Text style={{ color: '#35536d', fontSize: 13, fontFamily: 'iran_sans_bold' }}>تماس</Text>
                        </View>
                        <View>
                            <Icon name='ios-mail' style={{ fontSize: 40, color: '#35536d' }} onPress={() => { Linking.openURL(`mailto:${this.props.cUser.email}`); }} />
                            <Text style={{ color: '#35536d', fontSize: 13, fontFamily: 'iran_sans_bold' }}>ایمیل</Text>
                        </View>
                        <View>
                            <Icon name='md-chatbubbles' style={{ fontSize: 40, color: '#35536d' }} onPress={() => { Linking.openURL(`sms:${this.props.cUser.mobile}`); }} />
                            <Text style={{ color: '#35536d', fontSize: 13, fontFamily: 'iran_sans_bold' }}>پیامک</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.body}>
                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> کد پرسنلی</Text>
                            <Text style={{ flex: 1, color: '#fff' }}> {this.props.entity.personalCode}</Text>
                        </View>

                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> موبایل </Text>
                            <Text style={{ flex: 1, color: '#fff' }}> {this.props.entity.mobile}</Text>
                        </View>


                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> تلفن </Text>
                            <Text style={{ flex: 1, color: '#fff' }}> {this.props.entity.phoneNumber}</Text>
                        </View>

                        <View style={styles.viewStyle} >
                            <Text style={styles.lableStyle}> ایمیل </Text>
                            <Text style={{ flex: 3, color: '#fff' }}> {this.props.entity.email}</Text>
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
        marginTop: 20
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontFamily: 'iran_sans_bold'
    },
    body: {
        marginTop: 20,
        margin: 0,
        paddingBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: '#35536d',

    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    name1: {
        fontSize: 17,
        color: "#696969",
        fontFamily: 'iran_sans_bold'
    },
    info: {
        fontSize: 16,
        color: "#000",
        marginTop: 2,
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
        fontSize: 12,
        color: '#fff'
        //textDecorationLine: 'underline',
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 15,
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 1

    },

});


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(ContactColleague);


//this.props.entity