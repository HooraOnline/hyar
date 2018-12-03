import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Actions } from 'react-native-router-flux';

const VideoComponent = (props) => {
    return (
        <View style={styles.container}>
            <Text>VideoComponent</Text>
        </View>
    );
};
export default VideoComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});