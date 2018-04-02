import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas'


import {
	createReduxBoundAddListener,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const customMiddleware = store => next => action => {
	switch(action.routeName){
		case 'AgentActionNavigator':
			store.dispatch({ type: 'CLEAR_WAGER_DATA' })
			break;
		case 'AgentOpenBetNavigator':
		case 'AgentHistoryBetNavigator':
		case 'AgentTransactionNavigator':
			store.dispatch({ type: 'RESET_UTIL_SELECT' })
			break;
		default: 
			break;
	}
	next(action)
}

const sagaMiddleware = createSagaMiddleware();

const navMiddleare = createReactNavigationReduxMiddleware(
	'root',
	state => state.nav,
);

export const addListener = createReduxBoundAddListener('root');

//const middleware = applyMiddleware(customMiddleware, sagaMiddleware, logger);
const middleware = applyMiddleware(customMiddleware, sagaMiddleware, navMiddleare);

const configureStore = () => {
	const store = createStore(rootReducer, middleware);
	const persistor = persistStore(store);
//	console.log(store)
//	persistor.purge();
	sagaMiddleware.run(sagas)
	return { persistor, store };
};


export default configureStore;

