import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Hide = ({ hide, children }) => {
	if(hide) return null
	return <View>{children}</View>
}

export default Hide


