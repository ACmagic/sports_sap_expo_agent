import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

const RowTDE = ({ title, style, detail }) => (
    <View style={ styles.container }>
        <Text style={ styles.title }>{title}</Text>
        <Text style={ [ styles.detail, style ] }>{detail}</Text>
    </View>       
)

const styles = StyleSheet.create({
    container: {
		alignItems: 'center', 
        flexDirection: 'row', 
        height: 36, 
        borderBottomWidth: 1, 
        borderColor: colors.dark
    },
    title: {
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.mute
    },
    detail: {
        flex: 1,
        fontWeight: 'bold', 
        textAlign: 'right',
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.dust
    }
});

export default RowTDE