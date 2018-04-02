import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

const RowTDM = ({ title, style, detail }) => (
	<View style={ styles.container }>
		<Text style={ styles.title }>{title}</Text>
		<Text style={ [ styles.detail, style ] }>{detail}</Text>
	</View>              
)

const styles = StyleSheet.create({
    container: {
		height: 36, 
		alignItems: 'center', 
		flexDirection: 'row', 
		borderBottomWidth: 1, 
		borderColor: colors.dark
    },
    title: {
        width: 60, 
        textAlign: 'right',
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.mute
    },
    detail: {
    	paddingLeft: 12,
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.dust
    }
});

export default RowTDM