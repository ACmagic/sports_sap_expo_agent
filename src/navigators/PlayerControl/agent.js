import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import colors from '../../styles/colors'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import PlayerControlScreen from '../../screens/PlayerControl/agent';
import CreatePlayerScreen from '../../screens/PlayerControl.CreatePlayer/agent'
import SelectPlayerScreen from '../../screens/PlayerControl.SelectPlayer/agent'
import EditPlayerScreen from '../../screens/PlayerControl.EditPlayer/agent'

const Navigator = StackNavigator({
	AgentPlayerControlScreen: { 
		screen: PlayerControlScreen,
		navigationOptions: {
			title: 'PLAYER CONTROL',
		}
	},
	AgentPlayerControlCreatePlayerScreen: {
		screen: CreatePlayerScreen,
		navigationOptions: {
			title: 'CREATE PLAYER',
		}
	},
	AgentPlayerControlSelectPlayerScreen: {
		screen: SelectPlayerScreen,
		navigationOptions: {
			title: 'SELECT PLAYER',
		}
	},
	AgentPlayerControlEditPlayerScreen: {
		screen: EditPlayerScreen,
		navigationOptions: {
			title: 'EDIT PLAYER',
		}
	}
},{
	navigationOptions: {
		headerStyle: {
			backgroundColor: colors.dark,
			borderBottomWidth: 0,
		},
		headerTitleStyle: { 
			letterSpacing: 2 
		},
		headerTintColor: colors.white,
		headerBackTitle: null,
		headerRight: <HeaderOpenDrawer/>,
	},
	cardStyle: {
		backgroundColor: colors.dark
	}
});

export default Navigator;



