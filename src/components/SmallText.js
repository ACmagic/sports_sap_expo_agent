import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

const SmallText = ({ hide, style, text }) => {
	if(hide) return null
	return <Text style={ [styles.text, style] }>{text}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.dust
    }
});

export default SmallText


