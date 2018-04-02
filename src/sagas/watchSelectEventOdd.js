import _ from 'lodash'
import { all, takeEvery, put, select  } from "redux-saga/effects";
import { handlePickEventOdd, handleDropEventOdd, handleClearEventOdd } from '../actions/eventOdd'

const loadSelectEventOdd = function* ({ payload, userWagerLimit }) {
	const { action, eventOddPicks } = yield select(state => state)
	const isSinglePicked = _.some(eventOddPicks, { ID: payload.ID })
	const isRadioPicked = _.some(eventOddPicks, { radioID: payload.radioID })
	if(action === 'straight'){
		if(isSinglePicked){
			yield put(handleClearEventOdd())
		}else if(!_.isEmpty(eventOddPicks)){
			yield put(handleClearEventOdd())
			yield put(handlePickEventOdd(payload))
		}else{
			yield put(handlePickEventOdd(payload))
		}
	}else{
		if(isSinglePicked){
			yield put(handleDropEventOdd(payload))
		}else if(isRadioPicked){
			yield put(handleDropEventOdd(payload))
			yield put(handlePickEventOdd(payload))
		}else{
			switch(true){
				case action === 'parlay' && eventOddPicks.length < userWagerLimit.parlayTeam:
					return yield put(handlePickEventOdd(payload))
				case action === 'basicTeaser' && eventOddPicks.length < userWagerLimit.basicTeaserTeam:
				case action === 'specialTeaser' && eventOddPicks.length < userWagerLimit.specialTeaserTeam:
				case action === 'bigTeaser' && eventOddPicks.length < userWagerLimit.bigTeaserTeam:
					return yield put(handlePickEventOdd(payload))
				case action === 'superTeaser' && eventOddPicks.length < 3:
					return yield put(handlePickEventOdd(payload))
				case action === 'actionReverse' && eventOddPicks.length < userWagerLimit.actionReverseTeam:
				case action === 'winReverse' && eventOddPicks.length < userWagerLimit.winReverseTeam:
					return yield put(handlePickEventOdd(payload))
				default:
					return yield put(handleDropEventOdd(payload))
			}
		}
	}
}



const watchSelectEventOdd = function* (){
	yield takeEvery('SELECT_EVENTODD', loadSelectEventOdd)
}

export default watchSelectEventOdd




// export const handleSelectEventOdd = (eventOdd, userWagerLimit) => ({ type: 'SELECT_EVENTODD', payload: eventOdd, userWagerLimit: userWagerLimit })
// export const handlePickEventOdd = eventOdd => ({ type: 'PICK_EVENTODD', payload: eventOdd })
// export const handleDropEventOdd = eventOdd => ({ type: 'DROP_EVENTODD', payload: eventOdd })
