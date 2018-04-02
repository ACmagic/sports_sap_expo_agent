import React, { Component } from 'react';
import SelectPlayer from '../../containers/SelectPlayer'
class HistoryBetSelectPlayer extends Component {
	render() {
		return <SelectPlayer nextRouteName='AgentHistoryBetSelectWeekScreen' hasAllPlayersOption={true}/>
	}
}
export default HistoryBetSelectPlayer