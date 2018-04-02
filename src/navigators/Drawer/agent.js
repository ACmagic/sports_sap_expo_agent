import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import DrawerContent from '../../containers/DrawerContent'
import colors from '../../styles/colors'
import StateNavigator from '../State/agent';
import ActionNavigator from '../Action/agent';
import OpenBetNavigator from '../OpenBet/agent'
import HistoryBetNavigator from '../HistoryBet/agent'
import PlayerControlNavigator from '../PlayerControl/agent'
import SettingNavigator from '../Setting/agent'

const Navigator = DrawerNavigator({
	AgentStateNavigator: { 
		screen: StateNavigator,
		navigationOptions: {
			drawerLabel: 'STATE'
		}
	},
	AgentActionNavigator: {
        screen: ActionNavigator,
		navigationOptions: {
			drawerLabel: 'ACTION'
		}
	},
	AgentOpenBetNavigator: {
		screen: OpenBetNavigator,
		navigationOptions: {
			drawerLabel: 'OPEN BET'
		}
	},
	AgentHistoryBetNavigator: {
		screen: HistoryBetNavigator,
		navigationOptions: {
			drawerLabel: 'HISTORY BET'
		}
	},
	AgentPlayerControlNavigator: {
		screen: PlayerControlNavigator,
		navigationOptions: {
			drawerLabel: 'PLAYER CONTROL'
		}
	},
	AgentSettingNavigator: {
		screen: SettingNavigator,
		navigationOptions: {
			drawerLabel: 'SETTING'
		}
	}
},{
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
	contentComponent: DrawerContent,
	drawerWidth: 240,
	drawerBackgroundColor: colors.dark,
	contentOptions: {
		inactiveTintColor: colors.white,
		activeBackgroundColor: colors.black,
		labelStyle: {
			letterSpacing: 2
		}
	}
});

export default Navigator;
