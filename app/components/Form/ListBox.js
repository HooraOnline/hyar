import React, { Component } from 'react';
import {
  Row
} from 'native-base';
import { View, StyleSheet, FlatList, } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import ActionForm from './ActionForm';
import { ActionCreators } from '../../aRedux';
import { publicStyle, listFormStyle } from '../../assets/them/styles';
import FilterBar from '../tools/FilterBar';
import { UIhelper } from '../../lib/uiHelper';


class ListBox extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, dataArray: [], pageIndex: 0, showSearchBox: false }

  }
  loadData = (pageIndex) => {
    this.setState({ inProgress: true })
    let pageSize = this.props.pageSize || 10;
    //let condition={ and: [{ sellerId: this.props.cUser.id }, { paymentMethod: "check" }, { or: [{ step: "newCheck" }, { step: "resend" }, { step: "checkConfirm" }, { step: "checkSpend" }, { step: "checkPassed" }, { step: "checkBacked" }] }] };
    let apiPath = this.props.apiPath;
    return this.props.fetchPagedList(apiPath, null, this.state.fetchCondition || {}, this.props.sort || "id asc", pageIndex, pageSize).then(tList => {
      this.state.dataArray = this.state.dataArray.concat(tList)
      this.setState({ inProgress: false, });
      this.unSelect();
    }).catch(e => {
      this.setState({ inProgress: false, });
    });
  }
  search = (condition) => {
    this.state.fetchCondition = condition;
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
  componentWillMount() {
    this.loadData(0);
  }
  render() {
    return (
      <ActionForm
        super={this}
        ref={(ref) => { this.actionForm = ref; }}
        accessCode="rg12"
        showReturnedBtn={this.props.showReturnedBtn}
        showActionBtn={false}
        formName={this.props.formName}
        showActionFooter={this.props.showActionFooter}
        showActionHeader={this.props.showActionHeader}
        textSearchFields={this.props.textSearchFields || []}
        title={this.props.title}
        ref={(ref) => { this.form = ref; }}
        action='addModel'
        apiPath={this.props.apiPath}
        headerActions={this.state.itemAction || this.props.headerActions}
        renderCustomFooter={() => {
          if (this.props.filterBar)
            return <FilterBar listLength={this.state.dataArray ? this.state.dataArray.length : 0} filterFilds={this.props.filterFilds} onFilter={this.onFilter} onRemoveFilter={this.removeFilter} sortFilds={this.props.sortFilds} onSort={this.onSort} />
        }
        }
        onScroll={(event) => {
          //console.log(event.nativeEvent.contentOffset.y);
          let itemHeight = this.props.itemHeight || 80;

          let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
          let currentItemIndex = Math.ceil(currentOffset / itemHeight);
          let pageSize = this.props.pageSize
          let pageIndex = Math.floor(currentItemIndex / pageSize) + 1;
          //let pageIndex=Math.floor(currentItemIndex/1)+1;
          // let pageIndex=currentItemIndex;

          if (this.state.pageIndex < pageIndex) {
            this.state.pageIndex = pageIndex;
            this.loadData(pageIndex)
          }

        }}
        content={(actionForm) => {
          return <View formStyle={this.props.formStyle}>
            {/* {

              this.state.dataArray.map((item) => {
                return <Row key={item.id} style={this.state.selectedItem == item ? { backgroundColor: listFormStyle.selected.backgroundColor } : {}} onPress={() => this.onPressRow(item)}>
                  {

                    this.props.renderItem(item)
                  }
                </Row>
              })
            } */}

            <FlatList horizontal={this.props.horizontal}
              data={this.state.dataArray}
              renderItem={(row) => {
                return <Row key={row.item.id}  onPress={() => {if(!this.props.onPressRow)  return; this.onPressRow(row.item, row)}} style={this.state.selectedItem == row.item ? { backgroundColor: listFormStyle.selected.backgroundColor } : {}} >
                  {
                    this.props.renderItem &&
                    this.props.renderItem(row.item)
                  }
                  

                </Row>

              }
              }
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={1}
              onEndReached={(e) => { }}
            />
            {
              this.state.inProgress &&
              <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}   >
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", height: 50, }} ></View>
              </View>
            }
          </View>
        }
        } />

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
}, mapDispatchToProps)(ListBox);





