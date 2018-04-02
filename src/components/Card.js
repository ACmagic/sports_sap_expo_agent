import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors'

const Card = ({ hide, style, children }) => {
    if(hide) return null
    return (
        <View style={ [ styles.container, style ]}>
            {children}
        </View>     
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12, 
        padding: '3%', 
        marginLeft: '3%',
        marginRight: '3%',
        marginBottom: 12, 
        backgroundColor: colors.black
    }
});

export default Card


