import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AgentQuery } from './gql'
import { compose, graphql } from 'react-apollo';
import _ from 'lodash'
import Container from '../../components/Container'
import BottomButton from '../../components/BottomButton'
import showTeaserOddLine from '../../utils/functions/showTeaserOddLine'
import minTeams from '../../utils/collections/minTeams'
import NoDataFround from '../../components/NoDataFound'
import Loading from '../../components/Loading'
import Event from './index'
import { handleClearEventOdd } from '../../actions/eventOdd'

const wagerLimit = {
    parlayTeam: 8,
    basicTeaserTeam: 8,
    specialTeaserTeam: 8,
    bigTeaserTeam: 8,
    superTeaserTeam: 3,
    actionReverseTeam: 4,
    winReverseTeam: 4,
}

class AgentEvent extends Component {
	render() {
		if(this.props.data.loading ) return <Loading/>
        if(_.isEmpty(this.props.data.actionEvents)) return <NoDataFround onPress={ () => this.props.navigation.navigate('AgentSportScreen') } />
        const { data: { actionEvents, loading, refetch }, eventOddPicks, action, navigation } = this.props
		return (
			<Container>
                <Event actionEvents={actionEvents} wagerLimit={wagerLimit} loading={loading} refetch={refetch} />
                <BottomButton 
                    left={eventOddPicks.length > 0 ? showTeaserOddLine(action, eventOddPicks.length) : null}
                    activate={eventOddPicks.length >= minTeams[action]} 
                    tip='SELECT ODDS' 
                    next='NEXT'
                    right={eventOddPicks.length > 0 ? eventOddPicks.length : null}
                    onPress={() => navigation.navigate('AgentWagerScreen')}
                />
			</Container>
		);
	}
}

const AgentEventWithData = compose(
	graphql(AgentQuery, {
		options: ({ action, tablePicks }) => ({ 
            fetchPolicy: 'network-only',
            variables: { 
			action: action,
			tablePicks: tablePicks,
		}})
	})
)(AgentEvent)

const mapStateToProps = state => ({ action: state.action, tablePicks: state.table.periods, eventOddPicks: state.eventOddPicks })
export default connect( mapStateToProps, { handleClearEventOdd } )(AgentEventWithData);
