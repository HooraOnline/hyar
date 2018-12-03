import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, ActivityIndicator,
    CardItem, Form, Item, Input, Icon, Toast, Label, Thumbnail, ActionSheet, FooterTab, Footer
    , Col, Row, Grid, List, ListItem, CheckBox, Switch
} from 'native-base';
import { picker as styles } from './theme/styles';
import { TouchableItem } from './TouchableItem';


export class OneElPicker extends Component {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.any),
        onPress: PropTypes.func.isRequired,
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
        selectParent: PropTypes.bool.isRequired,
        firstBtnTitle: PropTypes.string,
        scndBtnTitle: PropTypes.string,
        customTitle: PropTypes.func,
        clearAfterSelect: PropTypes.bool
    }

    static defaultProps = {
        title: null,
        data: [],
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
        clearAfterSelect: false
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showChildren: {},
            selected: {},
            data: [],
            model: "آیتم",
            selectedText: "هیچ آیتمی انتخاب نشده!",
            searchText: "",
            isLoading: false,
            inSearch: false,
            noItemFound:"",
        };
    }

    onNodePress = (Id, hasChild) => {
        if (!hasChild)
            return;
        this.setState({
            showChildren: {
                ...this.state.showChildren,
                [Id]: !this.state.showChildren[Id]
            }
        });
    }
    /**
     * Нажатие на элемент в пикере
     */
    onItemPress = (Id, once, title) => {
        if (Id === this.state.selected.Id) {
            this.setState({
                selected: {}
            });
        } else if (once) {
            this.setState({
                selected: {
                    Id,
                    [Id]: !this.state.selected[Id],
                    title
                }
            });
        } else {
            this.setState({
                selected: this.props.selectParent ? {
                    Id,
                    [Id]: !this.state.selected[Id],
                    title
                } : this.state.selected
            });
        }
    }

    onCancelPress = () => {
        this.toVisible();
    }

    selectItem = () => {
        if (this.props.clearAfterSelect) {
            this.setState({
                showChildren: {},
                selected: {}
            })
        }
        this.toVisible();
        this.props.onPress(this.state.selected.Id, this.state.selected.title);
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
                            <Icon name="md-arrow-dropdown" style={{ color: this.props.style.icon.color }} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[styles.underline, this.props.style.underline]} />
            </View>
        )
    }

    /**
     * Показат/скрыть пикер
     */
    toVisible = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    renderChildren = (children, id, margin) => children.map((item) => {
        if (this.state.showChildren[id]) {
            if (item.Children && item.Children.length > 0) {
                return (
                    <View key={item.Id} style={{ marginLeft: margin }}>
                        <TouchableItem
                            selected={this.state.selected[item.Id]}
                            showIcon={item.Children.length > 0}
                            isOpen={this.state.showChildren[item.Id]}
                            value={item.Title}
                            onPress={() => this.onItemPress(item.Id, false, item.Title)}
                            onPressNode={() => this.onNodePress(item.Id, true)} />
                        {this.renderChildren(item.Children, item.Id, 20)}
                    </View>
                );
            }
            return (
                <View key={item.Id} style={{ marginLeft: margin }}>
                    <TouchableItem
                        selected={this.state.selected[item.Id]}
                        value={item.Title}
                        onPress={() => this.onItemPress(item.Id, true, item.Title)}
                        onPressNode={() => this.onNodePress(item.Id, false)} />
                </View>
            );
        }
        return null;
    })

    renderSearchButtons = () => {
        if (this.state.isLoading)
            return <ActivityIndicator />
        else if (this.state.inSearch)
            return <Button transparent style={{}} onPress={() => {
                this.setState({ isLoading: true })
                this.setState({ data: this.props.data, inSearch: false, searchText: "" })
                this.setState({ isLoading: false })
            }}  >
                <Icon name="md-close" style={{ color: 'red', marginBottom: 4 }} />
            </Button>
        else
            return <Button transparent style={{ backgroundColor: 'red' }} onPress={() => {
                this.search(this.state.searchText)
            }}  >
                <Icon name="ios-search" style={{ color: '#fff', marginBottom: 4 }} />
            </Button>
    }
    filterNode2 = (emptyNodes, text, node, parrentNode, childIndex) => {
        if (node.Children) {
            for (let i = 0; i < node.Children.length; ++i)
                this.filterNode(emptyNodes, text, node.Children[i], node, i);
        } else if (node.Title.search(text) == -1) {
            parrentNode.Children.splice(childIndex, 1);
            if (parrentNode.Children & parrentNode.Children.length == 0)
                emptyNodes.push(parrentNode);
        }
    }

    filterNode = (node, parentNode, text) => {
        if (!node.parent)
            node.parent = parentNode;
        if (node.green) {
            if (node.parent.Id == "root")
                throw new Error("Finish");
            node.parent.green = true;
            let child = node.parent.parent.Children.shift();
            node.parent.parent.Children.push(child);
            this.filterNode(node.parent.parent, node.parent.parent.parent, text);
        }
        if (node.Children) {
            if (node.Children.length == 0) {
                if (node.Id == "root")
                    throw new Error("Finish");
                delete node.Children;
                this.filterNode(node.parent, node.parent.parent, text);
            } else {
                this.filterNode(node.Children[0], node, text);
            }
        } else {
            let child = node.parent.Children.shift();
            if (node.Title.search(text) > -1) {
                node.green = true;
                node.parent.Children.push(child);
            }
            this.filterNode(node.parent, node.parent.parent, text);
        }
    }
    search = (text) => {

        if (text.length < 3) {
           Alert.alert("حداقل سه حرف","حداقل سه حرف از صنف مورد نظر را وارد کنید.")
            return;
        }
        this.searchResult = JSON.parse(JSON.stringify(this.props.data));
        let rootNode = { Id: 'root', Title: "Root Node", Children: this.searchResult };
        try {
            this.setState({ isLoading: true })
            this.filterNode(rootNode, null, text);
        } catch (error) {
            this.state.data = this.searchResult;
            this.state.noItemFound=this.searchResult.length>0?"":"هیچ نتیجه ای پیدا نشد، برای پیدا کردن آیتم مورد نظر بهتر است فقط سه حرف از آن را وارد کنید تا کلمات مشابه پیدا شوند مثلا برای پیدا کردن سوپرمارکت کافی است کلمه مارکت یا مارک را جستجو کنید،همچنین بهتر است کلمات هم معنی را هم برای پیدا کردن یک آیتم ترکیبی امتحان کنید، مثلا برای پیدا کردن دبیرستان غیر انتفاعی ، بهتر است کلماتی مانند، مدرسه، دبیر، انتفا را امتحان کنید تا بتوانید آیتم مورد نظر خود را پیدا کنید"
            this.setState({ inSearch: true, isLoading: false });


        }

    }
    componentWillMount() {
        this.setState({
            data: this.props.data,
            //selectedItems: props.selectedItems,
            //maxForselect: props.maxForselect,
            //model: props.model,
        })
    }
    render() {
        return (
            <View>

                {this.showPickerTitle()}
                <Modal transparent={this.props.modal} visible={this.state.visible} onRequestClose={this.toVisible} >
                    <Container style={{ flex: 1 }}>
                        <Header searchBar style={{ backgroundColor: '#2E4053' }}>
                            <Item>

                                <Input placeholder="جستجوی صنف ..." style={{ paddingHorizontal: 10 }} value={this.state.searchText} onChangeText={(searchText) => {
                                    this.setState({ searchText: searchText });

                                }} />
                                { this.renderSearchButtons() }
                            </Item>
                        </Header>
                        <Content >
                            {
                                this.state.noItemFound?<Text style={{padding:10,color:'#7D6608'}}>{this.state.noItemFound}</Text>:null
                            }
                            
                            <View style={styles.absoluteView}>
                                <View style={styles.pickerContainer}>
                                    <ScrollView>
                                        {
                                            this.state.data.map((item) => {
                                                if (item.Children && item.Children.length > 0) {
                                                    return (
                                                        <View key={item.Id}>
                                                            <TouchableItem
                                                                selected={this.state.selected[item.Id]}
                                                                showIcon={item.Children.length > 0}
                                                                isOpen={this.state.showChildren[item.Id]}
                                                                value={item.Title}
                                                                onPress={() => this.onItemPress(item.Id, false, item.Title)}
                                                                onPressNode={() => this.onNodePress(item.Id, true)} />

                                                            {this.renderChildren(item.Children, item.Id, 20)}
                                                        </View>
                                                    );
                                                }
                                                return (
                                                    <View key={item.Id}>
                                                        <TouchableItem
                                                            selected={this.state.selected[item.Id]}
                                                            value={item.Title}
                                                            onPress={() => this.onItemPress(item.Id, true, item.Title)}
                                                            onPressNode={() => this.onNodePress(item.Id, false)} />
                                                    </View>
                                                );
                                            })
                                        }
                                    </ScrollView>

                                </View>
                            </View>
                        </Content>
                        <View style={{ backgroundColor: '#515A5A', maxHeight: 150 }}>
                            <Text style={{ fontSize: 14, color: '#fff', padding: 4 }}> {this.state.selectedText} </Text>
                        </View>
                        <Footer>
                            <FooterTab style={{ backgroundColor: '#D5D8DC' }}>

                                {this.state.selected.Id &&
                                    <Button
                                        style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, height: 40, borderRadius: 6, backgroundColor: this.props.style.firstBtnColor || 'green' }}
                                        onPress={this.selectItem}
                                    >
                                        <Text style={{ fontSize: 12, color: this.props.style.firstBtnTxtColor || "white", }}>{this.props.firstBtnTitle || 'تایید'}</Text>
                                    </Button>
                                }
                                <Button
                                    style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, height: 40, borderRadius: 6, backgroundColor: this.props.style.scndBtnColor || 'red' }}
                                    onPress={this.onCancelPress}
                                >
                                    <Text style={{ fontSize: 12, color: this.props.style.scndBtnTxtColor || "white", }} >{this.props.scndBtnTitle || 'انصراف'}</Text>
                                </Button>

                            </FooterTab>
                        </Footer>
                    </Container>
                </Modal>
            </View>

        );
    }
}
