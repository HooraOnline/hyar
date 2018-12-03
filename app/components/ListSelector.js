import React, { Component } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet, Image, Modal, Dimensions } from 'react-native';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Card,
    CardItem, Form, Item, Input, Icon, Picker, Toast, Label, Thumbnail, ScrollView, ActionSheet, FooterTab, Footer
    , Col, Row, Grid, List, ListItem, CheckBox, Switch
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';



export class ListSelector extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            dataArray: [],
            selectedItems: {},
            model: "آیتم",
            selectedText: "هیچ آیتمی انتخاب نشده!",
            maxForselect: 100,
        };
    }

    pressItem = (item) => {
        let Ids = Object.getOwnPropertyNames(this.state.selectedItems);
        if (this.state.selectedItems[item.Id]) {
            delete this.state.selectedItems[item.Id];
            if (this.props.onUnSelectedItem)
                this.props.onUnSelectedItem(item);
        } else if (Ids.length >= this.state.maxForselect) {
            Alert.alert("محدودیت", "حداکثر " + this.state.maxForselect + " " + this.state.model + " می توانید انتخاب نمایید،فقط " + this.state.model + "های کاملا مرتبط را انتخاب کرده و از انتخاب " + this.state.model + "های غیر مرتبط جدا خودداری کنید")
            return;
        }
        else {
            this.state.selectedItems[item.Id] = item.Title;
            if (this.props.onSelectedItem)
                this.props.onSelectedItem(item);
        }
        Ids = Object.getOwnPropertyNames(this.state.selectedItems);
        this.state.selectedText = "";
        for (let i = 0; i < Ids.length; i++)
            this.state.selectedText += (i + 1) + '-' + this.state.selectedItems[Ids[i]] + '، ';
        this.setState({ selectedItems: this.state.selectedItems, selectedText: this.state.selectedText });
      

    }
    renderChildren = (Children, Id, margin) => Children.map((item) => {

        // if (item.Children && item.Children.length > 0) {
        //     return (<View>
        //         <ListItem Id={item.Id} style={{ padding: 1, marginLeft: margin }} onPress={() => this.pressItem(item)} >
        //             <Col style={{ width: 30 }} onPress={() => this.renderChildren(item.Children, item.Id, 15)} >
        //                 <Icon name="ios-add-circle" style={{ color: '#555' }} />
        //             </Col>
        //             <Body style={{ flex: 1 }}>
        //                 <Text style={{  fontSize: 16, color: '#145A32' }} >{item.Title}</Text>
        //             </Body>
        //             <CheckBox color='#145A32' style={{}} checked={this.state.selectedItems[item.Id] != undefined} onPress={() => this.pressItem(item)} />

        //         </ListItem>

        //         {this.props.openAll ? this.renderChildren(item.Children, item.Id, 15) : null}
        //     </View>

        //     );
        // }
        return (
            <ListItem Id={item.Id} style={{ padding: 1, marginLeft: margin }} onPress={() => this.pressItem(item)} >
                <Col style={{ width: 30 }} >
                    <Icon name="ios-arrow-dropleft-circle" style={{ color: '#555' }} />
                </Col>
                <Body style={{ flex: 1 }}>
                    <Text style={{  fontSize: 16, color: '#145A32' }} >{item.Title}</Text>
                </Body>
                <CheckBox color='#145A32' style={{}} checked={this.state.selectedItems[item.Id] != undefined} onPress={() => this.pressItem(item)} />

            </ListItem>
        );

    })
    comp
    componentWillMount() {
        this.setState({
            show: this.props.show,
            dataArray: this.props.dataArray,
            selectedItems: this.props.selectedItems,
            maxForselect: this.props.maxForselect,
            model: this.props.model,
        })
    }

    render() {
        return (<Modal
            animationType="none"
            transparent={false}
            visible={this.state.show || false}
            onRequestClose={() => {

            }}><Container style={{ flex: 1 }}>
                <Header searchBar style={{ backgroundColor: '#eee' }}>
                    <Item>
                        <Icon name="ios-search" color="#000" style={{ fontSize: 30 }} />
                        <Input placeholder="جستجوی صنف ..." style={{ paddingHorizontal: 10 }} onChangeText={itemName => {
                            if (itemName.length < 1)
                                return
                            let searchList = [];
                            this.props.dataArray.map(item => {
                                if (item.Title.search(itemName) > -1)
                                    searchList.push(item);
                            })
                            this.setState({ dataArray: searchList })
                        }} />
                        <Button transparent style={{}} onPress={() => {
                            this.setState({ dataArray: this.props.dataArray })
                        }}  >
                            <Icon name="md-close" style={{ marginBottom: 4 }} />
                        </Button>
                    </Item>

                </Header>
                <Content >
                    <Form style={{ alignSelf: 'stretch', borderWidth: 0, paddingRight: 0, backgroundColor: '#fff' }}>
                        {this.renderChildren(this.state.dataArray, 'root', 1)}
                    </Form>

                </Content>
                <View style={{ backgroundColor: 'red', maxHeight: 150 }}>

                    <Text style={{ fontSize: 14, color: '#fff', padding: 4 }}> {this.state.selectedText} </Text>

                </View>
                <Footer>
                    <FooterTab style={{ backgroundColor: '#D5D8DC' }}>
                        <Button style={{}} onPress={() => {
                            if (this.props.onSelect) {
                                this.props.onSelect(this.state.selectedItems, this.state.selectedText);
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
        )

    }


}


