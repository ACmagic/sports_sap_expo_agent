import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import nav from './nav';
import auth from './auth'
import action from './action'
import table from './table'
import eventOddPicks from './eventOddPicks'
import submitModal from './submitModal'
import utilSelect from './utilSelect'
import app from './app'

const config = {
	key: 'root',
	storage: storage,
	blacklist: ['submitModal', 'table', 'eventOddPicks', 'utilSelect']
};

const rootReducer = persistCombineReducers(config, {
	app,
	nav,
	auth,
	action,
	table,
	eventOddPicks,
	submitModal,
	utilSelect
});

export default rootReducer;