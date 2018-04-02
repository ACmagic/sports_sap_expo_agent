import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigators';
import _ from 'lodash'

const getCurrentRouteName = (state) => {
	const route = state.routes[state.index];
	return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route); 
}

// const initialAction = { type: NavigationActions.Init }
// const initialState = AppNavigator.router.getStateForAction(initialAction)

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

const navReducer = (state = initialState, action) => {
//	console.log(action)
	if(action.type === 'AUTH_LOGOUT') return initialState
	const nextState = AppNavigator.router.getStateForAction(action, state);
	if (state && nextState) {
		const stateRouteName = getCurrentRouteName(state);
		const nextStateRouteName = getCurrentRouteName(nextState);
		return _.isEqual(stateRouteName, nextStateRouteName) ? state : nextState;
	}
	return nextState || state;
};

export default navReducer