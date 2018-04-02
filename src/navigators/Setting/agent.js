import React from 'react';
import { StackNavigator } from 'react-navigation';
import SettingScreen from '../../screens/Setting/agent'
import SettingChangePasswordScreen from '../../screens/Setting.ChangePassword/agent'
import SettingChangePasscodeScreen from '../../screens/Setting.ChangePasscode/agent'
import SettingChangeEmailScreen from '../../screens/Setting.ChangeEmail/agent'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import colors from '../../styles/colors'

const Navigator = StackNavigator({
	AgentSettingScreen: { 
		screen: SettingScreen,
		navigationOptions: {
			title: 'SETTING',
		}
	},
	AgentSettingChangePasswordScreen: { 
		screen: SettingChangePasswordScreen,
		navigationOptions: {
			title: 'CHANGE PASSWORD',
		}
	},
	AgentSettingChangePasscodeScreen: {
		screen: SettingChangePasscodeScreen,
		navigationOptions: {
			title: 'CHANGE PASSCODE',
		}
	},
	AgentSettingChangeEmailScreen: {
		screen: SettingChangeEmailScreen,
		navigationOptions: {
			title: 'CHANGE EMAIL',
		}
	}
}, {
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

export default Navigator

