import update from 'immutability-helper';
import _ from 'lodash';

const initialState = {
	sports: [],
	leagues: [],
	periods: [],
	// picks: []
}

const table = (state = initialState, action) => {
	switch(action.type){
		case 'PICK_SPORT':
			state = update(state,  { sports: { $push: [action.payload] }})
			break
		case 'DROP_SPORT':
			state = update(state, { sports: { $apply: sports => sports.filter(sport => !_.isEqual(sport, action.payload) )}})
			break;
		case 'PICK_LEAGUE':
			state = update(state,  { leagues: { $push: [action.payload] }})
			break;
		case 'DROP_LEAGUE':
			state = update(state,  { leagues: { $apply: leagues => leagues.filter(league => !_.isEqual(league, action.payload) )}})
			break;
		case 'PICK_PERIOD':
			state = update(state,  { periods: { $push: [action.payload] }})
			break;
		case 'DROP_PERIOD':
			state = update(state,  { periods: { $apply: periods => periods.filter(period => !_.isEqual(period, action.payload) )}})
			break;
		case 'SELECT_ACTION':
		case 'CLEAR_TABLE':
		case 'CLEAR_WAGER_DATA':
		case 'AUTH_LOGOUT':
			state = update(state, { $set: initialState })
		default:
			return state
	}
	return state
}

export default table


			// state = update(state,  { 
			// 	periods: { $push: [action.payload] },
			// 	picks: { $push: [action.pick] }
			// })

			// state = update(state,  { 
			// 	periods: { $apply: periods => periods.filter(period => period.name !== action.payload.name )},
			// 	picks: { $apply: picks => picks.filter(pick => !_.isEqual(pick, action.pick)) }
			// })