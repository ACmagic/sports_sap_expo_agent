import update from 'immutability-helper';
import _ from 'lodash';

const initialState = []

const eventOddPicks = (state = initialState, action) => {
	switch(action.type){
		case 'PICK_EVENTODD':
			state = update(state,  { $push: [action.payload] })
			break
		case 'DROP_EVENTODD':
			state = update(state, { $apply: picks => picks.filter(pick => pick.radioID !== action.payload.radioID )})
			break;
		case 'SELECT_ACTION':
		case 'SELECT_PERIOD':
		case 'CLEAR_TABLE':
		case 'CLEAR_EVENTODD':
		case 'CLEAR_WAGER_DATA':
		case 'AUTH_LOGOUT':
			state = update(state, { $set: initialState })
		default:
			return state
	}
	return state
}

export default eventOddPicks