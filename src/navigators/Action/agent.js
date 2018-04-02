import React from 'react';
import colors from '../../styles/colors'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import HeaderActionReset from '../../containers/HeaderActionReset'
import renameAction from '../../utils/functions/renameAction'
import { StackNavigator, TabNavigator } from 'react-navigation';
import ActionScreen from '../../screens/Action/agent';
import SportScreen from '../../screens/Action.Sport/agent';
import EventScreen from '../../screens/Action.Event/agent';
import WagerScreen from '../../screens/Action.Wager/agent';

const Navigator = StackNavigator({
	AgentActionScreen: { 
		screen: ActionScreen,
		navigationOptions: { 
			title: 'ACTION',
			headerStyle: {
				backgroundColor: colors.dark,
				borderBottomWidth: 0,
			},
			headerTitleStyle: { 
				letterSpacing: 2 
			},
			headerTintColor: colors.white,
			headerLeft: null
		}
	},
	AgentActionTabNavigator: {
		screen: TabNavigator({
			AgentSportScreen: {
				screen: SportScreen,
	            navigationOptions: {
	                tabBarLabel: 'SPORT LEAGUE'
	            }
			},
			AgentEventScreen: {
				screen: EventScreen,
			    navigationOptions: {
			        tabBarLabel: 'EVENT ODD'
			    }
			},
			AgentWagerScreen: {
				screen: WagerScreen,
			    navigationOptions: {
			        tabBarLabel: 'WAGER ORDER'
			    }
			},
		},{
			swipeEnabled: true,
			tabBarPosition: 'top',
			animationEnabled: true,
			lazy: false,
	        tabBarOptions: {
	            style: {
	                backgroundColor: colors.dark,
	                height: 32,
	                borderTopWidth: 0,
	            },
	            labelStyle: {
	                marginBottom: 12
	            },
	            activeTintColor: colors.primary,
	        }
		}),
	    navigationOptions: ({ navigation: { state: { params: { title }} } }) => ({
	        title: renameAction(title),
	        headerLeft: <HeaderActionReset/>
	    })
	}
},{
	navigationOptions: {
		headerRight: <HeaderOpenDrawer/>,
		headerStyle: {
			backgroundColor: colors.dark,
			borderBottomWidth: 0,
		},
		headerTitleStyle: { 
			letterSpacing: 2 
		},
		headerTintColor: colors.white,
	},
	cardStyle: {
		backgroundColor: colors.dark
	}
});

export default Navigator;