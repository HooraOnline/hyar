import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row,
    Grid,
    Col
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View, ImageBackground } from 'react-native';
import MasterPage from "../MasterPage";
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../aRedux';
import Api from '../../lib/api';
import AnimatForm from '../../components/Form/animation/AnimatForm';
import { Tile } from '../../components/Tile';
import { Util } from '../../lib/util';
import FilterLine from '../../components/tools/FilterLine';
import { Album } from '../../components/Album';
import ColorBar from '../../components/tools/ColorBar';



class MedicalTests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInProgress: false,
            albumHeight: 200,
            topNews: [],
            viewerHeight: null,
            headerTransparent: true,
            monitorHight: 250
        };
    }

    loadData = () => {

    }
    filterList = (filter) => {


    }
    componentWillMount() {
        this.loadData();
    }

    render() {
        return (
            <MasterPage
                ref={(masterPage) => { this.masterPage = masterPage }}
                showMenu={true}
                footertabIndex={1}
                isList={true}
                showReturnBtn={false}
                headerTransparent={true}
                footerStyle={{ backgroundColor: '#0c6366' }}
                footerIconColor='#fff'
                title="سلامت"
                headerIconColor="#00ced1"
                headerItems={[
                    { text: 'آزمایش پزشکی', color: '#00ced1', },
                    {
                        icon: 'ios-arrow-round-back-outline', width: 30, color: '#00ced1',
                        onPress: () => { Actions.pop() }
                    },
                ]}
            >

                <AnimatForm
                    headerColor='#0c6366'
                    monitorHight={250}
                    headerHeight={50}
                    animateHeaderStartColor='#0c6366'

                    renderMonitor={() => {
                        return <View style={{ flex: 1, width: null, height: null }} >
                            <ImageBackground imageStyle={{ borderRadius: 0 }} opacity={0.7} resizeMode="cover" source={{ uri: Api.getFilePath('design') + 'health1.jpg' }} style={{ backgroundColor: "#0c6366", flex: 1, height: null, width: null, }}>
                                <Grid style={{ flex: 1, marginTop: 70, margin: 15 }}>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', height: 70 }} >
                                        <Col style={{ width: 70, }}>
                                            <Image source={{ uri: Api.getFilePath('profile') + this.props.cUser.profileImage }} style={styles.avatar} />
                                        </Col>
                                        <Col>
                                            <Text style={{ fontSize: 17, fontFamily: 'iran_sans_bold', color: '#fff', paddingHorizontal: 5, }}>{this.props.cUser.firstName + ' ' + this.props.cUser.lastName}</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>سن:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>39 سال</Text></Text>
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>وزن:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>85 کیلو</Text></Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>قد:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>175 سانتی متر</Text></Text>
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, textAlign: 'left' }}> <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>29</Text>BMI: </Text>
                                        </Col>
                                    </Row>

                                </Grid>
                            </ImageBackground>
                        </View>
                    }}
                    renderBody={(animateForm) => {
                        return <View style={{ flex: 1, }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Tile vertical height={200} flex={2} margin={3} cols={[{
                                    flex: 1,
                                    content: <View style={{ height: '160%', }} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>آنزیم کبدی (SGOT)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={200} height={15}  pin={15}
                                                ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 40], color: '#9EE898' }, { range: [40, 100], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }, {
                                    flex: 1,
                                    content: <View style={{ height: '160%', }} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>کلسترول</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={200} height={15}  pin={100}
                                                ranges={[{ range: [0, 200], color: '#9EE898' }, { range: [200, 240], color: '#EB984E' }, { range: [240, 300], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                                <Tile vertical height={200} margin={3} cols={[{
                                    flex: 1,
                                    content: <Grid style={{ height: '100%' }} >
                                        <Row style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
                                            <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, textAlign: 'center' }}>کم خونی</Text>
                                        </Row>
                                        <Row style={{ flex: 1, }} >

                                        </Row>
                                    </Grid>
                                }]} style={{}}></Tile>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Tile vertical height={Util.device.height / 4} margin={3} cols={[{
                                    flex: 1,
                                    content: <Grid style={{ height: '100%' }} >
                                        <Row style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
                                            <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, textAlign: 'center' }}>کم خونی</Text>
                                        </Row>
                                        <Row style={{ flex: 1, }} >

                                        </Row>
                                    </Grid>
                                }]} style={{}}></Tile>
                                <Tile vertical height={Util.device.height / 4} margin={3} cols={[{
                                    flex: 1,
                                    content: <Row style={{ height: '160%' }} >
                                        <Col style={{ flex: 15, alignItems: 'center', justifyContent: 'center', }} >
                                            <Text style={{ color: 'green', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>کلسترول</Text>
                                        </Col>
                                        <Col style={{ flex: 0.5, }} >

                                        </Col>
                                    </Row>
                                }, {
                                    flex: 1,
                                    content: <Row style={{ height: '160%' }} >
                                        <Col style={{ flex: 1, }} >

                                        </Col>
                                        <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
                                            <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>چربی</Text>
                                        </Col>

                                    </Row>
                                }]} style={{}}></Tile>

                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Tile vertical height={Util.device.height / 4} margin={3} cols={[{
                                    flex: 1,
                                    content: <Row style={{ height: '160%' }} >
                                        <Col style={{ flex: 15, alignItems: 'center', justifyContent: 'center', }} >
                                            <Text style={{ color: 'green', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>کلسترول</Text>
                                        </Col>
                                        <Col style={{ flex: 0.5, }} >

                                        </Col>
                                    </Row>
                                }, {
                                    flex: 1,
                                    content: <Row style={{ height: '160%' }} >
                                        <Col style={{ flex: 1, }} >

                                        </Col>
                                        <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
                                            <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, alignSelf: 'center' }}>چربی</Text>
                                        </Col>

                                    </Row>
                                }]} style={{}}></Tile>
                                <Tile vertical height={Util.device.height / 4} margin={3} cols={[{
                                    flex: 1,
                                    content: <Grid style={{ height: '100%' }} >
                                        <Row style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
                                            <Text style={{ color: '#fff', fontFamily: 'iran_sans_bold', fontSize: 18, textAlign: 'center' }}>کم خونی</Text>
                                        </Row>
                                        <Row style={{ flex: 1, }} >

                                        </Row>
                                    </Grid>
                                }]} style={{}}></Tile>
                            </View>
                        </View>

                    }}

                    renderFixedBar={(animateForm) => {
                        return <View style={{ flex: 1, backgroundColor: '#839192' }}>
                            <FilterLine filterList={this.filterList} textStyle={{ color: '#fff' }} style={{ height: 50 }}
                                items={[
                                    { text: '1397/05/18', field: 'date', value: '1397/05/18' },
                                    { text: '1396/05/18', field: 'date', value: '1396/05/18' },
                                    { text: '1395/05/18', field: 'date', value: '1396/05/18' },
                                ]}
                            />
                        </View>
                    }

                    }

                >

                </AnimatForm>
            </MasterPage>
        )
    }
}
const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
    },
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(MedicalTests);