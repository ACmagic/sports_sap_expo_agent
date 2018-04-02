import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import DrawerContent from '../../containers/DrawerContent'
import colors from '../../styles/colors'
import SigninNavigator from '../Signin/guest';
import LoginNavigator from '../Login/guest';
import AgentRegisterNavigator from '../AgentRegister/guest';
import ActionNavigator from '../Action/agent';
import ForgotPasswordNavigator from '../ForgotPassword/guest'

const Navigator = DrawerNavigator({
	GuestSigninNavigator: { 
		screen: SigninNavigator,
		navigationOptions: {
			drawerLabel: 'HOME'
		}
	},
	GuestLoginNavigator: { 
		screen: LoginNavigator,
		navigationOptions: {
			drawerLabel: 'LOGIN'
		}
	},
	GuestAgentRegisterNavigator: { 
		screen: AgentRegisterNavigator,
		navigationOptions: {
			drawerLabel: 'REGISTER'
		}
	},
	GuestForgotPasswordNavigator: { 
		screen: ForgotPasswordNavigator,
		navigationOptions: {
			drawerLabel: 'FORGOT PASSWORD'
		}
	},
	GuestActionNavigator: {
        screen: ActionNavigator,
		navigationOptions: {
			drawerLabel: 'ACTION PREVIEW'
		}
	},
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

