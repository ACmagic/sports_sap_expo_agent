import React from 'react';
import { StackNavigator } from 'react-navigation';
import SigninScreen from '../../screens/Signin/guest'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import colors from '../../styles/colors'

const Navigator = StackNavigator({
	GuestSigninScreen: { 
		screen: SigninScreen,
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