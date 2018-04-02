import React, { Component } from 'react';
import SelectPlayer from '../../containers/SelectPlayer'
class OpenBetSelectPlayer extends Component {
	render() {
		return <SelectPlayer nextRouteName='AgentOpenBetOverviewScreen' hasAllPlayersOption={true}/>
	}
}
export default OpenBetSelectPlayer