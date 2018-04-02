import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Query from './gql'


import List from './index'

class OpenBetList extends Component {
	render() {
		return <List { ...this.props } prevRouteName='AgentOpenBetOverviewScreen' nextRouteName='AgentOpenBetDetailScreen'/>
	}
}

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

const OpenBetListWithData = compose( 
	graphql(Query, {
		options: ({ utilSelect: { Player } }) => ({
			fetchPolicy: 'network-only',
			variables: {
				isClosed: false,
				Player: Player
			}
		})
	})
)(OpenBetList)

export default connect( mapStateToProps, null )(OpenBetListWithData);
