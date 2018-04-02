import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import Query from './gql'
import { compose, graphql } from 'react-apollo';
import classNames from 'classnames'
import colors from '../../styles/colors'

import Loading from '../../components/Loading'
import Container from '../../components/Container'
import SectionTitle from '../../components/SectionTitle'
import BigNumber from '../../components/BigNumber'
import Hr from '../../components/Hr'

class State extends Component {
	render() {
		if(this.props.data.loading ) return <Loading/>
		const { data: { loading, refetch, betOrdersOverview: { activePlayers, totalAtRisk, totalToWin, totalBets }, agentCurrentCredit: { balance, pending } } } = this.props
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={refetch}/> }>
					<SectionTitle style={{ textAlign: 'center' }} title='CREDIT'/>
					<BigNumber title='BALANCE' style={{ color: colors[ classNames({ 'success': balance >= 0, 'danger': balance < 0 }) ] }} number={balance} />
					<BigNumber title='PENDING' style={{ color: colors.warning }} number={pending} />
					<Hr/>
					<SectionTitle style={{ textAlign: 'center' }} title='UPCOMING BETS'/>
					<BigNumber title='TOTAL AT RISK' style={{ color: colors.warning }} number={totalAtRisk} />
					<BigNumber title='TOTAL TO WIN' style={{ color: colors.success }} number={totalToWin} />
					<BigNumber title='ACTIVE PLAYERS' style={{ color: colors.primary}} number={activePlayers} />
					<BigNumber title='TOTAL BETS' style={{ color: colors.primary }} number={totalBets} />
				</ScrollView>
			</Container>
		);
	}
}

const StateWithData = compose( 
	graphql(Query, { options: {
		fetchPolicy: 'network-only',
		variables: {
			isClosed: false,
			Player: ''
		}
	}})
)(State)

export default StateWithData;