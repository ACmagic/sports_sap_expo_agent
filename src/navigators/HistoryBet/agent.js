import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import colors from '../../styles/colors'
import HeaderOpenDrawer from '../../containers/HeaderOpenDrawer'
import HistoryBetSelectPlayerScreen from '../../screens/HistoryBet.SelectPlayer/agent'
import HistoryBetSelectWeekScreen from '../../screens/HistoryBet.SelectWeek/agent'
import HistoryBetOverviewScreen from '../../screens/HistoryBet.Overview/agent'
import HistoryBetListScreen from '../../screens/HistoryBet.List/agent'
import HistoryBetDetailScreen from '../../screens/HistoryBet.Detail/agent'

const Navigator = StackNavigator({
	AgentHistoryBetScreen: {
		screen: TabNavigator({
			AgentHistoryBetSelectPlayerScreen: {
				screen: HistoryBetSelectPlayerScreen,
                navigationOptions: {
                    tabBarLabel: 'PLAYER'
                }
			},
			AgentHistoryBetSelectWeekScreen: {
				screen: HistoryBetSelectWeekScreen,
                navigationOptions: {
                    tabBarLabel: 'WEEK'
                }
			},
			AgentHistoryBetOverviewScreen: {
				screen: HistoryBetOverviewScreen,
			    navigationOptions: {
			        tabBarLabel: 'OVERVIEW'
			    }
			},
			AgentHistoryBetListScreen: {
				screen: HistoryBetListScreen,
			    navigationOptions: {
			        tabBarLabel: 'LIST'
			    }
			},
			AgentHistoryBetDetailScreen: {
				screen: HistoryBetDetailScreen,
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
		title: 'HISTORY BET',
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