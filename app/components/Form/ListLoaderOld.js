
import React, { Component } from 'react';
import {
  Row, Text
} from 'native-base';
import { View, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../aRedux';
import { publicStyle, listFormStyle } from '../../assets/them/styles';
import { UIhelper } from '../../lib/uiHelper';
import SortBar from '../tools/SortBar';

class ListLoaderOld extends Component {
  constructor(props) {
    super(props)
    this.state = { inLoading: false, dataArray: [], pageIndex: 0, showSearchBox: false, sortbarItems: props.sortbarItems }


  }
  loadData = (pageIndex) => {
    this.setState({ inLoading: true })
    let pageSize = this.props.pageSize || 5;
    //let condition={ and: [{ sellerId: this.props.cUser.id }, { paymentMethod: "check" }, { or: [{ step: "newCheck" }, { step: "resend" }, { step: "checkConfirm" }, { step: "checkSpend" }, { step: "checkPassed" }, { step: "checkBacked" }] }] };
    let apiPath = this.props.apiPath;
    return this.props.fetchPagedList(apiPath, null, this.props.filter || {}, this.sort || this.props.sort || "id asc", pageIndex || 0, pageSize).then(tList => {
      this.state.dataArray = this.state.dataArray.concat(tList);
      this.props.doDispatch("currentList", this.state.dataArray);
      this.setState({ inLoading: false, });
      this.unSelect();
    }).catch(e => {
      this.setState({ inLoading: false, });
    });
  }
  refreshList = () => {
    this.state.dataArray = [];
    this.state.pageIndex = 0;
    this.loadData();
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
  onFilter = (filter, filterBox) => {
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
  onPressRow = (item, row) => {
    let selectedItem = item != this.state.selectedItem ? item : null;
    let rKey = this.props.rKey || "currentEntity";
    this.props.doDispatch(rKey, item);
    if (this.props.onPressRow)
      this.props.onPressRow(item, row, this)
    if (selectedItem)
      this.select(selectedItem)
    else
      this.unSelect(selectedItem)
  }

  select = (item) => {

    this.state.itemAction = this.props.itemAction;
    // this.actionForm.headerActions=this.props.itemAction;
    this.setState({ selectedItem: item, itemAction: this.props.itemAction })
    this.state.isSelectRow = true;
    if (this.props.onSelect)
      this.props.onSelect(item)
  }
  unSelect = () => {
    this.state.itemAction = null;
    this.setState({ selectedItem: null, itemAction: null })
    if (this.props.onunSelect)
      this.props.onunSelect(this.state.selectedItem)
  }
  openSearchForm = () => {
    UIhelper.openSearchForm(
      this.props.apiPath,
      this.props.itemHeight,
      this.props.renderItem,
      this.props.textSearchFields,
      this.props.searchTitle
    )
  }
  renderSelectedItem = () => {
    if (this.state.isSelectRow) {
      this.state.isSelectRow = false;
    }


    if (!this.props.renderSelected || !this.state.selectedItem)
      return null;
    this.scrollToTop();
    return this.props.renderSelected(this.state.selectedItem);

  }
  renderCustomEntity = () => {
    // this.scrollToTop();
    if (this.props.renderCustomEntity)
      return this.props.renderCustomEntity(this.state.selectedItem);
  }
  getLoadingthem = () => {
    let pageSize = this.props.pageSize > 10 ? 10 : this.props.pageSize;
    let conter = Array.from({ length: pageSize });
    if (this.props.loadingTheme)
      return conter.map((c) => {
        return <View key={Math.random()}>
          {
            this.props.loadingTheme(this)
          }
        </View>
      })

    return conter.map((c) => {
      return <View key={Math.random()}>
        {
          <View style={{ flexDirection: 'row', flex: 1, margin: 3, paddingTop: 4, height: 103, borderTopWidth: 0.3, borderRadius: 3, padding: 4, borderColor: '#888' }} >
            <View style={{ backgroundColor: '#eeeeee', borderRadius: 4, height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
              {
                this.state.inLoading &&
                <ActivityIndicator size="small" color="#000" style={{}} />
              }
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ paddingHorizontal: 10, fontSize: 11, fontFamily: 'iran_sans', color: '#000', textAlign: 'left' }}>.................... </Text>
              <Text style={{ fontSize: 10, paddingHorizontal: 10, color: '#000', fontFamily: 'iran_sans_bold', textAlign: 'left' }}>..................................................</Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 12, color: '#555', fontFamily: 'iran_sans', textAlign: 'left' }}>.........................................................................................................................................................................................</Text>
            </View>
          </View>
        }
      </View>
    })
  }
  scrollToTop = () => {
    if (this.scroller)
      this.scroller.scrollTo({ x: 0, y: 11 });
  };
  componentWillMount() {
    this.loadData(0);
  }
  render() {
    return (
      <View style={{ alignSelf: 'stretch', height: '100%', flex: 1 }}>
        {
          this.state.sortbarItems &&
          <SortBar list={this} items={this.state.sortbarItems} onsort={this.props.onsort} style={this.props.sortbarStyle} />
        }
        <ScrollView ref={(ref) => { this.scroller = ref; }} style={{ flex: 1, }} scrollEventThrottle={1} onScroll={(event) => {
          console.log(event.nativeEvent.contentOffset.y);
          if (this.props.onScroll)
            this.props.onScroll(event.nativeEvent.contentOffset.y, event.nativeEvent);
          let itemHeight = this.props.itemHeight || 80;
          let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
          let currentItemIndex = Math.ceil(currentOffset / itemHeight);
          let pageSize = this.props.pageSize
          let pageIndex = Math.floor(currentItemIndex / pageSize) + 1;
          //let pageIndex=Math.floor(currentItemIndex/1)+1;
          // let pageIndex=currentItemIndex;
          if (this.state.pageIndex < pageIndex) {
            this.state.pageIndex = pageIndex;
            this.loadData(pageIndex);
          }
        }}>

          {
            this.renderSelectedItem()
          }
          {
            this.renderCustomEntity()
          }

         
          <FlatList horizontal={this.props.horizontal}
            data={this.state.dataArray}
            renderItem={(row) => {
              return <TouchableOpacity key={row.item.id} style={this.state.selectedItem == row.item ? { backgroundColor: listFormStyle.selected.backgroundColor } : {}} onPress={() => { this.onPressRow(row.item, row); }}>
                {
                  this.props.renderItem &&
                  this.props.renderItem(row.item)
                }
              </TouchableOpacity>
            }
            }
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={1}
            onEndReached={(e) => { }}
          />
          {
            this.state.inLoading &&
            this.getLoadingthem()
          }



        </ScrollView>
      </View>

    )
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
}, mapDispatchToProps)(ListLoaderOld);





