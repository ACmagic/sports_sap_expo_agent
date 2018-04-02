import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Query from './gql'

import Container from '../../components/Container'
import BottomButton from '../../components/BottomButton'
import NoDataFround from '../../components/NoDataFound'
import Loading from '../../components/Loading'
import { withFormik } from 'formik';
import Wager from './index'

class AgentWager extends Component {

	render() {
		if(this.props.data.loading ) return <Loading/>
		if(_.isEmpty(this.props.data.wagerPicks)) return <NoDataFround onPress={ () => this.props.navigation.navigate('AgentEventScreen') } />
		return (
			<Container>
				<Wager {...this.props}/>
	            <BottomButton tip='PREVIEW ONLY' />
			</Container>
		);
	}
}

const mapStateToProps = state => ({ action: state.action, eventOddPicks: state.eventOddPicks })

const AgentWagerWithData = compose( 
	graphql(Query, { options: ({ action, eventOddPicks }) => ({ 
		fetchPolicy: 'network-only',
		variables: { action: action, eventOddPicks: eventOddPicks.map(pick => _.omit(pick, ['radioID'])) } })}),
    withFormik({ mapPropsToValues: () => ({ betType: 'wager', betAmount: '', atRisk: '0', toWin: '0', passcode: '' }) })
)(AgentWager)

export default connect( mapStateToProps, null )(AgentWagerWithData);

