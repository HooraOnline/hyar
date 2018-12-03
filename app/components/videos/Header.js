import React from 'react';
import { Text, StyleSheet, SafeAreaView, View } from 'react-native';


// Functional Class
const Header = (props) => {
    return (
        <SafeAreaView >
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                    {props.headerText}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
        paddingTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
    },
});