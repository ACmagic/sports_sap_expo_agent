import jwtDecode from 'jwt-decode';
import update from 'immutability-helper';
import { AsyncStorage } from 'react-native';

const initialState = {
	isAuthenticated: false,
	jwt: {
		_id: '',
		role: 'Guest',
		username: 'Visitor'
	}
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case 'AUTH_LOGIN':
			AsyncStorage.setItem('jwtToken', action.payload)
			state = update(state, {
				isAuthenticated: { $set: true }, 
				jwt: { $set: jwtDecode(action.payload) }
			})
			break;
		case 'AUTH_LOGOUT':
			AsyncStorage.removeItem('jwtToken');
			state = update(state, { $set: initialState })
			break;
		default:
			return state;
	}
	return state;
}

export default authReducer