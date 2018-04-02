import React, { Component } from 'react';
import _ from 'lodash'
import { ScrollView, RefreshControl, View } from 'react-native';
import Container from '../../components/Container'
import colors from '../../styles/colors'
import Loading from '../../components/Loading'
import BigNumber from '../../components/BigNumber'
import classNames from 'classnames'
import { connect } from 'react-redux';
import Record from '../../components/BigNumber.Record'
import SectionTitle from '../../components/SectionTitle'
import Hr from '../../components/Hr'

class OpenBetOverview extends Component {
	render() {
		if(this.props.data.loading ) return <Loading/>
		const { utilSelect: { Player }, navigation, data: { refetch, loading, betOrdersOverview: { activePlayers, resultAmount, totalBets,
			overview: {
				action: {
					straight,
					parlay,
					basicTeaser,
					specialTeaser,
					bigTeaser,
					superTeaser,
					actionReverse,
					winReverse
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
					Draw
				}
			}
		}}} = this.props

		const isStraightHide = straight.Won + straight.Lost + straight.Push === 0
		const isParlayHide = parlay.Won + parlay.Lost + parlay.Push === 0
		const isBasicTeaserHide = basicTeaser.Won + basicTeaser.Lost + basicTeaser.Push === 0
		const isSpecialTeaserHide = specialTeaser.Won + specialTeaser.Lost + specialTeaser.Push === 0
		const isBigTeaserHide = bigTeaser.Won + bigTeaser.Lost + bigTeaser.Push === 0
		const isSuperTeaserHide = superTeaser.Won + superTeaser.Lost + superTeaser.Push === 0
		const isActionReverseHide = actionReverse.Won + actionReverse.Lost + actionReverse.Push === 0
		const isWinReverseHide = winReverse.Won + winReverse.Lost + winReverse.Push === 0

		const isBasketballHide = Basketball.Won + Basketball.Lost + Basketball.Push === 0
		const isFootballHide = Football.Won + Football.Lost + Football.Push === 0
		const isBaseballHide = Baseball.Won + Baseball.Lost + Baseball.Push === 0
		const isHockeyHide = Hockey.Won + Hockey.Lost + Hockey.Push === 0
		const isSoccerHide = Soccer.Won + Soccer.Lost + Soccer.Push === 0
		const isFightingHide = Fighting.Won + Fighting.Lost + Fighting.Push === 0
		const isESportsHide = ESports.Won + ESports.Lost + ESports.Push === 0

		const isMLineHide = MLine.Won + MLine.Lost + MLine.Push === 0
		const isSpreadHide = Spread.Won + Spread.Lost + Spread.Push === 0
		const isTotalHide = Total.Won + Total.Lost + Total.Push === 0
		const isDrawHide = Draw.Won + Draw.Lost + Draw.Push === 0

		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={refetch}/> }>
{ (_.isNumber(activePlayers) && Player === '') && <BigNumber title='PLAYERS' style={{ color: colors.primary }} number={activePlayers} /> }
					<BigNumber title='TOTAL BETS' style={{ color: colors.primary }} number={totalBets} />
 					<BigNumber title='RESULT' style={{ color: colors[classNames({ 'success': resultAmount > 0, 'danger': resultAmount < 0, 'mute': resultAmount === 0 })] }} number={resultAmount} />
					{totalBets > 0 && 
						<View>
							<Hr/>
							<SectionTitle style={{ textAlign: 'center' }} title='ACTION'/>
							<Record hide={isStraightHide} title='STRAIGHT' won={straight.Won} lost={straight.Lost} push={straight.Push} />
							<Record hide={isParlayHide} title='PARLAY' won={parlay.Won} lost={parlay.Lost} push={parlay.Push} />
							<Record hide={isBasicTeaserHide} title='BASIC TEASER' won={basicTeaser.Won} lost={basicTeaser.Lost} push={basicTeaser.Push} />
							<Record hide={isSpecialTeaserHide} title='SPECIAL TEASER' won={specialTeaser.Won} lost={specialTeaser.Lost} push={specialTeaser.Push} />
							<Record hide={isBigTeaserHide} title='BIG TEASER' won={bigTeaser.Won} lost={bigTeaser.Lost} push={bigTeaser.Push} />
							<Record hide={isSuperTeaserHide} title='SUPER TEASER' won={superTeaser.Won} lost={superTeaser.Lost} push={superTeaser.Push} />
							<Record hide={isActionReverseHide} title='ACTION REVERSE' won={actionReverse.Won} lost={actionReverse.Lost} push={actionReverse.Push} />
							<Record hide={isWinReverseHide} title='WIN REVERSE' won={winReverse.Won} lost={winReverse.Lost} push={winReverse.Push} />
							<Hr/>
							<SectionTitle style={{ textAlign: 'center' }} title='SPORT'/>
							<Record hide={isBasketballHide} title='BASKETBALL' won={Basketball.Won} lost={Basketball.Lost} push={Basketball.Push} />
							<Record hide={isFootballHide} title='FOOTBALL' won={Football.Won} lost={Football.Lost} push={Football.Push} />
							<Record hide={isBaseballHide} title='BASEBALL' won={Baseball.Won} lost={Baseball.Lost} push={Baseball.Push} />
							<Record hide={isHockeyHide} title='HOCKEY' won={Hockey.Won} lost={Hockey.Lost} push={Hockey.Push} />
							<Record hide={isSoccerHide} title='SOCCER' won={Soccer.Won} lost={Soccer.Lost} push={Soccer.Push} />
							<Record hide={isFightingHide} title='BASKETBALL' won={isFightingHide.Won} lost={isFightingHide.Lost} push={isFightingHide.Push} />
							<Record hide={isESportsHide} title='E-SPORTS' won={ESports.Won} lost={ESports.Lost} push={ESports.Push} />
							<Hr/>
							<SectionTitle style={{ textAlign: 'center' }} title='ODD'/>
							<Record hide={isMLineHide} title='MONEY LINE' won={MLine.Won} lost={MLine.Lost} push={MLine.Push} />
							<Record hide={isSpreadHide} title='SPREAD' won={Spread.Won} lost={Spread.Lost} push={Spread.Push} />
							<Record hide={isTotalHide} title='TOTAL' won={Total.Won} lost={Total.Lost} push={Total.Push} />
							<Record hide={isDrawHide} title='DRAW' won={Draw.Won} lost={Draw.Lost} push={Draw.Push} />
						</View>
					}
				</ScrollView>
			</Container>
		);
	}
}

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, null )(OpenBetOverview);
