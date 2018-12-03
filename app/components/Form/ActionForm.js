import React, { Component } from 'react';
import { Container, Text, Toast, Header, Content, Footer, Body, ProgressBar, View, Icon, Button, FooterTab, Left, Right } from 'native-base';
import { ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { publicStyle } from '../../assets/them/styles';
import { ProgressBarPT } from './ProgressBarPT';
import { dataAdapter } from '../../lib/dataAdapter';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../aRedux';
import connect from 'react-redux/lib/connect/connect';

class ActionForm extends Component {
  constructor(props) {
    super(props)

    this.state = { mobile: '09', inProgress: false }
  }
  doAction = () => {
    let action = this.props.action
    if (action == 'getData')
      this.getData();
    else if (action == 'saveEntity')
      this.saveEntity();
  }
  validate = (entity) => {
    return this.props.onValidate ? this.props.onValidate(entity, this) : '';
  }
  isValidData = (entity) => {
    this.onbeforeValidation(entity);
    let validationErrMessage = this.validate(entity);
    if (validationErrMessage) {
      Toast.show({
        text: validationErrMessage,
        duration: 3000,
        type: 'danger',
        position: "top"
      })
      return
    }
    this.onafterValidation(entity);
    return true;
  }
  beforeValidation = () => {

  }
  onbeforeValidation = this.props.onbeforeValidation || this.beforeValidation

  afterValidation = (entity) => {

  }
  onafterValidation = this.props.onafterValidation || this.afterValidation

  getData = () => {
    let ref = this.props.super;
    let entity = this.props.entity;
    if (!this.isValidData(entity)) return;
    this.setState({ inProgress: true });
    if (this.props.onbeforeAction)
      this.props.onbeforeAction(entity);
    let urlParam = this.props.actionsParams(this.props.entity, this);
    dataAdapter.get(this.props.apiPath, null, this.props.filter, urlParam)
      .then(
        (res) => {
          this.setState({ inProgress: false });
          if (this.props.storeKey)
            this.props.doDispatch(this.props.storeKey, this.props.xPath ? res[this.props.xPath] : res);
          if (this.props.onActionSuccess)
            this.props.onActionSuccess(res, this);
        }
      )
      .catch(
        (e) => {
          this.setState({ inProgress: false });
          if (this.props.onActionFailed)
            this.props.onActionFailed(e, this);
        }
      )
  }
  saveEntity = (entity) => {
    entity = entity || this.props.entity || this.props.currentEntity;
    let ref = this.props.super;
    if (!this.isValidData(entity)) return;
    this.setState({ inProgress: true });
    if (this.props.onbeforeAction)
      this.props.onbeforeAction(entity);
    if (entity.id)
      this.props.updateEntity(this.props.apiPath, entity, this.props.storeKey).then((res) => {
        if (this.props.onActionSuccess)
          this.props.onActionSuccess(res, this);
        this.setState({ inProgress: false });
        this.actionSuccess();
      }).catch(e => {
        this.setState({ inProgress: false });
        if (this.props.onActionFailed)
          this.props.onActionFailed(e, this);
        this.actionFailed();
      });
    else
      this.props.addEntity(this.props.apiPath, [entity], this.props.storeKey).then((res) => {
        if (this.props.onActionSuccess)
          this.props.onActionSuccess(res, this);
        this.setState({ inProgress: false });
        this.actionSuccess();
      }).catch(e => {
        this.setState({ inProgress: false });
        if (this.props.onActionFailed)
          this.props.onActionFailed(e, this);
        this.actionFailed();
      });
  }
  actionSuccess = () => {
    this.props.successMsg &&
      Toast.show({
        text: this.props.successMsg,
        duration: 3000,
        type: 'danger',
        position: "top"
      })
  }
  actionFailed = () => {
    Toast.show({
      text: this.props.onFiledMassage || 'خطا در انجام عملیات.',
      duration: 3000,
      type: 'danger',
      position: "top"
    })
  }
  render() {
    let cUser = {};
    cUser.accessList = ['rg12']
    if (this.props.accessCode && cUser.accessList.indexOf(this.props.accessCode) == -1)
      return (
        <Text style={{ justifyContent: 'center', alignSelf: "center", justifyContent: "center", color: 'red', padding: 15, paddingTop: 30 }} > شما به این صفحه دسترسی ندارید.</Text>
      );
    return (
      <Container style={{ backgroundColor: '#fff', height: 220 }}>
        {
          this.props.showActionHeader &&
          <Header style={this.props.headerStyle || publicStyle.header}>
            {
              this.props.showActionBtn && <Left style={{}}>
                <Button transparent onPress={() => { this.doAction() }}>
                  <Icon name='md-checkmark' style={{ color: '#fff' }} />
                </Button>
              </Left>
            }
            {
              this.props.headerActions &&
              this.props.headerActions.map(action => {
                return <Left key={Math.random().toString()}>
                  <Button transparent
                    onPress={() => {
                      action.onPress(this);
                    }}>
                    <Icon style={{ color: '#fff' }} name={action.icon} />
                  </Button>
                </Left>
              })
            }
            {

              this.props.title &&
              <Body>
                <Text style={[publicStyle.textheader, {}]}>
                  {this.props.title}
                </Text>
              </Body>
            }
            {
              this.props.showReturnedBtn != false && <Right style={{ width: 30 }}>
                <Button transparent onPress={() => { Actions.pop(); }}>
                  <Icon name='ios-arrow-round-back' style={this.props.returnBtnStyle || { fontSize: 30, color: '#fff' }} />
                </Button>
              </Right>
            }
            {
              this.props.renderCustomHeader &&
              this.props.renderCustomHeader()
            }
          </Header>
        }
        <ProgressBarPT show={this.state.inProgress} />
        <Content style={this.props.formStyle} scrollEventThrottle={3} onScroll={this.props.onScroll}>

          {
            this.props.onbeforDatabind &&
            this.props.onbeforDatabind(this.props.entity)
          }
          {
            this.props.content &&
            this.props.content(this, this.props.entity || this.props.currentEntity)
          }

        </Content>
        {
          this.props.showActionFooter &&
          <Footer style={{ backgroundColor: '#fff' }}>
            {this.props.footerActions &&
              this.props.footerActions.map(action => {
                return <FooterTab style={publicStyle.footer} key={Math.random().toString()}>
                  <Button transparent
                    onPress={() => {
                      action.onPress(this);
                    }}
                  >
                    <Icon style={{ color: action.color || '#084D54' }} name={action.icon} />
                  </Button>
                </FooterTab>
              })
            }
            {this.props.footerText &&
              <View style={{ flex: 1, flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text style={{ textAlign: 'center', }}>{this.props.footerText}</Text></View>
            }
            {
              this.props.renderCustomFooter &&
              this.props.renderCustomFooter()
            }
          </Footer>
        }


      </Container>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state, props) => {
  return {
    store: state,
    entity: state[props.storeKey],
  }
}, mapDispatchToProps)(ActionForm);
