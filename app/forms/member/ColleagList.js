
import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row,
    Grid,
    Thumbnail,
    Left,
    Right
} from 'native-base';
import Expo from 'expo';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import ListLoader from '../../components/Form/ListLoader';
import MasterPage from '../MasterPage';
import { publicStyle } from '../../assets/them/styles';
import Line from '../../components/tools/Line';
import { Math } from 'core-js';

class ColleagList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
            topNews: [],
            viewerHeight: null,
            isList: true,
            showComments: false,
            headerTransparent: true,
        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };


    render() {
        return (
            <MasterPage


                showMenu={true}
                footertabIndex={2}
                isList={true}
                showReturnBtn={false}
                headerTransparent={true}
                headerColor='#35536d'
                footerStyle={{ backgroundColor: '#35536d' }}
                footerIconColor='#fff'
                title="همکاران"
                headerColor='#35536d'
                headerIconColor="#fff"
                headerItems={[
                    { text: 'همکاران', color: '#fff', },
                    { icon: 'ios-search-outline', width: 30, color: '#fff', onPress: () => { } },
                    //{ icon: 'ios-arrow-round-back-outline', width: 30, color: '#fff', onPress: () => { if (this.state.selectedEntity) Actions.NewsList(); else Actions.MainForm() } },
                ]}
            >

                <ListLoader
                    super={this}
                    monitorHight={0.2}
                    animateHeaderHeight={0.1}
                    headerColor='#35536d'
                    animateHeaderStartColor='#35536d'
                    sortbarStyle={{ backgroundColor: '#efefef', height: 35 }}
                    //sortbarItems={[{ text: 'نام', sort: 'firstName desc', selected: true }, { text: 'نام خانوادگی', sort: 'lastName desc' }]}
                    apiPath='members'
                    onsort={() => { }}
                    onScroll={(scroolY, event) => {
                        // console.log(event.velocity.y)
                        if (scroolY > 0 && this.state.viewerHeight == null)
                            this.setState({ viewerHeight: 0, headerTransparent: false });
                        else if (scroolY < 10 && this.state.viewerHeight == 0)
                            this.setState({ viewerHeight: null, headerTransparent: true });
                    }}
                    pageSize={10}
                    filter={{}}
                    //serchBarItems={["firstName","lastName"]}
                    seperatorHight={0.7}
                    seperatorColor='#ddd'
                    rKey="currentEntity2"
                    sort="id asc"
                    itemHeight={70}
                    loadingTheme={(list) => {
                        return <View style={{ padding: 10, flex: 1, flexDirection: 'row', borderBottomWidth: 0.2 }}>
                            <Left>
                                <Text style={publicStyle.boldText}>............ ............</Text>
                                <Text note>.................</Text>
                            </Left>

                            <View style={{ width: 70 }}>
                                <View style={{ width: 70, backgroundColor: '#efefef', borderRadius: 35, margintop: 'center', justifyContent: 'center' }}>
                                    {
                                        list.state.inLoading &&
                                        <ActivityIndicator size="small" color="#000" style={{}} />
                                    }
                                </View>
                            </View>
                        </View>
                    }

                    }
                    renderItem={(item) => <View>
                        <View style={{ padding: 10,paddingHorizontal:20, flex: 1, flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Left>
                                <Text style={{fontFamily: 'iran_sans_bold',fontSize:13}}>{item.firstName + ' ' + item.lastName}</Text>
                                <Text style={{fontFamily: 'iran_sans',fontSize:14}} note>{item.postName}</Text>
                            </Left>
                            <View style={{ width: 70 }}>
                                <Thumbnail source={{ uri: Api.fileContainer + "profile/download/" + item.profileImage }} />
                            </View>

                        </View>
                       
                    </View>
                    }
                    onSelect={(entity, row, form) => {
                        Actions.ContactColleague({ entity })
                    }}
                    onunSelect={(entity, row, form) => {
                        //this.setState({ showItemDetail: false,isList:true,showComments:false,selectedEntity:null });
                    }}
                />


            </MasterPage>
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
}, mapDispatchToProps)(ColleagList);
