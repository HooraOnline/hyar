import React, { Component } from 'react';
import {
  Text, Button, Icon, Item, Input, Body, FooterTab, Left, Right,Row
} from 'native-base';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import ActionForm from './ActionForm';
import { Actions } from 'react-native-router-flux';
import { ActionCreators } from '../../aRedux';
import { publicStyle } from '../../assets/them/styles';
import FilterBar from '../tools/FilterBar';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, dataList: [], pageIndex: 0, showSearchBox: false, fetchCondition: {} }

  }
  loadData = (pageIndex, onscroll, ) => {
    this.setState({ inProgress: true })
    let pageSize = this.props.pageSize || 10;
    //let condition={ and: [{ sellerId: this.props.cUser.id }, { paymentMethod: "check" }, { or: [{ step: "newCheck" }, { step: "resend" }, { step: "checkConfirm" }, { step: "checkSpend" }, { step: "checkPassed" }, { step: "checkBacked" }] }] };
    return this.props.fetchPagedList(this.props.apiPath, null, this.state.fetchCondition, "id asc", pageIndex, pageSize).then(tList => {
      if (onscroll)
        this.state.dataList = this.state.dataList.concat(tList);
      else
        this.state.dataList = tList;
      this.setState({ inProgress: false });
    }).catch(e => {
      this.setState({ inProgress: false });
    });
  }
  onFilter=(filter,filterBox)=>{
    let condition = { or: [] };
    condition.or.push(filter)
    this.search(condition);
  }
  search = (pageIndex) => {
    let condition = { or: [] };
    this.props.textSearchFields = this.props.textSearchFields || []
    this.props.textSearchFields.map((sfield) => {
      condition.or.push({ [sfield]: this.state.searchText })
    });
    this.state.fetchCondition = condition;
    this.state.dataList = [];
    this.state.pageIndex = 0;

    this.loadData(pageIndex)
      .then(() => {
        this.state.inSearching = true;
      });
  }
  removeFilter = () => {
    this.state.dataList = [];
    this.setState({ inSearching: false });
  }
  componentWillMount() {


  }
  render() {
    return (
      <ActionForm
        super={this}
        ref={(ref) => { this.baseForm = ref; }}
        accessCode="rg12"
        showReturnedBtn={false}
        showActionBtn={false}
        formName='EnterMobile'
        textSearchFields={this.props.textSearchFields || []}
        showActionFooter={true}
        showActionHeader={true}
        headerStyle={{ backgroundColor: '#fff' }}
        ref={(ref) => { this.form = ref; }}
        action='addEntity'
        apiPath='members'
        filterFilds={this.props.filterFilds}
        renderCustomHeader={() => {
          return <Body style={{ flex: 1 }}>
            <Item style={{ backgroundColor: '#fff', borderBottomWidth: 0 }}>
              <Button transparent iconRight sttyle={{ width: 10 }} onPress={() => { Actions.pop(); }}>
                <Icon name='ios-arrow-round-forward' style={{ fontSize: 30, color: '#888888' }} />
              </Button>
              <Input onChangeText={searchText => { this.setState({ searchText }) }} value={this.state.searchText} />
              <Button transparent onPress={() => { this.search(0) }} >
                <Icon name="ios-search" style={{ marginTop: 5 }} />
              </Button>
            </Item>
          </Body>
        }
        }
        renderCustomFooter={() => {
          return <FilterBar listLength={this.state.dataList ? this.state.dataList.length : 0} filterFilds={this.props.filterFilds} onFilter={this.onFilter}  onRemoveFilter={this.removeFilter} />
        }
        }
        onScroll={(event) => {
          //console.log(event.nativeEvent.contentOffset.y);
          let itemHeight = this.props.itemHeight;
          let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
          let currentItemIndex = Math.ceil(currentOffset / itemHeight);
          let pageSize = this.props.pageSize || 10;
          let pageIndex = Math.floor(currentItemIndex / pageSize) + 1;
          //let pageIndex=Math.floor(currentItemIndex/1)+1;
          // let pageIndex=currentItemIndex;

          if (this.state.pageIndex < pageIndex) {
            this.state.pageIndex = pageIndex;
            this.loadData(pageIndex, true)
          }

        }}
        content={(actionForm)=>{
          return <View>
             {
              this.state.dataList.map((item) => {
                return <Row key={item.id} style={this.state.selectedItem == item ? { backgroundColor: listFormStyle.selected.backgroundColor } : {}} onPress={() => this.onPressRow(item)}>
                  {
                    this.props.renderItem(item)
                  }
                </Row>
              })
            }
           
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
    model: state.cUser,
  }
}, mapDispatchToProps)(SearchForm);





