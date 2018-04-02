import _ from 'lodash'
import { all, takeEvery, put, select  } from "redux-saga/effects";

import { 
	handlePickSport, 
	handleDropSport,
	handlePickLeague,
	handleDropLeague,
	handlePickPeriod,
	handleDropPeriod
} from '../actions/table'

const table = state => state.table

const loadSelectSport = function* ({ payload }){
	const { sports } = yield select(table)
	!_.some(sports, payload) ? yield put(handlePickSport(payload)) : yield put(handleDropSport(payload))
}

const loadSelectLeague = function* ({ payload }){
	const { leagues } = yield select(table)
	!_.some(leagues, payload) ? yield put(handlePickLeague(payload)) : yield put(handleDropLeague(payload))
}

const loadSelectPeriod = function* ({ payload }){
	const { periods } = yield select(table)
	!_.some(periods, payload) ? yield put(handlePickPeriod(payload)) : yield put(handleDropPeriod(payload))
}


const watchSelectTable = function* (){
	yield all([
		takeEvery('SELECT_SPORT', loadSelectSport),
		takeEvery('SELECT_LEAGUE', loadSelectLeague),
		takeEvery('SELECT_PERIOD', loadSelectPeriod)
	])
}

export default watchSelectTable