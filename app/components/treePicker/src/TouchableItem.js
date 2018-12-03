import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Card,
    CardItem, Form, Item, Input, Icon, Picker, Toast, Label, Thumbnail, ScrollView, ActionSheet, FooterTab, Footer
    , Col, Row, Grid, List, ListItem, CheckBox, Switch
} from 'native-base';

const styles = {
    item: {
        flex: 1,
        padding: 10,
        borderBottomColor: '#B3B3B3',
        borderBottomWidth: 0,
        marginLeft: 10
    },
    text: {
        flex: 1,
        color: '#212121'
    }
};

export class TouchableItem extends Component {
    static propTypes = {
        value: PropTypes.string,
        onPress: PropTypes.func.isRequired,
        showIcon: PropTypes.bool,
        isOpen: PropTypes.bool,
        selected: PropTypes.bool,
        itemToSend: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object])
    }

    static defaultProps = {
        value: null,
        showIcon: false,
        isOpen: false,
        selected: false,
        itemToSend: null
    }

    onPress = () => {
        this.props.onPress(this.props.itemToSend);
    }
    onPressNode = () => {
        this.props.onPressNode(this.props.itemToSend);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.3, height: 50, paddingTop: 11 }}>
                <Col onPress={this.onPressNode} style={{ width: 40 }}>
                    {this.props.showIcon ? <Icon
                        name={!this.props.isOpen ? 'md-add-circle' : 'md-arrow-dropdown-circle'}
                        style={{ fontSize: 30, marginHorizontal: 7, color: '#424949' }} /> :
                        null

                    }
                </Col>
                {
                    !this.props.showIcon && <Col onPress={this.onPress} style={{ width: 50 }}>
                        {this.props.selected ? <Icon name='md-checkbox' style={{ fontSize: 32, marginHorizontal: 7, color: "green" }} /> : <Icon name='ios-checkbox-outline' style={{ fontSize: 32, marginHorizontal: 7, color: "#bbb" }} />}
                    </Col>
                }
                <Col onPress={this.onPressNode} style={{ flex: 1 }}>
                    <Text style={styles.text}>
                        {this.props.value}
                    </Text>
                </Col>

            </View>
        );
    }
}
