import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

const StripBar = ({ title, style, children }) => (
    <View style={ styles.container }>
        <Text style={ [ styles.title, style ] }>{title}</Text>
        <View style={{ flex: 1 }}>{children}</View>
    </View>   
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        padding: '3%',
        alignItems: 'center', 
        flexDirection: 'row', 
        minHeight: 48, 
        marginBottom: 3
    },
    title: {
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.white
    }
});

export default StripBar