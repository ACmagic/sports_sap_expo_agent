import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import colors from '../styles/colors'

const Loading = ({ color, size }) => <View style={styles.container}><ActivityIndicator color={color} size={size} /></View>                 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: colors.dark
	},
});

export default Loading


