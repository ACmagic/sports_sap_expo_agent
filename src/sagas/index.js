import { fork, all } from "redux-saga/effects";
import watchSelectAction from './watchSelectAction'
import watchSelectTable from './watchSelectTable'
import watchSelectEventOdd from './watchSelectEventOdd'
import watchUtilSelect from './watchUtilSelect'

const sagas = function* () {
	yield all([
		fork(watchSelectAction),
		fork(watchSelectTable),
		fork(watchSelectEventOdd),
		fork(watchUtilSelect)
	])
}

export default sagas