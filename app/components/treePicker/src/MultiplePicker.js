import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, ActivityIndicator,
    CardItem, Form, Item, Input, Icon, Toast, Label, Thumbnail, ActionSheet, FooterTab, Footer
    , Col, Row, Grid, List, ListItem, CheckBox, Switch
    , Fab
} from 'native-base';
import { picker as styles } from './theme/styles';
import { TouchableItem } from './TouchableItem';


export class MultiplePicker extends Component {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.any),
        onPress: PropTypes.func,
        onSelect: PropTypes.func,
        onRemoveItem: PropTypes.func,
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
        selectAllChildren: PropTypes.bool.isRequired,
        firstBtnTitle: PropTypes.string,
        scndBtnTitle: PropTypes.string,
        customTitle: PropTypes.func,
        clearAfterSelect: PropTypes.bool,
        searchOnlyFinalChild: PropTypes.bool,
        selectedItems: PropTypes.array
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
        clearAfterSelect: false,
        searchOnlyFinalChild: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showChildren: {},
            selectedItems: [],
            data: [],
            model: "آیتم",
            selectedText: "هیچ آیتمی انتخاب نشده!",
            maxForselect: 100,
            searchText: "",
            isLoading: false,
            inSearch: false,
            noItemFound: "",
        };
    }

    onNodePress = (item, hasChild) => {
        if (!hasChild){
            this.onItemPress(item,true);
            return;
        }
         
        this.setState({
            showChildren: {
                ...this.state.showChildren,
                [item.Id]: !this.state.showChildren[item.Id]
            }
        });
    }
    /**
     * Нажатие на элемент в пикере
     */
    onItemPress = (pressedItem, once, Children) => {
        const index = this.state.selectedItems.findIndex(item => item.Id === pressedItem.Id);
        if (!this.props.selectParent) {
            if (once) {
                if (index >= 0) {
                    this.state.selectedItems.splice(index, 1);
                } else {
                    this.state.selectedItems.push(pressedItem.Id);
                }
            }
        } else if (index >= 0) {
            this.state.selectedItems.splice(index, 1);
            this.state.selectedItems.splice(index, 1);
            if (Children && this.props.selectAllChildren) {
                Children.map((item) => {
                    const i = this.state.selectedItems.findIndex(el => el.Id === item.pressedItem.Id);
                    this.state.selectedItems.splice(i, 1);
                    return this.state.selectedItems;
                });
            }
        } else if (Children && this.props.selectAllChildren) {
            this.state.selectedItems.push(pressedItem);
            Children.map((item) => {
                this.state.selectedItems.push(item);
                return this.state.selectedItems;
            });
        } else {
            this.state.selectedItems.push(pressedItem);
        }

        this.setState({});
    }

    onCancelPress = () => {
        this.toVisible();
        this.setState({
            selectedItems: this.props.selectedItems || [],
        })
    }

    selectItem = () => {
        if (this.props.clearAfterSelect) {
            this.setState({
                showChildren: {},
                selectedItems: [],
            })
        }
        this.toVisible();
        this.props.onSelect(this.state.selectedItems);

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
                            <Icon name="md-arrow-dropdown" style={this.props.style.icon} />
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
                            selected={!!this.state.selectedItems.find(el => el.Id === item.Id)}
                            showIcon={item.Children.length > 0}
                            isOpen={this.state.showChildren[item.Id]}
                            value={item.Title}
                            onPress={() => this.onItemPress(item, false, item.Children)}
                            onPressNode={() => this.onNodePress(item, true)} />
                        {this.renderChildren(item.Children, item.Id, 20)}
                    </View>
                );
            }
            return (
                <View key={item.Id} style={{ marginLeft: margin }}>
                    <TouchableItem
                        selected={!!this.state.selectedItems.find(el => el.Id === item.Id)}
                        value={item.Title}
                        onPress={() => this.onItemPress(item, true)}
                        onPressNode={() => this.onNodePress(item, false)} />
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
                this.state.showChildren = {};
                this.setState({ showChildren: {}, data: this.props.data, inSearch: false, searchText: "", noItemFound: "" })
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

        this.state.showChildren[node.Id] = true;
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
                if (this.props.searchOnlyFinalChild) {
                    parentNode.Children.shift();
                    if (node.parent.Id == "root")
                        this.filterNode(node.parent.Children[0], node.parent, text);
                    else
                        this.filterNode(node.parent.parent, node.parent.parent.parent, text);
                } else {
                    delete node.Children;
                    this.filterNode(node.parent, node.parent.parent, text);

                }


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
            Alert.alert("حداقل سه حرف", "حداقل سه حرف از صنف مورد نظر را وارد کنید.")
            return;
        }
        this.searchResult = JSON.parse(JSON.stringify(this.props.data));
        let rootNode = { Id: 'root', Title: "Root Node", Children: this.searchResult };
        try {
            this.setState({ isLoading: true })
            this.filterNode(rootNode, null, text);
        } catch (error) {
            console.log(error)
            this.state.data = this.searchResult;
            this.state.noItemFound = this.searchResult.length > 0 ? "" : "هیچ نتیجه ای پیدا نشد، برای پیدا کردن آیتم مورد نظر بهتر است فقط سه حرف از آن را وارد کنید تا کلمات مشابه پیدا شوند مثلا برای پیدا کردن سوپرمارکت کافی است کلمه مارکت یا مارک را جستجو کنید،همچنین بهتر است کلمات هم معنی را هم برای پیدا کردن یک آیتم ترکیبی امتحان کنید، مثلا برای پیدا کردن دبیرستان غیر انتفاعی ، بهتر است کلماتی مانند، مدرسه، دبیر، انتفا را امتحان کنید تا بتوانید آیتم مورد نظر خود را پیدا کنید"
            this.setState({ inSearch: true, isLoading: false });


        }

    }
    componentWillMount() {
        this.setState({
            data: this.props.data,
            selectedItems: this.props.selectedItems,
            //maxForselect: props.maxForselect,
            //model: props.model,
        })
    }
    render() {
        return (
            <View>

                {this.showPickerTitle()}
                {
                    this.state.selectedItems.length ? <View>
                        {
                            !this.props.horizontal ? <View style={{ flex: 1, borderWidth: 0.2, borderRadius: 0, marginTop: 0, }}>
                                {
                                    this.state.selectedItems.map((item) => {
                                        return <Button key={item.Id} iconLeft style={{ backgroundColor: 'red', justifyContent: 'flex-start', height: 32, borderRadius: 6, margin: 4, }} onPress={() => {
                                            let index = this.state.selectedItems.findIndex(i => i.Id === item.Id);
                                            this.state.selectedItems.splice(index, 1);
                                            if (this.props.onRemoveItem) this.props.onRemoveItem(item, this.state.selectedItems);
                                            this.setState({});
                                        }}>
                                            <Icon name='ios-close' style={{ fontSize: 30, color: '#fff' }} />
                                            <Text style={{  fontSize: 14, color: "#fff" }}> {item.Title}</Text>
                                        </Button>

                                    })
                                }
                            </View> : <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} style={{backgroundColor: '#515A5A', }}>
                                    <View style={{ flex: 1, borderRadius: 0, marginTop: 0,  flexDirection: 'row', padding:4}}>
                                        {
                                            this.state.selectedItems.map((item) => {
                                                return <Button key={item.Id} iconLeft style={{ backgroundColor: 'red', justifyContent: 'flex-start', height: 32, borderRadius: 6, margin: 4, }} onPress={() => {
                                                    let index = this.state.selectedItems.findIndex(i => i.Id === item.Id);
                                                    this.state.selectedItems.splice(index, 1);
                                                    if (this.props.onRemoveItem) this.props.onRemoveItem(item, this.state.selectedItems);
                                                    this.setState({});
                                                }}>
                                                    <Icon name='ios-close' style={{ fontSize: 30, color: '#fff' }} />
                                                    <Text style={{  fontSize: 14, color: "#fff" }}> {item.Title}</Text>
                                                </Button>

                                            })
                                        }
                                    </View>
                                </ScrollView>
                        }
                    </View> : null


                }

                <Modal transparent={this.props.modal} visible={this.state.visible} onRequestClose={this.toVisible} >
                    <Container style={{ flex: 1, backgroundColor: '#efefff', margin: this.props.modal ? 20 : 0, borderWidth: this.props.modal ? 1 : 0, borderColor: '#2E4053', }}>
                        <Header searchBar style={{ backgroundColor: '#2E4053' }}>
                            <Item>

                                <Input placeholder="جستجوی صنف ..." style={{ paddingHorizontal: 10 }} value={this.state.searchText} onChangeText={(searchText) => {
                                    this.setState({ searchText: searchText });

                                }} />
                                {this.renderSearchButtons()}
                            </Item>
                        </Header>
                        <Content >
                            {
                                this.state.noItemFound ? <Text style={{ padding: 10, color: '#7D6608' }}>{this.state.noItemFound}</Text> : null
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
                                                                selected={!!this.state.selectedItems.find(el => el.Id === item.Id)}
                                                                showIcon={item.Children.length > 0}
                                                                isOpen={this.state.showChildren[item.Id]}
                                                                value={item.Title}
                                                                onPress={() => this.onItemPress(item, false, item.Title)}
                                                                onPressNode={() => this.onNodePress(item, true)} />

                                                            {this.renderChildren(item.Children, item.Id, 20)}
                                                        </View>
                                                    );
                                                }
                                                return (
                                                    <View key={item.Id}>
                                                        <TouchableItem
                                                            selected={!!this.state.selectedItems.find(el => el.Id === item.Id)}
                                                            value={item.Title}
                                                            onPress={() => this.onItemPress(item, true)}
                                                            onPressNode={() => this.onNodePress(item, false)} />
                                                    </View>
                                                );
                                            })
                                        }
                                    </ScrollView>

                                </View>
                            </View>

                        </Content>

                        <View style={{ backgroundColor: '#515A5A' }}>
                            {this.state.selectedItems.length > 0 ?
                                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} style={{ flexDirection: 'row', backgroundColor: '#515A5A', }}>
                                    <View style={{ flexDirection: 'row', backgroundColor: '#515A5A' }}>
                                        {
                                            this.state.selectedItems.map((item) => {
                                                return <Button key={item.Id} iconLeft style={{ backgroundColor: 'red', justifyContent: 'flex-start', height: 32, borderRadius: 6, margin: 5, marginVertical: 10 }} onPress={() => {
                                                    let index = this.state.selectedItems.findIndex(el => el.Id === item.Id);
                                                    this.state.selectedItems.splice(index, 1);
                                                    this.setState({});
                                                    if (this.props.onRemoveItem) this.props.onRemoveItem(item, this.state.selectedItems);
                                                }}>
                                                    <Icon name='ios-close' style={{ fontSize: 30, color: '#fff' }} />
                                                    <Text style={{  fontSize: 14, color: "#fff" }}> {item.Title}</Text>
                                                </Button>

                                            })
                                        }


                                    </View>
                                </ScrollView> : <Text style={{ fontSize: 14, color: '#fff', padding: 4 }}> برای انتخاب یک آیتم علامت بعلاوه را لمس کرده و بعد از باز شدن، گروه، چک باکس مورد نظر را تیک بزنید. </Text>}
                        </View>

                        <Footer>
                            <FooterTab style={{ backgroundColor: '#D5D8DC' }}>

                                {this.state.selectedItems.length > 0 &&
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