import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Animated,
    View, FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../aRedux';
import connect from 'react-redux/lib/connect/connect';
import Line from '../tools/Line';
import SortBar from '../tools/SortBar';
import Api from '../../lib/api';
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 55;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class ListLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            isLoading: true,
            isRefreshing: false,
            pageIndex: 0,
            footerloading: false,
            isCallLoadMore: true,
            scrollY: new Animated.Value(0),
            headerTransparent: true,
            sortbarItems: props.sortbarItems,
        }
    }

    componentDidMount() {
        this.loadData();
    }
    onPressRow = (item, index) => {
        let selectedItem = item != this.state.selectedItem ? item : null;
        let rKey = this.props.rKey || "currentEntity";
        this.props.doDispatch(rKey, item);
        if (this.props.onPressRow) this.props.onPressRow(item, index, this)
        if (selectedItem) this.select(selectedItem); else this.unSelect(selectedItem)
    }
    select = (item) => {
        this.state.itemAction = this.props.itemAction;
        this.state.isRenderSelected = true;
        // this.actionForm.headerActions=this.props.itemAction;
        this.setState({ selectedItem: item, itemAction: this.props.itemAction })
        if (this.props.onSelect)
            this.props.onSelect(item)
    }
    unSelect = () => {
        this.state.itemAction = null;
        this.setState({ selectedItem: null, itemAction: null })
        if (this.props.onunSelect)
            this.props.onunSelect(this.state.selectedItem)
    }
    search = (condition) => {
        this.props.fetchCondition = condition;
        this.state.dataArray = [];
        this.state.pageIndex = 0;
        this.loadData(0)
            .then(() => {
                this.state.inSearching = true;
            });
    }
    filter = (filter, filterBox) => {
        let condition = { or: [] };
        condition.or.push(filter)
        this.search(condition);
    }
    removeFilter = () => {
        this.state.dataArray = [];
        this.setState({ inSearching: false });
        this.state.fetchCondition = {};
        this.state.pageIndex = 0;
        this.loadData(0);
    }
    loadData = (pageIndex) => {
        let pageSize = this.props.pageSize || 10;
        //let condition={ and: [{ sellerId: this.props.cUser.id }, { paymentMethod: "check" }, { or: [{ step: "newCheck" }, { step: "resend" }, { step: "checkConfirm" }, { step: "checkSpend" }, { step: "checkPassed" }, { step: "checkBacked" }] }] };
        let apiPath = this.props.apiPath || 'albums';
        this.setState({ footerloading: true })
        return this.props.fetchPagedList(apiPath, null, this.props.filter || {}, this.sort || this.props.sort || "udate asc", pageIndex || this.state.pageIndex, pageSize).then(tList => {
            var isCallLoadMore = true;
            if (tList.length == 0) isCallLoadMore = false;
            let data = this.state.dataArray.concat(tList);
            this.setState({ dataArray: data, isLoading: false, footerloading: false, isCallLoadMore: isCallLoadMore });
        }).catch(e => {
            this.setState({ isLoading: false, });
        });
    }
    refreshList = () => {
        this.state.dataArray = [];
        this.state.pageIndex = 0;
        this.loadData();
    }
    handleScroll = (event) => {
        if (this.props.onScroll)
            this.props.onScroll()

    }
    scrollToTop = () => {
        //this.flatList.scrollToIndex({ index: 0, viewOffset: 0, viewPosition: 0.5, animated: true, });
    }
    renderSelectedItemImage = () => {
       
        if (this.state.isRenderSelected) {
            this.state.isRenderSelected = false;
        }
        if (!this.props.renderSelected || !this.state.selectedItem)
            return null;
        //this.scrollToTop();
        let item=this.state.selectedItem
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        const itemContentHeight = this.state.scrollY.interpolate({
            inputRange: [50, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        return <Animated.View style={[styles.header, { height: headerHeight }]}>
             {
                 item.image &&
                 <Animated.Image style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },]} source={{ uri:Api.getFilePath('news') + item.image }} />
             }
            
            {
                // this.state.selectedItem &&
                // <Animated.View style={{ height: itemContentHeight, position: 'absolute', top: 150, left: 0, right: 0, backgroundColor: '#efefef', overflow: 'hidden', }}>
                //     <Text>یک ایتم انتخاب شده</Text>
                //    { }
                // </Animated.View>
            }
        </Animated.View>


    }
    renderSelectedItem = () => {
       
        if (this.state.isRenderSelected) {
            this.state.isRenderSelected = false;
        }
        if (!this.props.renderSelected || !this.state.selectedItem)
            return null;
        this.scrollToTop();
        let item=this.state.selectedItem
        return this.props.renderSelected(item)
    }
    renderCustomEntity = () => {
        if (this.props.renderCustomEntity)
            return this.props.renderCustomEntity(this.state.selectedItem);
    }
    showdataArray = () => {
       
        let items = [];
        if (this.state.dataArray.length > 0) {
            let list = <View style={styles.fill}>

                <FlatList
                    ref={(ref) => { this.flatList = ref; }}
                    horizontal={this.props.horizontal}
                    style={[{ paddingTop: this.state.selectedItem? HEADER_MAX_HEIGHT:0 }]}
                    data={this.state.dataArray}
                    renderItem={({ item, index }) => (
                        <View key={item.id} style={{ flex: 1 }}>
                            <TouchableOpacity activeOpacity={0.9} key={item.id} style={[this.state.selectedItem == item ? { backgroundColor: '#D4E6F1' } : {}, this.props.rowStyle || { paddingVertical: 2 }]} onPress={() => { this.onPressRow(item, index); }}>
                                {
                                    this.props.renderItem &&
                                    this.props.renderItem(item)
                                }
                            </TouchableOpacity>
                            <Line margin={2} padding={30} />
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <View style={{ flex: 1 }}>
                            {
                              this.renderSelectedItem()
                            }
                              {
                                this.state.sortbarItems &&
                                <View style={{}}>
                                    <SortBar list={this} items={this.state.sortbarItems} onsort={this.props.onsort} style={[{ flex: 1 }, this.props.sortbarStyle]} />
                                </View>
                            }
                        </View>
                    )}
                    onEndReachedThreshold={1}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        , {
                            listener: event => {
                                this.handleScroll(event);
                            }
                        })
                    }
                    onEndReached={({ distanceFromEnd }) => {
                        // console.warn('on end reached ', distanceFromEnd)
                        if (!this.state.isCallLoadMore) return;
                        let pIndex = this.state.pageIndex + 1;
                        this.state.pageIndex = this.state.pageIndex + 1;
                        this.loadData(pIndex);
                    }}
                    keyExtractor={(item, index) => item.id}
                    ListFooterComponent={this.renderFooter}
                />
                {this.renderSelectedItemImage()}
            </View>

            items.push(list);
        }

        return items;
    }

    renderFooter = () => {
        if (!this.state.footerloading) return null;

        return (
            <View style={{  paddingVertical: 20,   borderTopWidth: 1, borderColor: "#CED0CE"  }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        return (
            <View>
                {this.renderCustomEntity()}
                {this.state.isLoading ? <Text style={{ padding: 20, paddingTop: 70 }}>در حال بارگذاری ...</Text> : this.showdataArray()}
            </View>
        );
    }



}

const styles = StyleSheet.create({
    fill: {
        //flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    redheader: {
        position: 'absolute',
        top: 140,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        overflow: 'hidden',
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        list: state.currentList,
        cUser: state.cUser,
    }
}, mapDispatchToProps)(ListLoader);









// import React, { Component } from 'react';
// import {
//     Row, Text
// } from 'native-base';
// import { View, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
// import connect from 'react-redux/lib/connect/connect';
// import { bindActionCreators } from 'redux';
// import { ActionCreators } from '../../aRedux';
// import { publicStyle, listFormStyle } from '../../assets/them/styles';
// import { UIhelper } from '../../lib/uiHelper';
// import SortBar from '../tools/SortBar';

// import Line from '../tools/Line';
// import { Util } from '../../lib/util';
// const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = 55;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
// class ListLoader2 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             scrollY: new Animated.Value(0),
//             headerTransparent: true,
//             isLoading: false,
//             dataArray: [],
//             pageIndex: 0,
//             showSearchBox: false,
//             sortbarItems: props.sortbarItems
//         };
//     }
//     loadData = (pageIndex) => {
//         this.setState({ isLoading: true })
//         let pageSize = this.props.pageSize || 5;
//         //let condition={ and: [{ sellerId: this.props.cUser.id }, { paymentMethod: "check" }, { or: [{ step: "newCheck" }, { step: "resend" }, { step: "checkConfirm" }, { step: "checkSpend" }, { step: "checkPassed" }, { step: "checkBacked" }] }] };
//         let apiPath = this.props.apiPath;
//         return this.props.fetchPagedList(apiPath, null, this.props.filter || {}, this.sort || this.props.sort || "id asc", pageIndex || 0, pageSize).then(tList => {
//             this.state.dataArray = this.state.dataArray.concat(tList);
//             this.props.doDispatch("currentList", this.state.dataArray);
//             this.setState({ isLoading: false, });
//             this.unSelect();
//         }).catch(e => {
//             this.setState({ isLoading: false, });
//         });
//     }
//     refreshList = () => {
//         this.state.dataArray = [];
//         this.state.pageIndex = 0;
//         this.loadData();
//     }
//     search = (condition) => {
//         this.props.fetchCondition = condition;
//         this.state.dataArray = [];
//         this.state.pageIndex = 0;
//         this.loadData(0)
//             .then(() => {
//                 this.state.inSearching = true;
//             });
//     }
//     onFilter = (filter, filterBox) => {
//         let condition = { or: [] };
//         condition.or.push(filter)
//         this.search(condition);
//     }
//     removeFilter = () => {
//         this.state.dataArray = [];
//         this.setState({ inSearching: false });
//         this.state.fetchCondition = {};
//         this.state.pageIndex = 0;
//         this.loadData(0);
//     }
//     onPressRow = (item, row) => {
//         let selectedItem = item != this.state.selectedItem ? item : null;
//         let rKey = this.props.rKey || "currentEntity";
//         this.props.doDispatch(rKey, item);
//         if (this.props.onPressRow)
//             this.props.onPressRow(item, row, this)
//         if (selectedItem)
//             this.select(selectedItem, row)
//         else
//             this.unSelect(selectedItem)
//     }

//     select = (item, row) => {

//         this.state.itemAction = this.props.itemAction;
//         // this.actionForm.headerActions=this.props.itemAction;
//         this.setState({ selectedItem: item, itemAction: this.props.itemAction })
//         this.state.isSelectRow = true;
//         if (this.props.onSelect)
//             this.props.onSelect(item)
//     }
//     unSelect = () => {
//         this.state.itemAction = null;
//         this.setState({ selectedItem: null, itemAction: null })
//         if (this.props.onunSelect)
//             this.props.onunSelect(this.state.selectedItem)
//     }
//     openSearchForm = () => {
//         UIhelper.openSearchForm(
//             this.props.apiPath,
//             this.props.itemHeight,
//             this.props.renderItem,
//             this.props.textSearchFields,
//             this.props.searchTitle
//         )
//     }
//     renderSelectedItem = () => {
//         if (this.state.isSelectRow) {
//             this.state.isSelectRow = false;
//         }
//         if (!this.props.renderSelected || !this.state.selectedItem)
//             return null;
//         this.scrollToTop();
//         return this.props.renderSelected(this.state.selectedItem);
//     }
//     renderCustomEntity = () => {
//         // this.scrollToTop();
//         if (this.props.renderCustomEntity)
//             return this.props.renderCustomEntity(this.state.selectedItem);
//     }
//     getLoadingthem = () => {
//         let pageSize = this.props.pageSize > 10 ? 10 : this.props.pageSize;
//         let conter = Array.from({ length: pageSize });
//         if (this.props.loadingTheme)
//             return conter.map((c) => {
//                 return <View key={Math.random()}>
//                     {
//                         this.props.loadingTheme(this)
//                     }
//                 </View>
//             })
//         return conter.map((c) => {
//             return <View key={Math.random()}>
//                 {
//                     <View style={{ flexDirection: 'row', flex: 1, margin: 3, paddingTop: 4, height: 103, borderTopWidth: 0.3, borderRadius: 3, padding: 4, borderColor: '#888' }} >
//                         <View style={{ backgroundColor: '#eeeeee', borderRadius: 4, height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
//                             {
//                                 this.state.isLoading &&
//                                 <ActivityIndicator size="small" color="#000" style={{}} />
//                             }
//                         </View>
//                         <View style={{ flex: 1, }}>
//                             <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#000', textAlign: 'left' }}>.................... </Text>
//                             <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#000', fontFamily: 'iran_sans_bold', textAlign: 'left' }}>..................................................</Text>
//                             <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#555', fontFamily: 'iran_sans', textAlign: 'left' }}>.........................................................................................................................................................................................</Text>
//                         </View>
//                     </View>
//                 }
//             </View>
//         })
//     }
//     scrollToTop = () => {
//         if (this.scroller)
//             this.scroller.scrollTo({ x: 0, y: 11 });
//     };

//     _renderScrollViewContent() {
//         if (this.state.isLoading)
//             return this.getLoadingthem()
//         return (
//             <View style={styles.scrollViewContent}>
//                 {
//                     this.state.sortbarItems &&
//                     <SortBar list={this} items={this.state.sortbarItems} onsort={this.props.onsort} style={[{},this.props.sortbarStyle]} />
//                 }

//                 {
//                     this.state.dataArray.map((entity) => {
//                         return <View key={Math.random()} style={{ flex: 1 }}>
//                                     <TouchableOpacity activeOpacity={0.9} key={entity.id} style={[this.state.selectedItem == entity ? { backgroundColor: listFormStyle.selected.backgroundColor || '#D4E6F1' } : {}, this.props.rowStyle || { paddingVertical: 2 }]} onPress={() => { this.onPressRow(entity, this); }}>
//                                         {
//                                             this.props.renderItem &&
//                                             this.props.renderItem(entity)
//                                         }
//                                     </TouchableOpacity>
//                             <Line margin={2} padding={30} />
//                         </View>
//                     })
//                 }

//             </View>
//         );
//     }
//     componentWillMount() {
//         this.loadData(0);
//     }
//     handleScroll = (event) => {
//         console.log(event.nativeEvent.contentOffset.y);
//         if (event.nativeEvent.contentOffset.y < 180)
//             return;
//         if (this.props.onScroll)
//             this.props.onScroll(event.nativeEvent.contentOffset.y, event.nativeEvent);
//         let itemHeight = this.props.itemHeight || 80;
//         let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
//         let currentItemIndex = Math.ceil(currentOffset / itemHeight);
//         let pageSize = this.props.pageSize
//         let pageIndex = Math.floor(currentItemIndex / pageSize) + 1;
//         //let pageIndex=Math.floor(currentItemIndex/1)+1;
//         // let pageIndex=currentItemIndex;
//         if (this.state.pageIndex < pageIndex) {
//             this.state.pageIndex = pageIndex;
//             this.loadData(pageIndex);
//         }

//     }
//     render() {
//         const headerHeight = this.state.scrollY.interpolate({
//             inputRange: [0, HEADER_SCROLL_DISTANCE],
//             outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
//             extrapolate: 'clamp',
//         });
//         const imageOpacity = this.state.scrollY.interpolate({
//             inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//             outputRange: [1, 1, 0],
//             extrapolate: 'clamp',
//         });
//         const imageTranslate = this.state.scrollY.interpolate({
//             inputRange: [0, HEADER_SCROLL_DISTANCE],
//             outputRange: [0, -50],
//             extrapolate: 'clamp',
//         });
//         const redheaderHeight = this.state.scrollY.interpolate({
//             inputRange: [50, HEADER_SCROLL_DISTANCE],
//             outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
//             extrapolate: 'clamp',
//         });
//         return (

//             <View style={styles.fill}>
//                 <ScrollView
//                     style={styles.fill}
//                     scrollEventThrottle={0.5}
//                     showsVerticalScrollIndicator={false}
//                     onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
//                         , {
//                             listener: event => {
//                                 this.handleScroll(event);
//                             }
//                         })
//                     }

//                 >
//                     {this._renderScrollViewContent()}
//                 </ScrollView>
//                 {
//                     //this.state.selectedItem &&
//                     <Animated.View style={[styles.header, { height: headerHeight }]}>
//                         <Animated.Image style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },]} source={{ uri: 'https://images.mentalfloss.com/sites/default/files/munchkin1.jpg' }} />

//                         {/* <View style={[{}]}>
//                                 <Text>یک ایتم انتخاب شده</Text>
//                                 <Text>یک ایتم انتخاب شده</Text>

//                             </View>  
//                      <Animated.View style={[styles.redheader, { height: redheaderHeight }]}>
//                         <Text>یک ایتم انتخاب شده</Text>
//                     </Animated.View> */}

//                     </Animated.View>
//                 }

//             </View>

//         );
//     }
// }

// const styles = StyleSheet.create({
//     fill: {
//         flex: 1,
//     },
//     row: {
//         height: 40,
//         margin: 16,
//         backgroundColor: '#D3D3D3',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     header: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: '#fff',
//         overflow: 'hidden',
//     },
//     redheader: {
//         position: 'absolute',
//         top: 140,
//         left: 0,
//         right: 0,
//         backgroundColor: 'red',
//         overflow: 'hidden',
//     },
//     bar: {
//         marginTop: 28,
//         height: 302,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     scrollViewContent: {
//         marginTop: HEADER_MAX_HEIGHT,
//     },
//     backgroundImage: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         width: null,
//         height: HEADER_MAX_HEIGHT,
//         resizeMode: 'cover',
//     },
// });
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(ActionCreators, dispatch);
// }
// export default connect((state) => {
//     return {
//         list: state.currentList,
//         cUser: state.cUser,
//     }
// }, mapDispatchToProps)(ListLoader2);