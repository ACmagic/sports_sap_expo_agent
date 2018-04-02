import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import AgentNavigator from './Drawer/agent';
import GuestNavigator from './Drawer/guest';
import colors from '../styles/colors'

const AppNavigator = StackNavigator({
	GuestNavigator: { 
		screen: GuestNavigator
	},
	AgentNavigator: { 
		screen: AgentNavigator
	}
},{
	navigationOptions: {
		header: null,
		gesturesEnabled: false
	},
	cardStyle: {
		backgroundColor: colors.dark
	}
});

export default AppNavigator
