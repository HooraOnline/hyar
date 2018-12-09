
import React, { Component } from 'react';
import {
    Button, Text,
    Icon,
    Row, Col,
} from 'native-base';
import { StyleSheet, View,} from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../aRedux';
import Comment from '../components/Form/Comment';
import MasterPage from './MasterPage';
class EntityComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: props.entity,
            isLoadTramsaction: false,
            isInProgress: false,
            albumHeight: 200,
            isList: true,
            showComments: this.props.showComments || false,
            showCommentTextBox: false
        }
    }
    addToseen = () => {
        if (!this.props.entity)
            return;
        this.props.entity.seen = this.props.entity.seen ? this.props.entity.seen + 1 : 1;
        this.props.updateEntity(this.props.apiPath, this.props.entity);
    }
    componentDidMount() {
        this.addToseen();

    }
    componentWillReceiveProps(props) {
        //this.setState({ showComments: props.showComments })
    }
    render() {

        return (
            <MasterPage
                showMenu={true}
                footertabIndex={1}
                showFooter={false}
                footertabIndex={1}
                isList={true}
                showReturnBtn={true}
                headerTransparent={false}
                headerColor={this.props.headerColor || '#fff'}
                title="نظرات"
                containerStyle={{backgroundColor:'#000'}}
                headerItems={[
                    { text: 'متن خبر', color: '#00ced1', },

                ]}
                onScroll={(e) => {
                    // if (this.state.isList == false)
                    //     this.setState({isList:true});
                }}
            >

                <Comment backgroundColor='#fefefe' style={{ marginTop: 10, }} contentStyle={{}}
                    modelName={this.props.modelName}
                    showCommentTextBox={this.state.showCommentTextBox}
                    model={this.props.entity}
                    entity2={this.props.entity}
                    monitorHight={this.props.monitorHight || 350}
                    pageSize={5}
                    renderEntity={(selectedComment) => <View >
                        <View style={{ flex: 1, borderColor: '#e56c45', borderBottomWidth: 5, marginBottom: 10 }}>
                            {
                                this.props.entityMonitor
                            }
                        </View>
                        <Row style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'#efefef',height:40 }}>
                            <Col style={{ width: 30, alignItems: 'center', }} onPress={() => { this.setState({ showCommentTextBox: true }) }}>
                                <Icon name='ios-add-circle' style={{ fontSize: 32, color: '#000' }} />
                            </Col>
                            <Col style={{ alignItems: 'center',justifyContent:'center',alignItems:'center'}} onPress={() => { this.setState({ showCommentTextBox: true }) }}>
                                <Text>نظرات کاربران</Text>
                            </Col>
                        </Row>
                    </View>
                    }
                />


            </MasterPage>
        )
    }
}

const styles = StyleSheet.create({
    col: {
        alignItems: 'center',

    },

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {
        cUser: state.cUser,
    }
}, mapDispatchToProps)(EntityComments);
