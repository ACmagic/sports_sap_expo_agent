import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { AgentQuery } from './gql'
import Overview from './index'

class AgentOpenBetOverview extends Component {
	render() {
		return <Overview {...this.props}/>
	}
}

const AgentOpenBetOverviewWithData = compose( 
	graphql(AgentQuery, { options: ({ utilSelect: { Player } }) => ({ 
		fetchPolicy: 'network-only',
		variables: { isClosed: false, Player: Player } 
	})})
)(AgentOpenBetOverview)

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, null )(AgentOpenBetOverviewWithData);