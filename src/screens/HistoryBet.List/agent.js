import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { AgentQuery } from './gql'
import List from './index'

class HistoryBetList extends Component {
	render() {
		return <List { ...this.props } prevRouteName='AgentHistoryBetOverviewScreen' nextRouteName='AgentHistoryBetDetailScreen'/>
	}
}

const HistoryBetListWithData = compose( 
	graphql(AgentQuery, { options: ({ utilSelect: { startOfWeekNum, endOfWeekNum, Player } }) => ({
		fetchPolicy: 'network-only',
		variables: {
			Player: Player,
			isClosed: true,
			startOfWeekNum: startOfWeekNum,
			endOfWeekNum: endOfWeekNum
		}
	})})
)(HistoryBetList)

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, null )(HistoryBetListWithData);