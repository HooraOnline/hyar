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
import FilterLine from '../../components/tools/FilterLine';
import ColorBar from '../../components/tools/ColorBar';


class MedicalTests extends Component {

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
            userHealthInfo: [],

        };
    }

    loadData = () => {

    }
    filterList = (filter) => {
        this.setState({ selectedInfo: this.state.userHealthInfo[filter.index] });
    }
    buildDataSources = (userHealthInfo) => {
        for (let i = 0; i < userHealthInfo.length; ++i) {
            if (userHealthInfo[i].date) {
                this.state.filterItems.push({ text: userHealthInfo[i].date, field: 'date', value: userHealthInfo[i].date, });
                this.state.userHealthInfo.push(userHealthInfo[i])
            }

        }
        if (this.state.filterItems[0])
            this.state.filterItems[0].selected = true;
        this.setState({ userHealthInfo: this.state.userHealthInfo, filterItems: this.state.filterItems, selectedInfo: this.state.userHealthInfo[0], inProgress: false, });
    }
    fetchHealthData = () => {
        let self = this;
        if (this.props.userHealthInfo[0]) {
            this.buildDataSources(this.props.userHealthInfo);
        } else {
            this.setState({ inProgress: true });
            this.props.fetchPagedList('health', 'userHealthInfo', { shm: this.props.cUser.employeeNmber }, 'year:asc').then(nList => {
                console.log(nList)
                this.buildDataSources(nList);
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
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>سن:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selectedInfo && this.state.selectedInfo.age} سال</Text></Text>
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>وزن:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selectedInfo && this.state.selectedInfo.weight} کیلو</Text></Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>قد:  <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selectedInfo && this.state.selectedInfo.stature} سانتی متر</Text></Text>
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ fontSize: 13, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, textAlign: 'left' }}> <Text style={{ fontSize: 15, fontFamily: 'iran_sans', color: '#fff', paddingHorizontal: 5, }}>{this.state.selectedInfo && this.state.selectedInfo.bmi}</Text> :BMI </Text>
                                        </Col>
                                    </Row>

                                </Grid>
                            </ImageBackground>
                        </View>
                    }}
                    renderBody={(animateForm) => {
                        if (this.state.inProgress)
                            return <Text style={{ padding: 10, fontFamily: 'iran_sans' }}>در حال بارگذاری.</Text>;
                        if (!this.state.selectedInfo)
                            return <Text style={{ padding: 10, fontFamily: 'iran_sans' }}>هیچ آزمایشی برای شما ثبت نشده است.</Text>;
                        console.log(this.state.selectedInfo.sgot)

                        return <View style={{ flex: 1, }}>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>آنزیم کبدی (SGOT)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.sgot}
                                        ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 40], color: '#9EE898' }, { range: [40, 100], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>آنزیم کبدی (SGPT)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.sgpt}
                                        ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 40], color: '#9EE898' }, { range: [40, 100], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>اسید اوریک (URICACID)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar style={{ marginTop: 10 }} height={15} width={330} pin={this.state.selectedInfo.uricacid}
                                        ranges={[{ range: [0, 3.5], color: '#E6787D' }, { range: [3.5, 7.5], color: '#9EE898' }, { range: [7.5, 10], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>هموگلوببن (hgb)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar style={{ marginTop: 10 }} width={330} height={15} pin={this.state.selectedInfo.hgb}
                                        ranges={[{ range: [0, 13.1], color: '#E6787D' }, { range: [13.1, 17.2], color: '#9EE898' }, { range: [17.2, 20], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>کلسترول خوب (HDL)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.hdl}
                                        ranges={[{ range: [0, 30], color: '#E6787D' }, { range: [30, 80], color: '#9EE898' }, { range: [80, 100], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>کلسترول بد (LDL)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.ldl}
                                        ranges={[{ range: [0, 130], color: '#9EE898' }, { range: [130, 160], color: '#EB984E' }, { range: [160, 200], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>شمارش گلبولهای قرمز (RBC)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.rbc}
                                        ranges={[{ range: [0, 1.6], color: '#E6787D' }, { range: [1.6, 7.4], color: '#9EE898' }, { range: [7.4, 9], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>شمارش گلبورهای سفید (WBC)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.wbc}
                                        ranges={[{ range: [0, 5], color: '#E6787D' }, { range: [5, 10], color: '#9EE898' }, { range: [10, 15], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>نیتروژن اوره (BUN)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.bun}
                                        ranges={[{ range: [0, 20], color: '#E6787D' }, { range: [20, 97], color: '#9EE898' }, { range: [97, 110], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>قند خون ناشتا (SGOT)</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.sgot}
                                        ranges={[{ range: [0, 20], color: '#E6787D' }, { range: [20, 97], color: '#9EE898' }, { range: [97, 110], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                            <View style={styles.tile} >
                                <Text style={{ color: 'green', fontFamily: 'iran_sans', fontSize: 13, paddingTop: 3 }}>تری گلیسرین</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ColorBar width={330} height={15} pin={this.state.selectedInfo.tg}
                                        ranges={[{ range: [0, 150], color: '#9EE898' }, { range: [150, 200], color: '#EB984E' }, { range: [200, 500], color: '#E6787D' },]}
                                    />
                                </View>
                            </View>
                        </View>

                    }}

                    renderFixedBar={(animateForm) => {
                        return   <FilterLine filterList={this.filterList} textStyle={{ color: '#fff' }} style={{ height: 50, flex: 1 }}
                                items={this.state.filterItems}
                            />
                          
                      
                    }

                    }

                >

                </AnimatForm>
            </MasterPage>
        )
    }
}
const styles = StyleSheet.create({
    tile: {
        height: 110,
        backgroundColor: '#ececec',
        margin: 5, padding: 5
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
}, mapDispatchToProps)(MedicalTests);