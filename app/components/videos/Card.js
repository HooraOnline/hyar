import React from "react";
import {
    View,
    StyleSheet
} from "react-native";

const Card = (props) => (
    <View style={styles.container}>
        {props.children}
    </View>
);

export default Card;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#000',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
});