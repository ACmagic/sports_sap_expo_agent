import update from 'immutability-helper';
import _ from 'lodash';

const initialState = ''

const action = (state = initialState, action) => {
	switch(action.type){
		case 'SET_ACTION':
			state = update(state, { $set: action.payload })
			break
		case 'CLEAR_WAGER_DATA':
		case 'AUTH_LOGOUT':
		case 'UNSET_ACTION':
			state = update(state, { $set: initialState })
			break
		default:
			return state
	}
	return state
}

export default action