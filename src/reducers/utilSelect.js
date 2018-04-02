import update from 'immutability-helper';
import _ from 'lodash'

const initialState = {
	startOfWeekNum: 0,
	endOfWeekNum: 0,
	BetOrder: '',
	Player: ''
}

const utilSelect = (state = initialState, action) => {
	switch(action.type){
		case 'SET_STARTOFWEEKNUM':
			state = update(state,  { startOfWeekNum: { $set: action.payload }})
			break;
		case 'UNSET_STARTOFWEEKNUM':
			state = update(state,  { startOfWeekNum: { $set: 0 }})
			break;

		case 'SET_ENDOFWEEKNUM':
			state = update(state,  { endOfWeekNum: { $set: action.payload }})
			break;
		case 'UNSET_ENDOFWEEKNUM':
			state = update(state,  { endOfWeekNum: { $set: 0 }})
			break;

		case 'SET_PLAYER':
			state = update(state,  { Player: { $set: action.payload }})
			break;
		case 'UNSET_PLAYER':
			state = update(state,  { Player: { $set: '' }})
			break;

		case 'SET_BETORDER':
			state = update(state,  { BetOrder: { $set: action.payload }})
			break;
		case 'UNSET_BETORDER':
			state = update(state,  { BetOrder: { $set: '' }})
			break;

		case 'RESET_UTIL_SELECT':
		case 'AUTH_LOGOUT':
			state = update(state, { $set: initialState })
			break;
		default:
			return state;
	}
	return state;
}

export default utilSelect