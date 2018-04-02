import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../styles/colors'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
//import { ifIphoneX } from 'react-native-iphone-x-helper'

const BottomButton = ({ left, right, tip, activate, next, onPress, warning, loading }) => {
	if(loading) {
		return (
			<SafeAreaView style={ [ styles.container, { borderColor: colors.mute } ] }>
				<View style={ styles.mid }>
					<Text style={ [ styles.midText, { color: colors.mute } ] }>LOADING</Text>
				</View>
			</SafeAreaView>
		)
	}
	if(warning){
		return (
			<SafeAreaView style={ [ styles.container, { borderColor: colors.warning } ] }>
				<View style={ styles.mid }>
					<Text style={ [ styles.midText, { color: colors.warning, fontSize: 12 } ] }><IconFontAwesome name='exclamation-triangle'/>{' '}{warning}</Text>
				</View>
			</SafeAreaView>
		)
	}
	return (
		<TouchableOpacity disabled={!activate} style={ [ styles.container, { borderColor: activate ? colors.success : colors.mute } ] } onPress={onPress}>
			<SafeAreaView style={ styles.side }>
				{left && <Text style={ styles.sideText }>{left}</Text>}
			</SafeAreaView>
			<SafeAreaView style={ styles.mid }>
				{!activate && <Text style={ [ styles.midText, { color: colors.mute } ] }>{tip}</Text>}
				{ activate && <Text style={ [ styles.midText, { color: colors.success } ] }>{next}</Text>}
			</SafeAreaView>
			<SafeAreaView style={ styles.side }>
				{right && <Text style={ styles.sideText }>{right}</Text>}
			</SafeAreaView>
		</TouchableOpacity>   
	)   
}

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1,
		backgroundColor: colors.black, 
		height: 54, 
		width: '100%',
		alignItems: 'center', 
//		justifyContent: 'space-between', 
		justifyContent: 'center',
		flexDirection: 'row',
		// ...ifIphoneX({
		// 	height: 72
		// })
	},
	side: {
		flex: 1, alignItems: 'center', justifyContent: 'center'
	},
	mid: {
		flex: 4, alignItems: 'center', justifyContent: 'center'
	},
	midText: {
		fontWeight: 'bold',
		letterSpacing: 2,
		fontSize: 16
	},
	sideText: {
		color: colors.success, 
		fontWeight: 'bold', 
		fontSize: 12
	}
});

export default BottomButton