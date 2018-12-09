import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
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
import FilterLine from '../tools/FilterLine';
import SearchBar from '../tools/SearchBar';
import AnimatForm from './animation/AnimatForm';

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
            headerTransparent: true,
            sortbarItems: props.sortbarItems,
            filterbarItems: props.filterbarItems,
            monitorHight: this.props.monitorHight || 250,
        }
    }

    componentDidMount() {
        this.loadData();
    }
    onPressRow = (item, index) => {
        let selectedItem = item != this.state.selectedItem ? item : null;
        let rKey = this.props.rKey || "currentEntity";
        if (selectedItem)
            this.select(selectedItem)
        else
            this.unSelect(selectedItem)
        if (this.props.onPressRow) this.props.onPressRow(item, index, this)
        this.props.doDispatch(rKey, item);
    }
    select = (item) => {
        this.state.isRenderSelected = true;
        this.setState({ selectedItem: item, monitorHight: null })
        if (this.props.onSelect)
            this.props.onSelect(item)
    }
    unSelect = () => {
        this.setState({ selectedItem: null })
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
    filterList = (filter) => {
        this.filter=filter;
        this.state.dataArray = [];
        this.state.pageIndex = 0;
        this.loadData();
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
        return this.props.fetchPagedList(apiPath, null, this.filter || this.props.filter || {}, this.sort || this.props.sort || "udate asc", pageIndex || this.state.pageIndex, pageSize).then(tList => {
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
        // if (this.flatList)
        //  this.flatList.scrollToIndex({ index: 0, viewOffset: 0, viewPosition: 0.5, animated: true, });
    }
    renderMonitor = (entiy) => {
        if (this.props.renderMonitor)
            return <View style={{ flex: 1,  width: null, height: null }} >
                {
                    this.props.renderMonitor(entiy)
                }
            </View>

        if (entiy && this.props.renderSelectedItem)
            return <View style={{ flex: 1, width: null, height: null }} >
                {
                    this.props.renderSelectedItem(entiy)
                }
            </View>
        if (this.props.renderAlbum)
            return <View style={{ flex: 1,  width: null, height: null }} >
                {
                    this.props.renderAlbum()
                }
            </View>
       
        return null;
    }

    renderFooter = () => {
        if (!this.state.footerloading) return null;
        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        if (this.state.isLoading)
            return (
                <View>
                    <Text style={{ padding: 20, paddingTop: 70 }}>در حال بارگذاری ...</Text>
                </View>
            );
        // if (this.state.dataArray.length == 0)
        //     return (
        //         <View>
        //             <Text style={{ padding: 20, paddingTop: 70 }}>هیچ آیتمی وجود ندارد.</Text>
        //         </View>
        //     );
        return (
            <View>


                <AnimatForm
                    headerColor={this.props.headerColor}
                    monitorHight={this.state.monitorHight}
                    headerHeight={this.props.animateHeaderHeight || 50}
                    animateHeaderStartColor={this.props.animateHeaderStartColor || '#fff'}
                    renderMonitor={() => {
                        return this.renderMonitor(this.state.selectedItem)
                    }}
                    renderBody={(animateForm) => {
                        return <View style={[{ flex: 1, }, this.props.style]}>
                            <FlatList
                                ref={(ref) => { this.flatList = ref; }}
                                horizontal={this.props.horizontal}
                                style={[{}]}
                                data={this.state.dataArray}
                                renderItem={({ item, index }) => (
                                    <View key={item.id} style={{ flex: 1 }}>
                                        <TouchableOpacity activeOpacity={0.9} key={item.id} style={[this.state.selectedItem == item ? { backgroundColor:this.props.selecterRowColor || 'transparent' } : {}, this.props.rowStyle || { paddingVertical: 0 }]} onPress={(e) => { if (this.state.inScroll) return; this.onPressRow(item, index); }}>
                                            {
                                                this.props.renderItem &&
                                                this.props.renderItem(item)
                                            }
                                        </TouchableOpacity>

                                        <Line color={this.props.seperatorColor} height={this.props.seperatorHight || 1} margin={this.props.seperatorMargin || 2} padding={this.props.seperatorPadding || 20} />
                                       
                                    </View>
                                )}
                                ListHeaderComponent={() =>
                                    <View>
                                        <View style={{ flex: 1 }}>
                                            {
                                                this.props.renderListHeader &&
                                                this.props.renderListHeader(this)
                                            }
                                        </View>
                                    </View>

                                }
                                onEndReachedThreshold={1}
                                onScroll={() => this.handleScroll(event)}
                                onScrollBeginDrag={() => { this.state.inScroll = true; }}
                                onScrollEndDrag={() => { this.state.inScroll = false; }}
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
                        </View>
                    }}

                    renderFixedBar={(animateForm) => {
                        return <View style={{ flex: 1 }}>
                            {
                                this.state.sortbarItems &&
                                <View style={{ flex: 1 }}>
                                    <SortBar list={this} items={this.state.sortbarItems} onsort={this.props.onsort} style={this.props.sortbarStyle} />
                                </View>
                            }
                            {
                                this.state.filterbarItems &&
                                <View style={{ flex: 1 }}>
                                    <FilterLine filterList={(filter)=>this.filterList(filter)} items={this.state.filterbarItems} onfilter={this.props.onfilter} textStyle={this.props.filterbartextStyle} style={this.props.filterbarStyle} />
                                </View>
                            }
                            {
                                this.props.serchBarItems &&
                                <View style={{ flex: 1 }}>
                                    <SearchBar list={this} items={this.state.serchBarItems} onsearch={this.props.onsearch} iconStyle={this.props.searchbarIconStyle} style={this.props.searchbarStyle} />
                                </View>
                            }
                        </View>
                    }

                    }

                >

                </AnimatForm>

            </View>

        );
    }



}

const styles = StyleSheet.create({


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



