import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

const StrongText = ({ style, text }) => <Text style={ [styles.text, style] }>{text}</Text>


const styles = StyleSheet.create({
    text: {
        color: colors.white, 
        fontSize: 13, 
        fontWeight: 'bold', 
        letterSpacing: 2
    }
});

export default StrongText


