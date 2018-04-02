import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView, RefreshControl } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { Query } from './gql'

import _ from 'lodash'
import moment from 'moment-timezone'
import Card from '../../components/Card'
import RowTDE from '../../components/RowTDE'
import RowTDM from '../../components/RowTDM'
import RowTDMTeam from '../../components/RowTDM.Team'
import RowTDMOddMarked from '../../components/RowTDM.OddMarked'
import Container from '../../components/Container'
import colors from '../../styles/colors'
import HeaderTitle from '../../components/HeaderTitle'
import NoDataFound from '../../components/NoDataFound'
import Loading from '../../components/Loading'
import { withNavigation } from 'react-navigation';
import classNames from 'classnames';

class BetOrderDetail extends Component {
	render() {
		if(this.props.data.loading ) return <Loading />
		if(_.isEmpty(this.props.data.betOrder)) return <NoDataFound onPress={ () =>  this.props.navigation.navigate(this.props.prevRouteName)} />
		const { data: { refetch, loading, betOrder }, authRole } = this.props
		const { title, status, ID, createdAt, bet: { atRisk, toWin }, Picks, Player: { username } } = betOrder
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={refetch}/> }>
					<HeaderTitle title={title.toUpperCase()} />
					<Card>
						<RowTDM title='ORDER#' detail={ID.toUpperCase()} />
						{ authRole === 'Agent' && <RowTDM title='PLAYER' detail={username} /> }
						<RowTDM title='AT RISK' style={{ color: colors.warning }} detail={atRisk} />
						<RowTDM title='TO WIN' style={{ color: colors.success }} detail={toWin} />
		  				<RowTDM title='STATUS' detail={status} />
						<RowTDM title='SUBMIT' detail={moment(createdAt).tz("America/Los_Angeles").format('ddd, MMM DD, YY - hh:mm A')} />
					</Card>

					<FlatList 
						data={Picks}
						keyExtractor={Pick => Pick._id}
						extraData={() => null}
						renderItem={({ item: { marked, Event, status } }) => {
							const started = (status === 'Pending' && moment(Event.matchTime).tz("America/Los_Angeles").isBefore(moment().tz("America/Los_Angeles")))
							console.log(started)
							return (
								<View>
									<HeaderTitle title={Event.title} />
									<Card>
										<RowTDM title='TIME' detail={moment(Event.matchTime).tz("America/Los_Angeles").format('ddd, MMM DD, YY - hh:mm A')} />
										<RowTDM title='PERIOD' detail={Event.period} />
										<RowTDMTeam team='AWAY' img={Event.teamLogo.away} defaultImg={Event.teamLogo.default} score={null} name={Event.team.away}/>
										<RowTDMTeam team='HOME' img={Event.teamLogo.home} defaultImg={Event.teamLogo.default} score={null} name={Event.team.home}/>
										<RowTDMOddMarked oddType={marked.oddType} oddTarget={marked.oddTarget} oddPoint={marked.oddPoint} oddLine={marked.oddLine} />

						   {!started && <RowTDM title='STATUS' style={{ color: colors[ classNames({ 'success': status === 'Won', 'danger': status === 'Lost', 'dust': status !== 'Won' && status !== 'Lost' }) ]}} detail={status} />}
						   { started && <RowTDM title='STATUS' style={{ color: colors.action }} detail='Pending...' />}
										<RowTDM title='UPDATE' detail={moment(Event.updatedAt).tz("America/Los_Angeles").format('ddd, MMM DD, YY - hh:mm A')} />
									</Card>
									
								</View>
							)
						}}
					/>

				</ScrollView>

			</Container>
		);
	}
}

const BetOrderDetailWithData = compose( 
	graphql(Query, {
		options: ({ utilSelect: { BetOrder } }) => ({
			fetchPolicy: 'network-only',
			variables: { 
				BetOrder: BetOrder,
			}
		})
	})
)(BetOrderDetail)

const mapStateToProps = state => ({ authRole: state.auth.jwt.role, utilSelect: state.utilSelect })

export default connect( mapStateToProps, null )(withNavigation(BetOrderDetailWithData));