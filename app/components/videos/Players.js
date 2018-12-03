
// import React, { Component } from 'react';
// import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
// import { Video } from 'expo';
// import { Icon, Fab } from 'native-base';
// import VideoList from '../../components/videos/VideoList';



// class Players extends Component {
//     renderVideo() {
//         return (
//             <Video
//                 source={{ uri: this.props.videop }}
//                 rate={1.0}
//                 volume={1.0}
//                 isMuted={false}
//                 resizeMode="cover"
//                 shouldPlay
//                 useNativeControls
//                 isLooping={false}
//                 style={{
//                     flex: 1,
//                     width: null,
//                     height: 360,
//                     marginTop: 10,
//                     backgroundColor: '#000'
//                 }}
//             />
//         );
//     }
//     render() {
//         return (
//             <ScrollView style={styles.wholeStyle}>

//                 <View>
//                     {this.renderVideo()}
//                 </View>
//                 <View style={{ flexDirection: 'row', flex: 1 }}>
//                     <Text style={{ color: '#000', fontSize: 25, fontFamily: 'iran_sans', textAlign: 'left', backgroundColor: '#eee', padding: 10, flex: 1 }}>
//                         {this.props.desc}
                       
//                     </Text>
//                 </View>
//                 <View>

//                 </View>
//                 <View>
//                     <Text style={{ color: '#000', fontSize: 35, fontFamily: 'iran_sans', textAlign: 'left', backgroundColor: '#eee', padding: 10, flex: 1 }}>
//                         پیشنهادات برتر
//                     </Text>
                    
//                 </View>
//             </ScrollView>
//         );
//     }
// };

// export default Players;
// const styles = StyleSheet.create({
//     backgroundVideo: {
//         position: 'relative',

//     },
//     wholeStyle: {
//         backgroundColor: '#000',
//         flex: 1

//     }
// });