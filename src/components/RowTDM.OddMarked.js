import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

import lineDisplay from '../utils/functions/lineDisplay'
import spreadPointDisplay from '../utils/functions/spreadPointDisplay'
import showTeaserOddLine from '../utils/functions/showTeaserOddLine'
import minTeams from '../utils/collections/minTeams'

const RowTDMOddMarked = ({ oddType, oddTarget, oddPoint, oddLine }) => (
	<View style={ styles.container }>
		<Text style={ styles.oddType }>{ oddType === 'MLine' ? 'M-LINE' : oddType.toUpperCase()}</Text>
		<Text style={ styles.detail }>{oddTarget}{oddType === 'Total' ? ` ${oddPoint}` : spreadPointDisplay(oddPoint)}{lineDisplay(oddLine)}</Text>
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
    oddType: {
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

export default RowTDMOddMarked