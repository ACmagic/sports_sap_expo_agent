import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors'

const Container = ({ style, children }) => (
    <View style={[styles.container, style]}>
        {children}
    </View>                 
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
//		justifyContent: 'center',
		backgroundColor: colors.dark
	},
});

export default Container


