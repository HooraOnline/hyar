import React from "react";
import {
    View,
    StyleSheet
} from "react-native";

const CardSectionView = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

export default CardSectionView;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 1,
        backgroundColor: '#000',
        flexDirection: 'row',
        borderColor: '#eee',
        position: 'relative',
    },
});