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
import helthInfo from './helthInfo'
//import PieChart from 'react-native-pie-chart';
import { Constants, Svg } from 'expo';

import { Circle } from 'react-native-progress';
import CircleColor from './CircleColor';

class MedicalTestsOld extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterItems: [],
            monitorHight: 250,
            isInProgress: false,
            albumHeight: 200,
            topNews: [],
            viewerHeight: null,
            headerTransparent: true,
            inProgress: false,

        };
    }

    loadData = () => {

    }
    filterList = (filter) => {
        this.setState({ selected: this.state.userHealthInfo[filter.index] });
    }
    setFilterItems = (userHealthInfo) => {
        for (let i = 0; i < userHealthInfo.length; ++i) {
            if (userHealthInfo[i].date)
                this.state.filterItems.push({ text: userHealthInfo[i].date, field: 'date', value: userHealthInfo[i].date, });
        }
        if (this.state.filterItems[0])
            this.state.filterItems[0].selected = true;
        this.setState({ userHealthInfo: userHealthInfo, filterItems: this.state.filterItems, selected: userHealthInfo[0], inProgress: false, });

    }
    fetchHealthData = () => {
        let self = this;
        if (this.props.userHealthInfo[0]) {
            this.setFilterItems(this.props.userHealthInfo);
        } else {
            this.setState({ inProgress: true });
            this.props.fetchPagedList('health', 'userHealthInfo', { shm: this.props.cUser.employeeNmber }, 'year:asc').then(nList => {
                console.log(nList)
                self.setFilterItems(nList);
            }).catch(e => {
                this.setState({ inProgress: false, });
            });

        }

    }
    componentDidMount() {
        this.fetchHealthData();
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
                            <ImageBackground imageStyle={{ borderRadius: 0 }} opacity={0.5} resizeMode="cover" source={{ uri: Api.getFilePath('design') + 'health1.jpg' }} style={{ backgroundColor: "#0c6366", flex: 1, height: null, width: null, }}>
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
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>سن:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selected && this.state.selected.age} سال</Text></Text>
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>وزن:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selected && this.state.selected.weight} کیلو</Text></Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>قد:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selected && this.state.selected.stature} سانتی متر</Text></Text>
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, textAlign: 'left' }}> <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selected && this.state.selected.bmi}</Text> :MBI </Text>
                                        </Col>
                                    </Row>

                                </Grid>
                            </ImageBackground>
                        </View>
                    }}
                    renderBody={(animateForm) => {
                        if (this.state.inProgress)
                            return <Text style={{ padding: 10, fontFamily: 'iran_sans' }}>در حال بارگذاری.</Text>;
                        if (!this.state.userHealthInfo)
                            return <Text style={{ padding: 10, fontFamily: 'iran_sans' }}>هیچ آزمایشی برای شما ثبت نشده است.</Text>;
                        return <View style={{ flex: 1, }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Tile vertical height={200} flex={2} margin={3} cols={[{
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>آنزیم کبدی (SGOT)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.sgot}
                                                ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 40], color: '#9EE898' }, { range: [40, 100], color: '#E6787D' },]}
                                            />
                                        </View>
                                    </View>
                                }, {
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>آنزیم کبدی (SGPT)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.sgpt}
                                                ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 40], color: '#9EE898' }, { range: [40, 100], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                                <Tile vertical flex={1.5} height={200} margin={3} cols={[{
                                    flex: 2,
                                    content: <View style={{ height: 200 }} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>VITD</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ alignContent: 'flex-start', flex: 1, justifyContent: 'center', paddingBottom: 30 }}>

                                                {/* <PieChart
                                                    style={{ width: 100, height: 100 }}
                                                    chart_wh={100}
                                                    series={[100, 321, 180, 180]}
                                                    sliceColor={['#F44336', '#9EE898', '#F44336', '#bbb',]}
                                                    doughnut={true}
                                                    coverRadius={0.85}
                                                    coverFill={'#FFF'}
                                                >
                                                 <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>33</Text>
                                                </PieChart> */}
                                                {/* <Svg height={100} width={100}>
                                                    <Svg.Circle
                                                        cx={50}
                                                        cy={50}
                                                        r={45}
                                                        strokeWidth={2.5}
                                                        stroke="#e74c3c"
                                                        fill="#f1c40f"
                                                    />
                                                    <Svg.Rect
                                                        x={15}
                                                        y={15}
                                                        width={70}
                                                        height={70}
                                                        strokeWidth={2}
                                                        stroke="#9b59b6"
                                                        fill="#3498db"
                                                    />
                                                </Svg> */}

                                                <CircleColor />

                                            </View>
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                            </View>
                            <View style={{ flexDirection: 'row', }}>

                                <Tile vertical flex={1.5} height={200} margin={3} cols={[{
                                    flex: 2,
                                    content: <View style={{ height: 200 }} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>کلسترول</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ alignContent: 'flex-start', flex: 1, justifyContent: 'center', paddingBottom: 30 }}>



                                                <CircleColor />

                                            </View>
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>

                                <Tile vertical height={200} flex={2} margin={3} cols={[{
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>کلسترول خوب (HDL)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={62}
                                                ranges={[{ range: [0, 30], color: '#E6787D' }, { range: [30, 80], color: '#9EE898' }, { range: [80, 100], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }, {
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>کلسترول بد (LDL)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.ldl}
                                                ranges={[{ range: [0, 130], color: '#9EE898' }, { range: [130, 160], color: '#EB984E' }, { range: [160, 200], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                            </View>
                            <View style={{ flexDirection: 'row', }}>



                                <Tile vertical height={200} flex={2} margin={3} cols={[{
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>شمارش گلبولهای قرمز (RBC)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.rbc}
                                                ranges={[{ range: [0, 1.6], color: '#E6787D' }, { range: [1.6, 7.4], color: '#9EE898' }, { range: [7.4, 9], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }, {
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>شمارش گلبورهای سفید (WBC)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.wbc}
                                                ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 10], color: '#9EE898' }, { range: [10, 15], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                                <Tile vertical flex={1.5} height={200} margin={3} cols={[{
                                    flex: 2,
                                    content: <View style={{ height: 200 }} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3, padding: 2 }}>غلظت گلبول قرمزخون (HCT)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ alignContent: 'flex-start', flex: 1, justifyContent: 'center', paddingBottom: 30 }}>



                                                <CircleColor />

                                            </View>
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                            </View>
                            <Tile vertical flex={1.5} height={110} margin={3} cols={[{
                                flex: 2,
                                content: <View style={{ height: 110 }} >
                                    <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>نیتروژن اوره (BUN)</Text>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ alignContent: 'flex-start', flex: 1 }}>



                                            <ColorBar width={330} height={15} pin={this.state.selected.bun}
                                                ranges={[{ range: [0, 3.5], color: '#E6787D' }, { range: [3.5, 7.5], color: '#9EE898' }, { range: [7.5, 10], color: '#E6787D' },]}
                                            />

                                        </View>
                                    </View>

                                </View>
                            }]} style={{}}></Tile>
                            <View style={{ flexDirection: 'row', }}>

                                <Tile vertical flex={1.5} height={200} margin={3} cols={[{
                                    flex: 2,
                                    content: <View style={{ height: 200 }} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>CREATININE</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ alignContent: 'flex-start', flex: 1, justifyContent: 'center', paddingBottom: 30 }}>



                                                <CircleColor />

                                            </View>
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>

                                <Tile vertical height={200} flex={2} margin={3} cols={[{
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>قند خون ناشتا (SGOT)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.sgot}
                                                ranges={[{ range: [0, 70], color: '#E6787D' }, { range: [70, 90], color: '#9EE898' }, { range: [90, 130], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }, {
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>تری گلیسرین</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.tg}
                                                ranges={[{ range: [0, 150], color: '#9EE898' }, { range: [150, 400], color: '#EB984E' }, { range: [400, 500], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                            </View>
                            <View style={{ flexDirection: 'row', }}>



                                <Tile vertical height={100} flex={2} margin={3} cols={[{
                                    flex: 1,
                                    content: <View style={{}} >
                                        <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>هموگلوببن (hgb)</Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ColorBar width={180} height={15} pin={this.state.selected.tg}
                                                ranges={[{ range: [0, 13.1], color: '#E6787D' }, { range: [13.1, 17.2], color: '#9EE898' }, { range: [17.2, 20], color: '#E6787D' },]}
                                            />
                                        </View>

                                    </View>
                                }]} style={{}}></Tile>
                                

                            </View>
                        </View>



                    }}

                    renderFixedBar={(animateForm) => {
                        return <View style={{ flex: 1, backgroundColor: '#839192' }}>
                            <FilterLine filterList={this.filterList} textStyle={{ color: '#fff' }} style={{ height: 50, flex: 1 }}
                                items={this.state.filterItems}
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
    container: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#3498db',
        borderTopColor: '#3498db',
        transform: [{ rotateZ: '-45deg' }]
    },
    offsetLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'grey',
        borderTopColor: 'grey',
        transform: [{ rotateZ: '-135deg' }]
    }
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
        userHealthInfo: state.userHealthInfo,
    }
}, mapDispatchToProps)(MedicalTestsOld);