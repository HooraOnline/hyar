import React from "react";
import {
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Share,
} from "react-native";
import Card from "./Card";
import CardSectionView from "./CardSectionView";
import { Actions } from 'react-native-router-flux';
import { Asset, Audio, Font, Video, Ionicons } from 'expo';

class Alaki extends Comment {

    renderVideo() {
        return (
            <Video
                source={require('../../assets/videos/454473522854376400.mp4')}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                useNativeControls
                isLooping={false}
                style={{
                    flex: 1,
                    width: null,
                    height: 300,
                    marginTop: 10,
                    marginRight: 1,
                    marginLeft: 1,
                    borderRadius: 50,
                }}
            />
        );
    }
}
// DESTRUCTIONING OF STYLES...
const { title, image, videop, desc } = video;
const { imageCoverStyle } = styles
return (
    <Card>
        <CardSectionView>
            {this.renderVideo()}
        </CardSectionView>
        <CardSectionView >
            <Text style={{ flex: 1, padding: 10, backgroundColor: '#252525', textAlign: 'left', color: '#fff', fontFamily: 'iran_sans' }} >
                <Text style={{ fontSize: 23, padding: 3, flexDirection: 'row' }}>{title + '\n'} </Text>
                <Text style={{ fontSize: 17 }}>{desc}</Text>
            </Text>
        </CardSectionView>
    </Card>
);
};

export default Alaki;

const styles = StyleSheet.create({
    imageCoverStyle: {
        backgroundColor: '#000',
        height: 250,
        width: undefined,
        flex: 1,
        position: 'relative',
    },
});