
import React, { Component } from 'react';
import { Text, Icon, View } from 'native-base';
import { TouchableOpacity  } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../aRedux';
import connect from 'react-redux/lib/connect/connect';
class Like extends Component {
  constructor(props) {
    super(props)

    this.state = { userLike: {}, icon: 'md-thumbs-up' }
  }
  like = () => {
    if (this.props.viewMode) return;
    let like = this.state.userLike.id ? this.state.userLike : { modelName: this.props.apiPath, entityId: this.props.entity.id, memberId: this.props.cUser.id };
    like.status = !this.state.userLike.status;

    this.props.updateEntity('likes', like)
      .then((lk) => {
        this.setState({ userLike: lk });
      });
    this.props.entity.like = this.getEntityLikeNumber(like.status)
    this.props.updateEntity(this.props.apiPath, this.props.entity, this.props.storeKey);
  }
  getEntityLikeNumber = (likeStatus) => {
    if (this.props.entity.like == undefined || this.props.entity.like == 0)
      return 1;
    if (likeStatus)
      return this.props.entity.like + 1;
    return this.props.entity.like - 1;
  }
  componentDidMount() {
    let showUserLike = this.props.showUserLike == false ? false : true;
    if (showUserLike == false) return;
    let like = { modelName: this.props.apiPath, entityId: this.props.entity.id, memberId: this.props.cUser.id };
    this.props.fetchList('likes', null, like)
      .then((lk) => {
        if (lk.length)
          this.setState({ userLike: lk[0] });
        else {
          like.status = 0;
          this.setState({ userLike: like });
        }

      })
  }
  render() {

    return (
      
      <TouchableOpacity  style={[this.props.style, { flexDirection: 'row' }]} onPress={() => { this.like() }}>
        <View style={[{ flexDirection: this.props.vertical?'column':'row' }]}>
          <Icon name={this.props.icon || 'md-thumbs-up'} style={{ color: this.state.userLike.status && this.props.entity.like ? this.props.likeColor || '#faaa22' : this.props.color || '#85929E', fontSize: this.props.size || 18 }} />
          <Text style={{ paddingHorizontal: this.props.vertical?0:5, fontSize: 15, color: this.state.userLike.status && this.props.entity.like ? this.props.likeColor || '#faaa22' : this.props.color || '#85929E', fontFamily: 'iran_sans' }}> {this.props.entity.like || 0}</Text>
        </View>
      </TouchableOpacity >
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state, props) => {
  return {
    cUser: state.cUser,

  }
}, mapDispatchToProps)(Like);
