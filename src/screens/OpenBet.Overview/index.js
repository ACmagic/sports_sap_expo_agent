import React, { Component } from 'react';
import _ from 'lodash'
import { ScrollView, RefreshControl, View } from 'react-native';
import Container from '../../components/Container'
import colors from '../../styles/colors'
import Loading from '../../components/Loading'
import BigNumber from '../../components/BigNumber'
import { connect } from 'react-redux';
import Record from '../../components/BigNumber.Record'
import SectionTitle from '../../components/SectionTitle'
import Hr from '../../components/Hr'

class OpenBetOverview extends Component {
	render() {
		if(this.props.data.loading ) return <Loading/>
		const { utilSelect: { Player }, navigation, data: { refetch, loading, betOrdersOverview: { 
			activePlayers, 
			totalAtRisk, 
			totalToWin, 
			totalBets,
			overview: {
				action: {
					straight,
					parlay,
					basicTeaser,
					specialTeaser,
					bigTeaser,
					superTeaser,
					actionReverse,
					winReverse,
				},
				sport: {
					Basketball,
					Football,
					Baseball,
					Hockey,
					Soccer,
					Fighting,
					ESports,
				},
				odd: {
					MLine,
					Spread,
					Total,
					Draw,
				}
			}
		}}} = this.props
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={refetch}/> }>
{ (_.isNumber(activePlayers) && Player === '') && <BigNumber title='ACTIVE PLAYERS' style={{ color: colors.primary }} number={activePlayers} /> }
					<BigNumber title='TOTAL BETS' style={{ color: colors.primary }} number={totalBets} />
					<BigNumber title='TOTAL AT RISK' style={{ color: colors.warning }} number={totalAtRisk} />
					<BigNumber title='TOTAL TO WIN' style={{ color: colors.success }} number={totalToWin} />
					{totalBets > 0 &&
						<View>
							<Hr/>
							<SectionTitle style={{ textAlign: 'center' }} title='ACTION'/>
							<Record hide={straight.Pending === 0} title='STRAIGHT' pending={straight.Pending} />
							<Record hide={parlay.Pending === 0} title='PARLAY' pending={parlay.Pending} />
							<Record hide={basicTeaser.Pending === 0} title='BASIC TEASER' pending={basicTeaser.Pending} />
							<Record hide={specialTeaser.Pending === 0} title='SPECIAL TEASER' pending={specialTeaser.Pending} />
							<Record hide={bigTeaser.Pending === 0} title='BIG TEASER' pending={bigTeaser.Pending} />
							<Record hide={superTeaser.Pending === 0} title='SUPER TEASER' pending={superTeaser.Pending} />
							<Record hide={actionReverse.Pending === 0} title='ACTION REVERSE' pending={actionReverse.Pending} />
							<Record hide={winReverse.Pending === 0} title='WIN REVERSE' pending={winReverse.Pending} />
							<Hr/>
							<SectionTitle style={{ textAlign: 'center' }} title='SPORT'/>
							<Record hide={Basketball.Pending === 0} title='BASKETBALL' pending={Basketball.Pending} />
							<Record hide={Football.Pending === 0} title='FOOTBALL' pending={Football.Pending} />
							<Record hide={Baseball.Pending === 0} title='BASEBALL' pending={Baseball.Pending} />
							<Record hide={Hockey.Pending === 0} title='HOCKEY' pending={Hockey.Pending} />
							<Record hide={Soccer.Pending === 0} title='SOCCER' pending={Soccer.Pending} />
							<Record hide={Fighting.Pending === 0} title='FIGHTING' pending={Fighting.Pending} />
							<Record hide={ESports.Pending === 0} title='E-SPORTS' pending={ESports.Pending} />
							<Hr/>
							<SectionTitle style={{ textAlign: 'center' }} title='ODD'/>
							<Record hide={MLine.Pending === 0} title='MONEY LINE' pending={MLine.Pending} />
							<Record hide={Spread.Pending === 0} title='SPREAD' pending={Spread.Pending} />
							<Record hide={Total.Pending === 0} title='TOTAL' pending={Total.Pending} />
							<Record hide={Draw.Pending === 0} title='DRAW' pending={Draw.Pending} />
						</View>
					}
				</ScrollView>
			</Container>
		);
	}
}

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, null )(OpenBetOverview);