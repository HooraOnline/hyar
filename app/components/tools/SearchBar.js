
import React, { Component } from 'react';
import { Header, Text, Col, Row, View, Item,Input,Icon} from 'native-base';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = { inProgress: false, pageIndex: 0, selectedField: {}, sort: { mobile: '09196421264' } }

    }



    render() {
        // if(!this.props.items ||!this.props.items.lenght)
        //     return null
        return (
            <Row style={[{ justifyContent: 'center', alignItems: 'center', height: 50, }, this.props.style]} >
                <Col>
                  
                        <Input placeholder='جستجوی همکار...' />
                   
                </Col>
                <Col style={{ width: 50,paddingHorizontal:10}}>
                    <Icon name="ios-search-outline" size={30} style={{ fontSize: 25, color: '#00ced1' }} />
                </Col>
            </Row>


        );
    }
}