import React, { Component } from 'react';
import {
  Text, Item, Input,Content
} from 'native-base';
import { StyleSheet, } from 'react-native';
import { ActionCreators } from '../../aRedux';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import ActionForm from './ActionForm';
class EntityBox extends Component {
  constructor(props) {
    super(props)
    this.state = { inProgress: false, }
  }


  componentWillMount() {
    
  }


  remove = () => {

  }
  render() {

    return (
      <ActionForm
        super={this}
        ref={(ref) => { this.baseForm = ref; }}
        showReturnedBtn={this.props.showReturnedBtn == false ? false : true}
        title={this.props.title || 'ویرایش کاربر'}
        accessCode={this.props.accessCode}
        storeKey={this.props.storeKey || 'currentEntity'}
        showActionFooter={this.props.showActionFooter == false ? false : true}
        showActionHeader={true}
        ref={(ref) => { this.form = ref; }}
        footerActions={this.props.footerActions}
        action={this.props.action}
        apiPath='members'
        showActionBtn={false}
        onValidate={(entity) => {
         
          if (!entity.firstName)
            return 'نام وارد نشده';
          // if (!entity.lastName)
          //   return 'نام خانوادگی وارد نشده';
          // if (!entity.password)
          //   return 'پسورد وارد نشده';
          // if (!entity.mobile)
          //   return $lng.Mobile_number_not_arrived;
          // if (!Util.mobileReg.test(entity.mobile))
          //   return " شماره موبایل وارد شده درست نیست";
          return false;
        }}
        onbeforeAction={(user) => {
         
        }
        }
        onActionSuccess={this.props.onActionSuccess}
        content={() => {
         
          this.props.onbeforDatabind &&
            this.props.onbeforDatabind(this.props.entity);
          if (this.props.dataBind)
             return this.props.dataBind(this.props.entity,this)
        }
        } />
    )
  }
}
const styles = StyleSheet.create({
  
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  
  return {
    entity: state.currentEntity,
  }
}, mapDispatchToProps)(EntityBox);







