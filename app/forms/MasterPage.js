
import React, { Component } from 'react';
import { Drawer, Container, Content, Row, } from 'native-base';
import { Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import Menu from './Menu';
import { ActionCreators } from '../aRedux';
import AppFooter from '../components/Form/AppFooter';
import AppHeader from '../components/Form/AppHeader';
import { Actions } from 'react-native-router-flux';
import { Util } from '../lib/util';
//import Drawer from 'react-native-drawer'
class MasterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      headerItems: [],
      screenHeight: Dimensions.get('window').height,
      screenWidth: Dimensions.get('window').width,
      drawerIsOpen: false
    }
    this.state.headerItems = props.headerItems;
    if (this.props.showMenu)
      this.state.headerItems.unshift({ icon: 'ios-menu-outline', width: 30, color: this.props.headerIconColor || '#2a8892', onPress: () => { this.openDrawer(); } });
    if (this.props.showReturnBtn)
      this.state.headerItems.push({ icon: 'ios-arrow-round-back-outline', width: 30, color: this.props.headerIconColor || '#2a8892', onPress: () => { Actions.pop(); } });
  }
  manageDrower = () => {
    this.setState({ drawerIsOpen: !this.state.drawerIsOpen })

  }
  onCloseDrawer = () => {
    this.drawer._root.close()
   // this.setState({ drawerIsOpen: false })
  };
  openDrawer = () => {
     this.drawer._root.open()
  };

  scrollTo = (Y) => {
    this.scroller.scrollTo({ x: 0, y: Y });
  };
  scrollTo2 = (Y) => {
    scrollYPos = this.state.screenHeight * Y;
    this.scroller.scrollTo({ x: 0, y: screenHeight });
  };
  scrollToTop = () => {
    this.scroller.scrollTo({ x: 0, y: 0 });
  };
  scrollToBotton = () => {
    scrollYPos = this.state.screenHeight * 1;
    this.scroller.scrollTo({ x: 0, y: scrollYPos });
  };
  componentWillReceiveProps = (props) => {
    if (props.scrollY) {
      //this.scrollTo(props.scrollY);
    }

  }
  render() {

    return (


      <Container style={this.props.containerStyle || { backgroundColor: '#fff', }}
        ref={(container) => { this.container = container }}
        onScroll={(event) => {
          if (this.props.onScroll) this.props.onScroll(event);
        }}
      >
        <Drawer
          // type="static"
          content={<Menu/>}
          open={this.state.drawerIsOpen}
          //openDrawerOffset={100}
          ref={(ref) => { this.drawer = ref; }}
          onClose={() => this.onCloseDrawer()}
          styles={{ zIndex: 10000, height: 10000, shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 3 }}
          //tweenHandler={(ratio) => ({main: { opacity: (2 - ratio) / 2 }  })}
        >
          {
            this.props.showHeader!=false &&
            <AppHeader items={this.state.headerItems} isTransparent={this.props.headerTransparent} headerColor={this.props.headerColor} iconColor={this.props.headerIconColor} title={this.props.title} hStyle={this.props.headerStyle} />
          }


          {
            this.props.isList ? this.props.children
              :
              <Content style={[{}, this.props.contentStyle]} ref={(ref) => { this.scroller = ref; }} onScroll={(e) => { if (this.props.onScroll) this.props.onScroll(e) }}>
                {this.props.children}
              </Content>
          }
          
        </Drawer>
        {
            this.props.showFooter!=false &&
            <AppFooter selected={this.props.footertabIndex} iconColor={this.props.footerIconColor} footertBackgroundcolor={this.props.containerStyle && this.props.containerStyle.backgroundColor ? this.props.containerStyle.backgroundColor : '#fff'} style={this.props.footerStyle} />
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

  }
}, mapDispatchToProps)(MasterPage);
