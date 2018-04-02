import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../../screens/Signin.Login/guest'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import colors from '../../styles/colors'

const Navigator = StackNavigator({
	GuestLoginScreen: { 
		screen: LoginScreen,
		navigationOptions: {
			title: null,
		}
	},
}, {
	navigationOptions: {
		title: 'STATE',
		headerStyle: {
			position: 'absolute', 
			backgroundColor: 'transparent', 
			zIndex: 100, 
			top: 0, 
			left: 0, 
			right: 0,
			borderBottomWidth: 0,
		},
		headerRight: <HeaderOpenDrawer/>,
	},
	cardStyle: {
		backgroundColor: colors.dark
	}
});

export default Navigator