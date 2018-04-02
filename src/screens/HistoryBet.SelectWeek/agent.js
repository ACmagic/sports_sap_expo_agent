import React, { Component } from 'react';
import SelectWeek from '../../containers/SelectWeek'

class HistoryBetSelectWeek extends Component {
	render() {
		return <SelectWeek nextRouteName='AgentHistoryBetOverviewScreen' />
	}
}

export default HistoryBetSelectWeek