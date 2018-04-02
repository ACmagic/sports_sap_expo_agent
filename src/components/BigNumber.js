import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StrongText from './StrongText'
import Card from './Card'
import colors from '../styles/colors'

const BigNumber = ({ hide, title, style, number }) => {
	if(hide) return null
	return (    
		<Card style={ styles.container }>
        	<StrongText text={title}/>
        	<StrongText style={ [ styles.text, style ] } text={number}/>
    	</Card>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        color: colors.mute, 
        fontSize: 36,
    }
});

export default BigNumber