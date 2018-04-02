import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, RefreshControl, View } from 'react-native';
import colors from '../styles/colors'
import StrongText from './StrongText';

const NoDataFound = ({ onPress, onRefresh, loading, text1, text2 }) => (
	<ScrollView refreshControl={ <RefreshControl refreshing={loading || false} onRefresh={onRefresh}/> } >
		<TouchableOpacity style={ styles.container } activeOpacity={1} onPress={onPress}>
			<StrongText style={{ color: colors.dust }} text='NO DATA FOUND' />
			<View style={{ height: 12 }}/>
			<StrongText style={{ color: colors.dust }} text={text1} />
			<View style={{ height: 12 }}/>
			<StrongText style={{ color: colors.dust }} text={text2} />
		</TouchableOpacity>
	</ScrollView>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 320,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.dark
	},
});

export default NoDataFound


