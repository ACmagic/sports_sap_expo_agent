import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import _ from 'lodash'
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import colors from '../../styles/colors'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class HeaderOpenDrawer extends Component {
	render() {
		return (
			<TouchableOpacity style={ styles.container } onPress={ () => this.props.navigation.navigate('DrawerOpen') }>
				<IconFontAwesome name='bars' size={24} color={'white'}/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		paddingLeft: 16,
		paddingRight: 16
	},
});

export default withNavigation(HeaderOpenDrawer)
