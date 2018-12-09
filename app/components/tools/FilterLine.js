
import React, { Component } from 'react';
import { Header, Text, Col, Row, View, } from 'native-base';
import { ScrollView } from 'react-native';
export default class FilterLine extends Component {
    constructor(props) {
        super(props)
        this.state = { items: props.items }

    }

    render() {
        // if(!this.props.items ||!this.props.items.lenght)
        //     return null
        return (
            <ScrollView horizontal={this.state.items.length > 3?true:false} >
                <Row style={[{ flex: 1, alignSelf: 'center', }, this.props.style]} >
                    {
                        this.state.items &&
                        this.state.items.map((i, index) => {
                            return <Col key={Math.random()} style={{ width: i.width || null, flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.props.items.map((f) => f.selected = false)
                                    i.selected = true;
                                    let filter = {}
                                    filter.index = index;
                                    filter[i.field] = i.value;
                                    if (this.props.onfilter)
                                        this.props.onfilter(i, this.props.list, this);
                                    this.props.filterList(filter);
                                }}>
                                {
                                    i.text &&
                                    <Text style={[{ borderBottomColor: '#00ced1', borderBottomWidth: i.selected ? 2 : 0, padding: 12, color: '#000', fontSize: 14, fontFamily: 'iran_sans', textAlign: 'center', }, this.props.textStyle]}>{i.text}</Text>
                                }
                            </Col>
                        })
                    }
                </Row>
            </ScrollView>


        );
    }
}