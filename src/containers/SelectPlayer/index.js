import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, ScrollView, RefreshControl, View } from 'react-native';
import { compose, graphql } from 'react-apollo';
import moment from 'moment-timezone'
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import colors from '../../styles/colors'
import { handleSelectPlayer } from '../../actions/utilSelect'
import SelectBar from '../../components/SelectBar'
import { withNavigation } from 'react-navigation';
import { Query } from './gql'
import Loading from '../../components/Loading'
import NoDataFound from '../../components/NoDataFound'
class SelectPlayer extends Component {
	_pickPlayer(Player){
		this.props.handleSelectPlayer(Player)
		this.props.navigation.navigate(this.props.nextRouteName)
	}
	_refetch(){
		this.props.handleSelectPlayer('')
		this.props.data.refetch()
	}
	render() {
		if(this.props.data.loading ) return <Loading/>
		const { navigation, data: { loading, refetch, agentPlayers }, utilSelect: { Player: selectPlayer }, handleSelectPlayer, hasAllPlayersOption } = this.props
		if(_.isEmpty(agentPlayers)) return <NoDataFound loading={loading} onRefresh={refetch} text1='CREATE NEW PLAYER' onPress={ () => navigation.navigate('AgentPlayerControlCreatePlayerScreen') } />
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> } >
					{hasAllPlayersOption &&
						<SelectBar style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={ () => this._pickPlayer('') }>
							<StrongText style={{ color: colors[ selectPlayer === '' ? 'action' : 'white' ] }} text='ALL PLAYERS'/>
						</SelectBar>
					}

					<FlatList
						data={agentPlayers}
						keyExtractor={player => player._id}
						extraData={() => null}
						renderItem={({ item: player }) => {
							const isSelectedPlayer = selectPlayer === player._id
							return (
								<SelectBar style={ styles.container }  onPress={ () => this._pickPlayer(player._id) }>
									<View style={{ flexDirection: 'row' }} >
										<StrongText style={{ color: colors[ isSelectedPlayer ? 'action' : 'white' ] }} text={player.username}/>
									</View>
									<SmallText style={{ color: colors.mute, marginTop: 2 }} text={`last online - ${moment(player.lastOnlineAt).tz("America/Los_Angeles").fromNow()}`}/>
								</SelectBar>
							)
						}}
					/>
						</ScrollView>
			</Container>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column', 
		justifyContent: 'center', 
	},
});

const SelectPlayerWithData = compose( graphql(Query, { optinos: { fetchPolicy: 'network-only'} }) )(SelectPlayer)
const mapStateToProps = state => ({ utilSelect: state.utilSelect })
export default connect( mapStateToProps, { handleSelectPlayer } )(withNavigation(SelectPlayerWithData));
