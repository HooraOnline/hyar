
import React, { Component } from 'react';
import {  Text, Col, Row, View, } from 'native-base';
import { ScrollView } from 'react-native';
export default class SortBar extends Component {
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
        // if(!this.props.items ||!this.props.items.lenght)
        //     return null
        return (
            <ScrollView horizontal={true}  contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <Row style={[{ justifyContent: 'center', alignItems: 'center', height: 10, }, this.props.style]} >
                    {
                        this.props.items &&
                        this.props.items.map(i => {
                            return <Col key={Math.random()} style={{ width: i.width || null, flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.props.items.map((f) => f.selected = false)
                                    i.selected = true;
                                    this.props.list.sort = i.sort;
                                    if (this.props.onsort)
                                        this.props.onsort(i, this.props.list, this);
                                    this.props.list.refreshList();
                                }}>
                                {
                                    i.text &&
                                    <Text style={{ borderBottomColor: '#00ced1', borderBottomWidth: i.selected ? 2 : 0, padding: 2, color: '#000', fontSize: 14, fontFamily: 'iran_sans', textAlign: 'center', }}>{i.text}</Text>
                                }
                            </Col>
                        })
                    }
                </Row>
            </ScrollView>


        );
    }
}