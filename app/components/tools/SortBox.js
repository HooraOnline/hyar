import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Grid, Col, Row, Item, ListItem, CheckBox, Input, Radio } from 'native-base';
import { publicStyle } from '../../assets/them/styles';
import { Util } from '../../lib/util';
export default class SortBox extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, pageIndex: 0, selectedField: {}, sort: { mobile: '09196421264' } }

  }
  onClose = () => {
    if (this.props.onPressCloseBtn)
      this.props.onPressCloseBtn()
  }
  onSelect = (sort) => {

    this.setState({ selectedField: field })
  }


  render() {
    return (
      <View style={{ flex: 1, }}>
        {
          this.props.sortFilds &&
          this.props.sortFilds.map(item => {
            return <ListItem key={Math.random()} style={{}} onPress={() => { }}>
              <Radio style={{ paddingHorizontal: 10 }} onPress={() => { this.onSelect(item.sort) }} selected={true} />
              <Text style={{ fontSize: 15 }}>{item.caption}</Text>
            </ListItem>
          })
        }
      </View>
    );
  }
}