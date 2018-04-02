import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StrongText from './StrongText'
import Card from './Card'
import colors from '../styles/colors'

const StatusIndicator = ({ hide, status, style, content }) => {
	if(hide) return null
	return (    
		<Card style={ styles.container }>
            <StrongText style={ [ styles.text, style ] } text={status}/>
        	{content }<StrongText text={content}/>
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

export default StatusIndicator