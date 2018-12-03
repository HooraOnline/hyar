import React, { Component } from "react";
import { Animated, Dimensions, Platform, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title, } from "native-base";
// import LinearGradient from "react-native-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");



export default class AnimatForm extends Component {
    //monitorHight = this.props.monitorHight || null;
    // HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
    HEADER_HEIGHT =this.props.headerHeight ||50;
    SCROLL_HEIGHT = this.props.monitorHight - this.HEADER_HEIGHT;
    THEME_COLOR = this.props.headerColor || "rgba(15,186,255, 0.8)";
    FADED_THEME_COLOR = "rgba(255,186,255, 1)";
    nScroll = new Animated.Value(0);

    scroll = new Animated.Value(0);
    textColor = this.scroll.interpolate({
        inputRange: [0, this.SCROLL_HEIGHT / 5, this.SCROLL_HEIGHT],
        outputRange: [this.THEME_COLOR, this.FADED_THEME_COLOR, "white"],
        extrapolate: "clamp"
    });
    tabBg = this.scroll.interpolate({
        inputRange: [0, this.SCROLL_HEIGHT],
        outputRange: [this.props.animateHeaderStartColor || "white", this.THEME_COLOR],
        extrapolate: "clamp"
    });
    tabY = this.nScroll.interpolate({
        inputRange: [0, this.SCROLL_HEIGHT, this.SCROLL_HEIGHT + 1],
        outputRange: [0, 0, 1]
    });
    headerBg = this.scroll.interpolate({
        inputRange: [0, this.SCROLL_HEIGHT, this.SCROLL_HEIGHT + 1],
        outputRange: ["transparent", "transparent", this.THEME_COLOR],
        extrapolate: "clamp"
    });
    imgScale = this.nScroll.interpolate({
        inputRange: [-25, 0],
        outputRange: [1.1, 1],
        extrapolateRight: "clamp"
    });
    imgOpacity = this.nScroll.interpolate({
        inputRange: [0, this.SCROLL_HEIGHT],
        outputRange: [1, 0],
    });

    constructor(props) {
        super(props);
        this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    }

    render() {
        return (
            <View style={this.props.style}>
                <Animated.View style={{ position: "absolute", width: "100%", backgroundColor: this.headerBg, zIndex: 1 }}>
                    <Header style={{ backgroundColor: "transparent" }} hasTabs>
                        <Body>
                            <Title>
                                <Animated.Text style={{ color: this.textColor, }}>
                                    {this.props.title}
                                </Animated.Text>
                            </Title>
                        </Body>
                    </Header>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
                    style={{ zIndex: 0 }}>

                    <Animated.View style={{
                        transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }],
                        backgroundColor: this.THEME_COLOR
                    }}>
                        {
                            this.props.renderMonitor &&
                            <Animated.View style={{ height: this.props.monitorHight, width: "100%", opacity: this.imgOpacity, }}>
                                {
                                    this.props.renderMonitor()
                                }
                            </Animated.View>
                        }
                    </Animated.View>
                    <Tabs
                        prerenderingSiblingsNumber={3}
                        renderTabBar={(props) => <Animated.View
                            style={{ transform: [{ translateY: this.tabY }], zIndex: 1, width: "100%", backgroundColor: "white" }}>
                            <ScrollableTab {...props}
                                renderTab={(name, page, active, onPress, onLayout) => (
                                    <Animated.View key={Math.random()}
                                        style={this.props.fixedBarStyle || {
                                            flex: 1,
                                            height: null,
                                            backgroundColor: this.tabBg
                                        }}>
                                        <View style={{ flex: 1 }}>
                                            {this.props.renderFixedBar(this)}
                                        </View>
                                    </Animated.View>
                                )}
                                underlineStyle={{}} />
                        </Animated.View>
                        }>
                        <Tab heading="عنوان">
                            <View style={{ flex: 1, }} >
                                {
                                    this.props.renderBody &&
                                    this.props.renderBody(this)
                                }
                            </View>
                        </Tab>

                    </Tabs>
                </Animated.ScrollView>
            </View>
        )
    }
}