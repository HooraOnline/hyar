// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//     View,
//     Text,
//     Modal,
//     Dimensions,
//     Picker,
//     StyleSheet,
//     TouchableOpacity,
//     Platform
// } from 'react-native';
// import BaseComponent from './BaseComponent';
// import webRegionAPI from './webRegionAPI';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const isIos = Platform.OS === 'ios';

// export default class IranRegionWheelPicker extends BaseComponent {

//     constructor(props) {
//         super(props);
//         this._bind(
//             'open',
//             'close',
//             '_handleProvinceChange',
//             '_handleCityChange',
//             '_handleAreaChange',
//             '_handleSubmit',
//             '_handleCancel',
//         );
//         this.state = {
//             isVisible: this.props.isVisible,
//             provinces: [],
//             cities: [],
//             areas: [],
//             selectedProvince: this.props.selectedProvince,
//             selectedCity: this.props.selectedCity,
//             selectedArea: this.props.selectedArea,
//             transparent: true,
//         };
//     }

//     _filterAllProvinces() {
//         return this._regionAllData.map((item) => {
//             return item.name;
//         });
//     }

//     _filterCitys(province) {
//         const provinceData = this._regionAllData.find(item => item.name === province);
//         return provinceData.city.map(item => item.name);
//     }

//     _filterAreas(province, city) {
//         const provinceData = this._regionAllData.find(item => item.name === province);
//         const cityData = provinceData.city.find(item => item.name === city);
//         return cityData.area;
//     }

//     componentDidMount() {
//         this._regionAllData = this.props.dataArray;

//         const provinces = this._filterAllProvinces();
       

//         const cities = this._filterCitys(this.state.selectedProvince);

//         const areas = this._filterAreas(this.state.selectedProvince, this.state.selectedCity);

//         this.setState({
//             provinces,
//             cities,
//             areas
//         });
//     }

//     componentWillReceiveProps(props) {
//         if (props.isVisible !== this.props.isVisible) {
//             if (props.isVisible) {
//                 this.open();
//             } else {
//                 this.close();
//             }
//         }
//     }

//     close() {
//         this.setState({ isVisible: false });
//     }

//     open() {
//         this.setState({ isVisible: true });
//     }

//     _handleProvinceChange(province) {
//         const cities = this._filterCitys(province);
//         const areas = this._filterAreas(province, cities[0]);
//         this.setState({
//             selectedProvince: province,
//             selectedCity: cities[0],
//             selectedArea: areas ? areas[0] : [],
//             cities,
//             areas
//         });
//     }

//     _handleCityChange(city) {
//         const areas = this._filterAreas(this.state.selectedProvince, city);
//         this.setState({
//             selectedCity: city,
//             selectedArea: areas ? areas[0] : [],
//             areas
//         });
//     }

//     _handleAreaChange(area) {
//         this.setState({
//             selectedArea: area,
//         });
//     }

//     _handleCancel() {
//         if (this.props.onCancel) {
//             this.props.onCancel();
//         }
//         this.close();
//     }

//     _handleSubmit() {
//         if (this.props.onSubmit) {
//             this.props.onSubmit({
//                 province: this.state.selectedProvince,
//                 city: this.state.selectedCity,
//                 area: this.state.selectedArea
//             });
//         }
//         this.close();
//     }

//     renderPicker() {
//         return (
//             <View style={styles.overlayStyle}>
//                 <View
//                     style={[styles.pickerContainer, isIos ? {} : { marginTop: windowHeight - 80 - this.props.androidPickerHeight }]}>
//                     <View style={[styles.navWrap, this.props.isRTl ? { flexDirection: 'row-reverse' } : {}]}>
//                         <TouchableOpacity style={
//                             [styles.navBtn, { backgroundColor: navBtnColor, borderColor: navBtnColor }]}
//                             activeOpacity={0.85}
//                             onPress={this._handleSubmit}>
//                             <Text style={[styles.text, { color: navBtnColor }]}> تایید</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={
//                             [styles.navBtn, { borderColor: navBtnColor }]}
//                             activeOpacity={0.85}
//                             onPress={this._handleCancel}>
//                             <Text style={[styles.text, { color: navBtnColor }]}> لغو</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={this.props.vertical ? {} : [styles.pickerWrap, this.props.isRTl ? { flexDirection: 'row-reverse' } : {}]}>
//                         <View style={this.props.vertical ? {height:40,borderColor:"#797D7F",borderBottomWidth:0.3} : {flex:1,borderColor:"#797D7F",borderBottomWidth:0.3,borderRightWidth:0.3}}>
//                             <Picker 
//                                 onValueChange={this._handleProvinceChange}
//                                 selectedValue={this.state.selectedProvince}>
//                                 {this.state.provinces.map((province, index) => {
//                                     return (<Picker.Item value={province}
//                                         label={province}
//                                         key={index}
//                                     />
//                                     );
//                                 })}
//                             </Picker>
//                         </View>
//                         <View style={this.props.vertical ? {height:40,borderColor:"#797D7F",borderBottomWidth:0.3} : {flex:1,borderColor:"#797D7F",borderBottomWidth:0.3,borderRightWidth:0.3}}>
//                             <Picker
//                                 onValueChange={this._handleCityChange}
//                                 selectedValue={this.state.selectedCity}>
//                                 {this.state.cities.map((city, index) => {
//                                     return (<Picker.Item value={city}
//                                         label={city}
//                                         key={index} />
//                                     );
//                                 })}
//                             </Picker>
//                         </View>

//                         {this.state.areas ? this.props.isShowArea &&   <View style={this.props.vertical ? {height:40,borderColor:"#797D7F",borderBottomWidth:0.3} : {flex:1,borderColor:"#797D7F",borderBottomWidth:0.3,borderRightWidth:0.3}}>
//                             <Picker                                           
//                                 onValueChange={this._handleAreaChange}
//                                 selectedValue={this.state.selectedArea}>
//                                 {this.state.areas.map((area, index) => {
//                                     return (<Picker.Item
//                                         value={area}
//                                         label={area}
//                                         key={index}
//                                     />
//                                     );
//                                 })}
//                             </Picker>
//                         </View> : <View style={styles.pickerItem}></View>}
//                     </View>
//                 </View>
//             </View>
//         );
//         const { navBtnColor } = this.props;
//     }

//     render() {
//         const modal = (
//             <Modal transparent={this.state.transparent}
//                 visible={this.state.isVisible}
//                 onRequestClose={this.close}
//                 animationType={this.props.animationType}>
//                 {this.renderPicker()}
//             </Modal>
//         );

//         return (
//             <View>
//                 {modal}
//                 <TouchableOpacity onPress={this.open}>{this.props.children}</TouchableOpacity>
//             </View>
//         );
//     }

// }

// IranRegionWheelPicker.propTypes = {
//     isRTl: PropTypes.bool,
//     isVisible: PropTypes.bool,
//     isShowArea: PropTypes.bool,
//     selectedProvince: PropTypes.string,
//     selectedCity: PropTypes.string,
//     selectedArea: PropTypes.string,
//     navBtnColor: PropTypes.string,
//     animationType: PropTypes.string,
//     transparent: PropTypes.bool,
//     onSubmit: PropTypes.func,
//     onCancel: PropTypes.func,
//     androidPickerHeight: PropTypes.number,
// };

// IranRegionWheelPicker.defaultProps = {
//     isRTl: true,
//     isVisible: false,
//     isShowArea: true,
//     selectedProvince: 'تهران',
//     selectedCity: 'تهران',
//     selectedArea: 'تجریش',
//     navBtnColor: 'blue',
//     animationType: 'slide',
//     transparent: true,
//     onSubmit: () => {
//     },
//     onCancel: () => {
//     },
//     androidPickerHeight: 50
// };

// const styles = StyleSheet.create({
//     overlayStyle: {
//         flex: 1,
//         width: windowWidth,
//         height: windowHeight,
//         left: 0,
//         position: 'absolute',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     pickerContainer: {
//         flex: 1,
//         marginTop: windowHeight * 3 / 5,
//         backgroundColor: '#FFF'
//     },
//     navWrap: {
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: 'row',
//         borderBottomWidth: 1,
//         borderTopWidth: 1,
//         borderColor: '#ddd',
//         backgroundColor: '#eee'
//     },
//     navBtn: {
//         paddingVertical: 5,
//         paddingHorizontal: 20,
//         borderWidth: 1,
//         borderRadius: 3,
//         backgroundColor: '#eee',
//         borderColor: '#dddddd'
//     },
//     text: {
//         fontSize: 18,
//     },
//     pickerWrap: {
//         flexDirection: 'row'
//     },
//     pickerItem: {
//         flex: 1
//     }
// });