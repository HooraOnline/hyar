import React, { Component } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet, Image, Modal, Dimensions } from 'react-native';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Card,
    CardItem, Form, Item, Input, Icon, Picker, Toast, Label, Thumbnail, ScrollView, ActionSheet, FooterTab, Footer
    , Col, Row, Grid, List, ListItem,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';


export class MapSelector extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            searchList: [],
            locationName: "",
            region: {
                latitude: 34.7988575,
                longitude: 48.5150225,
                latitudeDelta: 0.002089409188426714,
                longitudeDelta: 0.006999610483646393,
            },
            coordinate: {
                latitude: 34.7988176,
                longitude: 48.5157226,
            }
        };
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {

                let coordinate = this.props.mark || { latitude: position.coords.latitude, longitude: position.coords.longitude }
                let region = {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.002089409188426714,
                    longitudeDelta: 0.006999610483646393,
                }
                var NY = {
                    lat: coordinate.latitude,
                    lng: coordinate.longitude,
                };
                Geocoder.geocodePosition(NY).then(res => {
                    this.setState({ selectedPosition: res, selectedAddress: res[0].formattedAddress })
                }).catch(err => console.log(err))
                this.setState({ region: region, coordinate: coordinate });
                // Geocoder.fallbackToGoogle("AIzaSyBrRKVkFICRUZnq1MpmwfQzsjKFQn3KV6g");
                // let lat = coordinate.latitude;
                // let lng = coordinate.longitude,;
                // let ret = await Geocoder.geocodePosition({ lat, lng })

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 100000, distanceFilter: 10 },
        );
    }
    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude2: position.coords.latitude,
                    longitude2: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 100000, distanceFilter: 10 },
        );




    }
    componentWillReceiveProps(props) {
        this.setState({ show: props.show })
    }

    render() {
        return (<View style={{ marginTop: 0 }}>
            <Modal
                animationType="none"
                transparent={false}
                visible={this.state.show || false}
                onRequestClose={() => {

                }}>

                <Container>
                    <Header searchBar style={{ backgroundColor: '#555' }}>
                        <Item>
                            <Icon name="md-pin" />
                            <Input placeholder="نام شهر، شهرک،روستا،منطقه،خیابان" style={{ paddingHorizontal: 10 }} onChangeText={locationName => {
                                this.setState({ locationName: locationName })
                            }} />
                            <Button style={{ backgroundColor: 'red' }} onPress={() => {
                                if (this.state.locationName.length == 0)
                                    return;
                                this.setState({ searchList: [], showSearchResult: false })
                                Geocoder.geocodeAddress(this.state.locationName).then(pList => {
                                    this.setState({ searchList: pList, showSearchResult: true })
                                }).catch(err => console.log(err))
                            }}  >
                                <Icon name="ios-search" style={{ marginBottom: 4 }} />
                            </Button>
                        </Item>

                    </Header>
                    <Content >
                        {this.state.searchList.length > 0 && this.state.showSearchResult ?
                            <Text style={{ padding: 5, color: 'red', paddingHorizontal: 10 }}>از نتایج زیر مکان مورد نظر را انتخاب کنید</Text> : null
                        }
                        {this.state.searchList.length == 0 && this.state.showSearchResult ?
                            <View>
                                <Button transparent style={{}} onPress={() => { this.setState({ showSearchResult: false }) }}  >
                                    <Icon name="ios-close-circle" style={{ color: "red", marginBottom: 4, fontSize: 40 }} />
                                </Button>
                                <Text style={{ padding: 5, paddingHorizontal: 10 }}>هیچ موردی پیدا نشد،اگر شهری را جستجو می کنید بهتر است در ابتدای آن کلمه شهر را هم بیاورید، مثلا شهر سنندج یا شهرستان لالجین، به همین ترتیب اگر اسم خیابان یا منطقه را جستجو می کنید این کلمات را در ابتدای نام آن بیاورید، مثلا منطقه سید خندان  یا خیابان شریعتی، یا روستای علی آباد یا شهرک الوند، اگر می خواهید خیابان خاصی را در شهر خاصی جستجو کنید، ابتدا نام شهر سپس نام خیابان را بنویسید، مثلا بنویسید شهرک الوند  خیابان حافظ 5 ، البته در پیدا کردن همیشه نتایج دقیقی بدست نمی آید  دراین موراد می توانید بالن قرمز رنگ را بصورت دستی جابجا کنید</Text>
                            </View> : null
                        }
                        {this.state.searchList.map(item => {
                            return (
                                <Grid key={Math.floor((Math.random() * 1000) + 1).toString()} style={{ margin: 5, borderWidth: 0.4, borderRadius: 5, marginBottom: 5 }} >
                                    <Row style={{ padding: 0 }}
                                        onPress={() => {

                                            let coordinate = {
                                                latitude: item.position.lat,
                                                longitude: item.position.lng,
                                            }

                                            let region = {
                                                latitude: coordinate.latitude,
                                                longitude: coordinate.longitude,
                                                latitudeDelta: 0.002089409188426714,
                                                longitudeDelta: 0.006999610483646393,
                                            }
                                            var NY = {
                                                lat: coordinate.latitude,
                                                lng: coordinate.longitude,
                                            };
                                            Geocoder.geocodePosition(NY).then(res => {
                                                this.setState({ selectedPosition: res, selectedAddress: res[0].formattedAddress, showSearchResult: false })
                                            }).catch(err => console.log(err))
                                            this.setState({ region: region, coordinate: coordinate, searchList: [] });
                                        }}
                                    >

                                        <Col style={{ width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }}>
                                            <Icon name="md-checkmark" style={{ color: '#fff', fontSize: 20 }} />
                                        </Col>
                                        <Col style={{}} >
                                            <Text style={{ padding: 5 }}>{item.formattedAddress}</Text>
                                        </Col>

                                    </Row>
                                </Grid>
                            );
                        })}
                        <View style={{}}>


                            <MapView
                                style={{ height: Dimensions.get("window").height - 100 }}
                                region={this.state.region}
                                onRegionChange={this.onRegionChange}
                                showsCompass={true}
                                showsTraffic={false}
                                zoomEnabled={true}
                                rotateEnabled={true}

                                scrollEnabled={true}
                                pitchEnabled={true}
                                mapType="standard"
                                followsUserLocation={true}
                                showsMyLocationButton={false}
                                // showsUserLocation={true}
                                userLocationAnnotationTitle="شما اینجا هستید"
                                toolbarEnabled={false}
                                onRegionChangeComplete={() => { this.marker.showCallout(); }}
                            >
                                <Marker
                                    ref={(ref) => { this.marker = ref; }}
                                    draggable={true}
                                    key="m1"
                                    title="منو حرکت بده"
                                    coordinate={this.state.coordinate}
                                    pinColor="red"
                                    onDragEnd={(e) => {
                                        let region = {
                                            latitude: e.nativeEvent.coordinate.latitude,
                                            longitude: e.nativeEvent.coordinate.longitude,
                                            latitudeDelta: 0.002089409188426714,
                                            longitudeDelta: 0.006999610483646393,
                                        }
                                        var NY = {
                                            lat: region.latitude,
                                            lng: region.longitude
                                        };
                                        Geocoder.geocodePosition(NY).then(res => {
                                            this.setState({ region: region, selectedPosition: res, selectedAddress: res[0].formattedAddress });
                                            this.marker.showCallout();
                                        }).catch(err => console.log(err))
                                        //this.setState({ coordinate: coordinate });
                                    }
                                    }
                                >
                                    <Icon style={{ fontSize: 80, color: 'red' }} active name="ios-pin" />
                                </Marker>
                            </MapView>

                        </View>

                    </Content>
                    <Footer style={{ backgroundColor: 'red' }}>
                        <Col style={{ backgroundColor: "red" }}>
                            <Text style={{ fontSize: 17, color: '#fff', padding: 10 }}> {this.state.selectedAddress || 'برای انتخاب منطقه بالون قرمز رنگ را جابجا کنید.'} </Text>
                        </Col>
                    </Footer>
                    <Footer>
                        <FooterTab style={{ backgroundColor: '#D5D8DC' }}>
                            <Button style={{}} onPress={() => {
                                if (this.props.onSelect) {
                                    this.props.onSelect(this.state.selectedPosition, this.state.selectedAddress);
                                }
                                this.setState({ show: false })
                            }}>
                                <Icon name="md-checkmark" style={{ color: '#566573' }} />
                            </Button>
                            <Button onPress={() => { this.setState({ show: false }) }} style={{}}>
                                <Icon name="md-close" style={{ color: '#555' }} />

                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Modal>


        </View>)

    }


}


