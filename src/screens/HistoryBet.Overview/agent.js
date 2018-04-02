import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { AgentQuery } from './gql'
import Overview from './index'

class HistoryBetOverview extends Component {
	render() {
		return <Overview {...this.props} />
	}
}

const HistoryBetOverviewWithData = compose( 
	graphql(AgentQuery, { options: ({ utilSelect: { startOfWeekNum, endOfWeekNum, Player } }) => ({
		fetchPolicy: 'network-only',
		variables: {
			Player: Player,
			isClosed: true,
			startOfWeekNum: startOfWeekNum,
			endOfWeekNum: endOfWeekNum
		}
	})})
)(HistoryBetOverview)

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, null )(HistoryBetOverviewWithData);