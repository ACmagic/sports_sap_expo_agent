import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, RefreshControl } from 'react-native';
import { Query } from './gql'
import { handleSelectSport, handleSelectLeague, handleSelectPeriod, handleClearTable } from '../../actions/table'
import Collapsible from 'react-native-collapsible';
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import colors from '../../styles/colors'
import BottomButton from '../../components/BottomButton'
import Loading from '../../components/Loading'

import NoDataFround from '../../components/NoDataFound'
import basketballImg from   '../../images/sports/basketball.jpg'
import footBallImg from     '../../images/sports/football.jpg'
import baseBallImg from     '../../images/sports/baseball.jpg'
import soccerImg from       '../../images/sports/soccer.jpg'
import hockeyImg from       '../../images/sports/hockey.jpg'
import fightingImg from     '../../images/sports/fighting.jpg'
import esportsImg from      '../../images/sports/esports.jpg'

const sportImages = [
    { sport: 'Basketball', img: basketballImg },
    { sport: 'Football', img: footBallImg },
    { sport: 'Baseball', img: baseBallImg },
    { sport: 'Soccer', img: soccerImg },
    { sport: 'Hockey', img: hockeyImg },
    { sport: 'Fighting', img: fightingImg },
    { sport: 'ESports', img: esportsImg }
]

class Sport extends Component {
	_refetch(){
		this.props.handleClearTable()
		this.props.data.refetch()
	}
	render() {

		if(this.props.data.loading ) return <Loading/>

		if(_.isEmpty(this.props.data.table.sports)) return <NoDataFround onPress={() => this.props.data.refetch()}/>
		const { nextRouteName, handleSelectSport, handleSelectLeague, handleSelectPeriod, navigation, data: { loading, table } } = this.props
		const { sports: tableSports, leagues: tableLeagues, periods: tablePeriods } = this.props.table
		return (
			<Container>
                <FlatList
                    data={table.sports}
                    keyExtractor={sport => sport._id}
                    extraData={() => null}
                    refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> }
                    renderItem={({item : sport}) => {
                    	const { img } = _.find(sportImages, { sport: sport.name })
                    	const isSelectedSport = _.some(tableSports, { sport: sport.name })
                    	const isSelectedSportWithPeriod = _.some(tablePeriods, { sport: sport.name })
                    	const isSelectedSportWithLeague = _.some(tableLeagues, { sport: sport.name })
                    	const leaguesLength = sport.leagues.length
                    	return (
                    		<View style={{ marginBottom: 9 }}>
	                    		<TouchableOpacity disabled={isSelectedSportWithPeriod || isSelectedSportWithLeague} onPress={ () => handleSelectSport({sport: sport.name}) }>
		                    		<ImageBackground style={{ height: 120, marginBottom: 3, justifyContent: 'center', }} source={img}>
			                    		<StrongText style={ [ styles.sportText, { fontSize: 24 } ] } text={sport.name.toUpperCase()} />
			                    		<StrongText style={ [ styles.sportText, { fontSize: 12 } ] } text={`${leaguesLength} LEAGUES AVAILABLE`}/>
		                    		</ImageBackground>
	                    		</TouchableOpacity>
	                    		<Collapsible collapsed={!isSelectedSport}>
					                <FlatList
					                    data={sport.leagues}
					                    keyExtractor={league => league._id}
					                    extraData={() => null}
					                    renderItem={({ item: league }) => {
					                    	const isSelectedLeague = _.some(tableLeagues, { sport: sport.name, league: league.name, region: league.region })
					                    	const isSelectedLeagueWithPeriod = _.some(tablePeriods, { sport: sport.name, league: league.name, region: league.region })
					                    	return (
					                    		<View>
							                    	<TouchableOpacity disabled={isSelectedLeagueWithPeriod} onPress={ () => handleSelectLeague({ sport: sport.name, league: league.name, region: league.region }) }>
								                    	<View style={ [ styles.row, { backgroundColor: colors.black, borderColor: colors.dark } ] }>
								                    		<StrongText style={{ marginLeft: '12%', color: isSelectedLeague ? colors.action : colors.white }} text={`${league.region ? (league.region.toUpperCase() + ' ') : '' }${league.name.toUpperCase()}`}/>
								                    	</View>
							                    	</TouchableOpacity>
							                    	<Collapsible collapsed={!isSelectedLeague}>
							                    		<FlatList
							                    			data={league.periods}
							                    			keyExtractor={period => period._id}
							                    			extraData={() => null}
							                    			renderItem={({ item: period }) => {
							                    				const isSelectedPeriod = _.some(tablePeriods, { sport: sport.name, league: league.name, region: league.region, period: period.name } )
							                    				return (
							                    					<TouchableOpacity onPress={ () => handleSelectPeriod({ sport: sport.name, league: league.name, region: league.region, period: period.name }) }>
												                    	<View style={ [ styles.row, { backgroundColor: colors.dark, borderColor: colors.black } ] }>
												                    		<StrongText style={{ marginLeft: '24%', color: isSelectedPeriod ? colors.action : colors.white }} text={period.name.toUpperCase()}/>
												                    	</View>
											                    	</TouchableOpacity>
							                    				)
							                    			}}
							                    		/>
							                    	</Collapsible>
						                    	</View>
					                    	)
					                    }}
					                />
	                    		</Collapsible>
                    		</View>
                    	)
                    }}
                />

				<BottomButton 
					activate={tablePeriods.length > 0} 
					tip='SELECT SPORTS' 
					next='NEXT' 
					onPress={() => navigation.navigate(nextRouteName)}
				/>

			</Container>
		);
	}
}

const styles = StyleSheet.create({
    sportText: {
        backgroundColor: 'transparent',
        paddingLeft: '6%',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 2,
        textShadowOffset: {
          height: 1,
          width: 1
        }
    },
    row: {
    	height: 42, 
    	justifyContent: 'center', 
    	borderBottomWidth: 3
    }
});

const mapStateToProps = (state) => ({ 
	action: state.action, 
	table: state.table
})

const SportWithData = compose(graphql(Query, {options: ({ action }) => ({ 
	fetchPolicy: 'network-only',
	variables: { action: action }})}))(Sport)

export default connect( mapStateToProps, { handleSelectSport, handleSelectLeague, handleSelectPeriod, handleClearTable } )(withNavigation(SportWithData));
