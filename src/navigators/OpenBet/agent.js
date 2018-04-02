import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import colors from '../../styles/colors'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import SelectPlayerScreen from '../../screens/OpenBet.SelectPlayer/agent'
import OpenBetOverviewScreen from '../../screens/OpenBet.Overview/agent'
import OpenBetListScreen from '../../screens/OpenBet.List/agent'
import OpenBetDetailScreen from '../../screens/OpenBet.Detail/agent'

const Navigator = StackNavigator({
	AgentOpenBetScreen: {
		screen: TabNavigator({
			AgentSelectPlayerScreen: {
				screen: SelectPlayerScreen,
			    navigationOptions: {
			        tabBarLabel: 'PLAYER'
			    }
			},
			AgentOpenBetOverviewScreen: {
				screen: OpenBetOverviewScreen,
                navigationOptions: {
                    tabBarLabel: 'OVERVIEW'
                }
			},
			AgentOpenBetListScreen: {
				screen: OpenBetListScreen,
			    navigationOptions: {
			        tabBarLabel: 'LIST'
			    }
			},
			AgentOpenBetDetailScreen: {
				screen: OpenBetDetailScreen,
			    navigationOptions: {
			        tabBarLabel: 'DETAIL'
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
            },
		})

	}
},{
	navigationOptions: {
		headerRight: <HeaderOpenDrawer/>,
		title: 'OPEN BET',
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
})



export default Navigator