import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors'

const Hr = () => <View style={ styles.hr } />


const styles = StyleSheet.create({
    hr: {
        height: 1, 
        margin: 16, 
        backgroundColor: colors.black
    }
});

export default Hr


