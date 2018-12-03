import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const Button = (props) => {
    return (
        <View style={styles.container}>
            <Text>اطلاعات بیشتر</Text>
        </View>
    )
}
export default Button;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});