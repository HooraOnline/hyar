import React, { Component } from 'react';
import {
    Container, Content, Footer, FooterTab, Text, Button, Card,
     Icon, Col, Row, Grid, Badge, 
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../aRedux';
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')
class Services extends Component {
    constructor(props) {
        super(props)
        window.eee = this
        this.state = {
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };


    componentWillMount() {

    }
    render() {
        return (
            <Container style={{ backgroundColor: '#D5D8DC' }}>
                <Row style={{ height: 50, backgroundColor: '#fff', }}>
                    <Col style={{ alignContent: 'center', justifyContent: 'center', width: 50 }} onPress={() => { }}>
                    </Col>
                    <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                        <Text style={{ alignSelf: 'center', color: '#5DADE2' }}>جستجوی سرویس</Text>
                    </Col>
                    <Col style={{ alignContent: 'center', justifyContent: 'center', width: 50 }} onPress={() => { }}>
                        <Icon name='ios-search-outline' style={{ color: '#5DADE2', paddingHorizontal: 10 }} />
                    </Col>
                </Row>
                <Content>
                    <ImageBackground resizeMode="stretch" source={require("../assets/coloured-background.jpg")} style={{ width: '100%', height: height - 70 }}>
                        <Swiper style={styles.wrapper} height={200}  >
                            <View style={{ marginTop: 0, height: '90%' }}>
                                <Grid>
                                    <Row style={{ height: 50, }}>
                                        <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                                            <Text style={{ alignSelf: 'center', color: '#fff' }}>خدمات رفاهی </Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-restaurant' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>رستوران </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-photos' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>وام</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-browsers' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> سهام</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-bookmarks' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>پرونده پزشکی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='logo-buffer' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text>مشاوره </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-brush' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> مهد کودک</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-bus' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>مسافرت</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-calendar' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>هتلینگ</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-card' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>کمک هزینه</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-cash' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>خشکشویی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-clipboard' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>هزینه فوت</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-home' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>خانه سازمانی</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-bicycle' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>ورزش</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-book' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>بیمه عمر</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-bookmarks' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>بیمه تکمیلی</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-chatbubbles' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>باشگاه پیام</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-browsers' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>اماکن رفاهی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-medkit' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>آرایشگاه</Text>
                                        </Col>
                                    </Row>

                                </Grid>
                            </View>
                            <View style={{ height: '90%' }}>
                                <Grid>
                                    <Row style={{ height: 50, }}>
                                        <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                                            <Text style={{ alignSelf: 'center', color: '#fff' }}>خدمات آموزشی </Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-closed-captioning' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> تقویم آموزشی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-man' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>توسعه فردی </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-star' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>شایسته سالاری </Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-book' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>تحصیلات تکمیلی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-disc' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>دانش آفرینی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-share' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>دانش گستری</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-paper' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>مقالات علمی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-grid' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>کتابخانه</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-cart' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>گواهینامه ها</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-hand' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>درخواست آموزش</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-barcode' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>آموزش زبان</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-analytics' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>بدهی آموزشی</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-school' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>پایانامه</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>

                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>

                                        </Col>
                                    </Row>

                                </Grid>
                            </View>
                            <View style={{ height: 400 }}>
                                <Grid>
                                    <Row style={{ height: 50, }}>
                                        <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                                            <Text style={{ alignSelf: 'center', color: '#fff' }}>آگهی بخشی</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-videocam' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>ویدئو پرتال</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-quote' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>پوستر </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-closed-captioning' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> اینفومیشن</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-notifications' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> نوتیفیکیشن</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-pulse' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>مجله دیجیتال </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='logo-hackernews' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> مسابقات</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-images' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>نمایشگاه عکس</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-chatboxes' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>اتاق گفتگو</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-create' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>پرسش و پاسخ</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-leaf' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>تیم های فرهنگی</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-leaf' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text>تیم های هنری </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-bicycle' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> تیم های ورزشی</Text>
                                        </Col>
                                    </Row>

                                </Grid>
                            </View>
                            <View style={{ height: 400 }}>
                                <Grid>
                                    <Row style={{ height: 50, }}>
                                        <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                                            <Text style={{ alignSelf: 'center', color: '#fff' }}>سیستمهای اداری</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-expand' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>مرخصی </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='logo-usd' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>فیش حقوقی </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-document' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> IDOC</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-locate' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>ماموریت </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-recording' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>حضورغیاب</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-people' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>بازنشستگان</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-book' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>Help Desk</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-disc' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>IBSC </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-appstore' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> نظام پیشنها</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-aperture' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>راهبرد</Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-pricetags' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>SAP </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-mail' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>ایمیل </Text>
                                        </Col>
                                    </Row>

                                </Grid>
                            </View>
                            <View style={{ height: 300 }}>
                                <Grid>
                                    <Row style={{ height: 50, }}>
                                        <Col style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => { }}>
                                            <Text style={{ alignSelf: 'center', color: '#fff' }}>ابزارهای سازمانی</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-book' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>دفترچه تلفن </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-disc' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>گیمیفیکیشن </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-closed-captioning' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> نظرسنجی</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{}}>
                                    <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='md-cart' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}>قدردانی </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-basket' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text>مدیریت جلسات </Text>
                                        </Col>
                                        <Col style={styles.col} onPress={() => { }}>
                                            <Icon name='ios-closed-captioning' style={{ fontSize: 40, color: '#ff6d00' }} />
                                            <Text style={{ fontSize: 13 }}> یادگیری</Text>
                                        </Col>
                                    </Row>
                                   
                                </Grid>
                            </View>
                        </Swiper>
                    </ImageBackground>
                </Content>
                <Footer style={{ backgroundColor: '#00ced1', height: 59 }}>
                    <FooterTab style={{ backgroundColor: '#00ced1' }}>
                        <Row style={{ paddingTop: 7 }}>
                            <Col style={{ alignItems: 'center', }}>
                                <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { }}>
                                    <Icon name='ios-apps' style={{ color: '#0E6251' }} />
                                    <Text style={{  fontSize: 13, color: '#0E6251' }}>سرویسها</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', }}>
                                <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { Actions.MainForm() }}>
                                    <Icon name='md-person' style={{ color: '#0E6251' }} />
                                    <Text style={{  fontSize: 12, color: '#0E6251' }}>میز من</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'flex-end' }}  >
                                <Button badge vertical style={{ justifyContent: 'flex-end' }} onPress={() => { Actions.Chat() }}>
                                    <Icon name='ios-chatbubbles' style={{ color: '#D6EAF8' }} />
                                    <Text style={{  fontSize: 13, color: '#fff' }}>پیامرسان</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', padding: 1, }}  >
                                <Button badge vertical style={{ justifyContent: 'flex-end' }}>
                                    <Badge style={{ backgroundColor: 'red', }}><Text style={{ fontSize: 14, marginTop: 5 }} >2</Text></Badge>
                                    <Icon name='ios-information-circle' style={{ color: '#D6EAF8' }} />
                                    <Text style={{  fontSize: 13, color: '#fff' }}>اطلاعیه</Text>
                                </Button>
                            </Col>
                        </Row>
                    </FooterTab>
                </Footer>
            </Container>
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
}, mapDispatchToProps)(Services);
