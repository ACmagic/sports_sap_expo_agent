import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors'

const PickBar = ({ hide, onPress, style, children }) => {
    if(hide) return null
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={ [ styles.container, style ]}>
            {children}
        </TouchableOpacity>     
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '3%', 
        height: 60,
        marginBottom: 3, 
        backgroundColor: colors.black
    }
});

export default PickBar