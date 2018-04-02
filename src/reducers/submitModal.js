import jwtDecode from 'jwt-decode';
import update from 'immutability-helper';
import { AsyncStorage } from 'react-native';

const initialState = {
	isVisible: false,
	serverResponse: {
		title: '',
		content: '',
		status: ''
	},
}

const submitModal = (state = initialState, action) => {
	switch(action.type){
		case 'SUBMIT_MODAL_ON':
			state = update(state, { isVisible: { $set: true } })
			break;
		case 'SUBMIT_MODAL_SET_SERVER_RESPONSE':
			state = update(state, { serverResponse: { $set: action.payload } })
			break
		case 'SUBMIT_MODAL_RESET':
			state = update(state, { $set: initialState })
			break;
		default:
			return state;
	}
	return state;
}

export default submitModal