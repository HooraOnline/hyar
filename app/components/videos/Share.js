import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const Share = (props) => (
    <View style={styles.container}>
        <Text>Share</Text>
    </View>
)
export default Share;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});