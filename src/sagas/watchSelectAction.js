import { takeEvery, put, select  } from "redux-saga/effects";

import { handleSelectAction, handleSetAction, handleUnsetAction } from '../actions/action'

const loadSelectAction = function* ({ payload }){
	const action = yield select(state => state.action)
	payload === action ? yield put(handleUnsetAction()) : yield put(handleSetAction(payload))
}

const watchSelectAction = function* (){
	yield takeEvery('SELECT_ACTION', loadSelectAction)
}

export default watchSelectAction