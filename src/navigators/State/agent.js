import React from 'react';
import { StackNavigator } from 'react-navigation';
import StateScreen from '../../screens/State/agent'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import colors from '../../styles/colors'

const Navigator = StackNavigator({
	AgentStateScreen: { 
		screen: StateScreen,
	},
}, {
	navigationOptions: {
		title: 'STATE',
		headerStyle: {
			backgroundColor: colors.dark,
			borderBottomWidth: 0,
		},
		headerTitleStyle: { 
			letterSpacing: 2 
		},
		headerTintColor: colors.white,
		headerRight: <HeaderOpenDrawer/>,
	},
	cardStyle: {
		backgroundColor: colors.dark
	}
});

export default Navigator

