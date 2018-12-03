// import React from "react";
// import {
//     Text,
//     StyleSheet,
//     ImageBackground,
//     TouchableOpacity,
//     Share,
// } from "react-native";
// import Card from "./Card";
// import CardSectionView from "./CardSectionView";
// import { Actions } from 'react-native-router-flux';
// import { Asset, Audio, Font, Video, Ionicons } from 'expo';

// const VideoDetail = ({ video }) => {
//     // DESTRUCTIONING OF STYLES...
//     const { title, image, videop, desc,id } = video;
//     const { imageCoverStyle } = styles
//     return (
//         <Card>
//             <TouchableOpacity onPress={() => Actions.Players({ videop, desc, title,image,id })}>
//                 <CardSectionView>
//                     <ImageBackground
//                         source={{ uri: image }} style={imageCoverStyle} />
//                 </CardSectionView>
//                 <CardSectionView >

//                     <Text style={{ flex: 1, padding: 10, backgroundColor: '#252525', textAlign: 'left', color: '#fff', fontFamily: 'iran_sans' }} >
//                         <Text style={{ fontSize: 23, padding: 3, flexDirection: 'row' }}>{title + '\n'} </Text>
//                         <Text style={{ fontSize: 17 }}>{desc}</Text>
//                     </Text>
//                 </CardSectionView>
//             </TouchableOpacity>
//         </Card>
//     );
// };

// export default VideoDetail;

// const styles = StyleSheet.create({
//     imageCoverStyle: {
//         backgroundColor: '#000',
//         height: 250,
//         width: undefined,
//         flex: 1,
//         position: 'relative',
//     },
// });