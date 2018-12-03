import React, { Component } from 'react';
import { View, FooterTab, Button, Icon, Text, } from 'native-base';
import { Modal, Alert } from 'react-native';
import { publicStyle } from '../../assets/them/styles';
import FilterBox from './FilterBox';
import SortBox from './SortBox';
export default class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, pageIndex: 0, }

  }


  render() {
   
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Modal animationType="fade"
          transparent={false}
          backdropOpacity={1}
          visible={this.state.showFilterBox || false}
          style={{ justifyContent: "flex-start", margin: 100 }}
          onRequestClose={() => {
            this.setState({ showFilterBox: false })
          }}>
          <FilterBox filterFilds={this.props.filterFilds} onPressCloseBtn={() => { this.setState({ showFilterBox: false }) }}
            onFilter={(filter, filterBox) => { this.setState({ showFilterBox: false, inFiltering: true }); this.props.onFilter(filter, this, filterBox) }} />
        </Modal>
        <Modal animationType="fade"
          transparent={false}
          backdropOpacity={1}
          visible={this.state.showSortBox || false}
          style={{hieght:200, justifyContent: "flex-end", margin: 100 }}
          onRequestClose={() => {
            this.setState({ showSortBox: false })
          }}>
          <SortBox sortFilds={this.props.sortFilds} onPressCloseBtn={() => { this.setState({ showSortBox: false }) }}
            onSort={(sort, sortBox) => { this.setState({ showSortBox: false, inSorting: true }); this.props.onSort(sort, this, sortBox) }} />
        </Modal>
        {
          this.props.showFilterBtn = !false &&
          <FooterTab style={publicStyle.footer} >
            <Button transparent onPress={() => { this.setState({ showFilterBox: true }) }} >
              <Icon style={{ color: '#084D54' }} name='ios-funnel-outline' />
            </Button>
          </FooterTab>
        }
        {
          this.props.showSortBtn = !false &&
          <FooterTab style={publicStyle.footer} >
            <Button transparent onPress={() => {  this.setState({ showSortBox: true }) }} >
              <Icon style={{ color: '#084D54' }} name='md-funnel' />
            </Button>
          </FooterTab>
        }
        {
          this.state.inFiltering &&
          <FooterTab style={publicStyle.footer} >
            <Button transparent onPress={() => {
              this.setState({ inFiltering: false });
              if (!this.props.onRemoveFilter) {
                Alert.alert('no function set to onRemoveFilter event')
                return;
              }
              this.props.onRemoveFilter(this)
            }}  >
              <Icon style={{ color: '#084D54' }} name='ios-close-circle-outline' />
            </Button>
          </FooterTab>
        }
      </View>

    );




  }
}