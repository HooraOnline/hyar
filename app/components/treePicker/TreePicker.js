import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OneElPicker } from './src/OneElPicker';
import { MultiplePicker } from './src/MultiplePicker';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Card,
    CardItem, Form, Item, Input, Icon, Picker, Toast, Label, Thumbnail, ScrollView, ActionSheet, FooterTab, Footer
    , Col, Row, Grid, List, ListItem, CheckBox, Switch
} from 'native-base';
export class TreePicker extends Component {
    static propTypes = {
        multipleSelection: PropTypes.bool,
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        onPress: PropTypes.func,
        onSelect: PropTypes.func,
        onRemoveItem: PropTypes.func,
        selectParent: PropTypes.bool,
        selectAllChildren: PropTypes.bool,
        style: PropTypes.shape({
            text: PropTypes.shape({
                color: PropTypes.string
            }),
            icon: PropTypes.shape({
                color: PropTypes.string
            }),
            underline: PropTypes.shape({
                borderBottomColor: PropTypes.string,
                paddingBottom: PropTypes.number
            }),
            firstBtnColor: PropTypes.string,
            scndBtnColor: PropTypes.string,
            firstBtnTxtColor: PropTypes.string,
            scndBtnTxtColor: PropTypes.string
        }),
        firstBtnTitle: PropTypes.string,
        scndBtnTitle: PropTypes.string,
        customTitle: PropTypes.func,
        clearAfterSelect: PropTypes.bool,
        searchOnlyFinalChild: PropTypes.bool,
        selectedItems: PropTypes.array,
        modal: PropTypes.bool,
    }

    static defaultProps = {
        multipleSelection: true,
        selectParent: false,
        selectAllChildren: false,
        style: {
            text: {
                color: 'white'
            },
            icon: {
                color: 'white'
            },
            underline: {
                borderBottomColor: 'white',
                paddingBottom: 10
            },
            firstBtnColor: '#1A3D80',
            scndBtnColor: 'white',
            firstBtnTxtColor: 'white',
            scndBtnTxtColor: 'black'
        },
        firstBtnTitle: null,
        scndBtnTitle: null,
        customTitle: null,
        clearAfterSelect: false,
        searchOnlyFinalChild: false,
        selectedItems:[],
        modal: false,
        horizontal:false,
    }
    showPickerTitle = () => {
        if (this.props.customTitle) {
            return this.props.customTitle(this.toVisible);
        }
        return (
            <View>
                <TouchableOpacity onPress={this.toVisible}>
                    <View style={styles.row}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[styles.titleText, this.props.style.text]}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.arrowImage}>
                            <Icon name="md-arrow-dropdown" color={this.props.style.icon.color} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[styles.underline, this.props.style.underline]} />
            </View>
        )
    }
    render() {
        
        if (this.props.multipleSelection) {
            return (
                <MultiplePicker
                    title={this.props.title}
                    data={this.props.data}
                    onSelect={this.props.onSelect}
                    onRemoveItem={this.props.onRemoveItem}
                    onPressNode={this.props.onPressNode}
                    selectParent={this.props.selectParent}
                    selectAllChildren={this.props.selectAllChildren}
                    style={this.props.style}
                    firstBtnTitle={this.props.firstBtnTitle}
                    scndBtnTitle={this.props.scndBtnTitle}
                    clearAfterSelect={this.props.clearAfterSelect}
                    searchOnlyFinalChild={this.props.searchOnlyFinalChild} 
                    selectedItems={this.props.selectedItems} 
                    modal={this.props.modal}
                    horizontal={this.props.horizontal}/>
                   
            );
        }
        return (
            <OneElPicker
                title={this.props.title}
                data={this.props.data}
                onSelect={this.props.onSelect}
                onPressNode={this.props.onPressNode}
                selectParent={this.props.selectParent}
                style={this.props.style}
                firstBtnTitle={this.props.firstBtnTitle}
                scndBtnTitle={this.props.scndBtnTitle}
                clearAfterSelect={this.props.clearAfterSelect}
                searchOnlyFinalChild={this.props.searchOnlyFinalChild} 
                modal={this.props.modal}/>
        );

    }
}
