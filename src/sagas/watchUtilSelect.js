import _ from 'lodash'
import { all, takeEvery, put, select  } from "redux-saga/effects";

import { 
	handleSetStartOfWeekNum,
	handleUnsetStartOfWeekNum,
	handleSetEndOfWeekNum,
	handleUnsetEndOfWeekNum,
	handleSetPlayer,
	handleUnsetPlayer,
	handleSetBetOrder,
	handleUnsetBetOrder
} from '../actions/utilSelect'

const utilSelect = state => state.utilSelect

const loadSelectWeekNum = function* ({ payload }){
	yield put(handleSetStartOfWeekNum(payload))
	yield put(handleSetEndOfWeekNum(payload))
}

const loadSelectPlayer = function* ({ payload }){
	yield put(handleSetPlayer(payload))
}

const loadSelectBetOrder = function* ({ payload }){
	yield put(handleSetBetOrder(payload))
}


const watchUtilSelect = function* (){
	yield all([
		takeEvery('SELECT_WEEKNUM', loadSelectWeekNum),
		takeEvery('SELECT_PLAYER', loadSelectPlayer),
		takeEvery('SELECT_BETORDER', loadSelectBetOrder),
	])
}

export default watchUtilSelect





