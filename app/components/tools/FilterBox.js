import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Grid, Col, Row, Item, ListItem, CheckBox, Input } from 'native-base';
import { publicStyle } from '../../assets/them/styles';
import { Util } from '../../lib/util';
export default class FilterBox extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, pageIndex: 0, selectedField: {}, filter: {mobile:'09196421264'} }

  }
  onClose = () => {
    if (this.props.onPressCloseBtn)
      this.props.onPressCloseBtn()
  }
  onSelect = (field) => {
    this.setState({ selectedField: field })
  }
 
  renderFilterControls = () => {
    if (this.state.selectedField.name)
      return this.renderControl(this.state.selectedField)
  }
  renderControl = (field) => {
    if (field.dataType == 'string')
      return <Item >
          <Input  placeholder={field.caption+' را وارد کنید.'} />
      </Item>
      if (field.dataType == 'number')
      return <Item >
        <Input keyboardType="numeric"  placeholder={field.caption+' را وارد کنید.'} />
      </Item>
    if (field.dataType == 'array')
      return <View>
        {
          field.attributs.map(att => {
            return <ListItem key={att.key} >
              <Body>
                <Text>{att.caption}</Text>
              </Body>
              <CheckBox color='green' style={publicStyle.checkBox} checked={this.state[att.key]} onPress={(value) => { this.setState({ [att.key]: !this.state[att.key] }) }} />
            </ListItem>
          })
        }

      </View>

    if (field.dataType == 'color')
      return <View>
        {
          field.attributs.map(att => {
            return <ListItem key={att.key} >
              <Body>
                <Text>{att.caption}</Text>
              </Body>
              <CheckBox color={att.key} style={publicStyle.checkBoxColored} checked={this.state[att.key]}  onPress={(value) => { this.setState({ [att.key]: !this.state[att.key] }) }}/>
            </ListItem>
          })
        }

      </View>
  }
  render() {
    return (
      <Container>
        <Header style={this.props.headerStyle || publicStyle.filterBox.header}>
          <Left>
            <Button transparent onPress={this.onClose}>
              <Icon name='ios-close' style={{ fontSize: 30, color: '#fff' }} />
            </Button>
          </Left>
          <Body>
            <Text style={publicStyle.textheader}>فیلتر کردن</Text>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: '#fefefe' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Grid style={{ flex: 0.4, backgroundColor: '#444', height: Util.device.height, }}>
              {
                this.props.filterFilds &&
                this.props.filterFilds.map(item => {
                  return <Row key={item.name} transparent full style={this.state.selectedField.name == item.name ? { backgroundColor: '#fefefe', height: 50, padding: 5 } : { height: 50, padding: 5 }} onPress={() => this.onSelect(item)}>
                    <Text style={this.state.selectedField.name == item.name ? [publicStyle.normalText, { color: '#444' }] : [publicStyle.normalText, { color: '#fff' }]} >{item.caption}</Text>
                  </Row>
                })
              }

            </Grid>
            <View style={{ flex: 0.6, padding: 10 }}>
              {
                this.renderFilterControls()
              }
            </View>
          </View>
        </Content>
        <Footer style={this.props.footerStyle || publicStyle.filterBox.footer}>

          <Button transparent full onPress={()=>{
            if(this.props.onFilter)
             this.props.onFilter(this.state.filter,this)
          }}>
            <Text style={{ color: '#fff', fontSize: 15, paddingTop: 15 }}>فیلتر کن</Text>
          </Button>

        </Footer>
      </Container>
    );
  }
}