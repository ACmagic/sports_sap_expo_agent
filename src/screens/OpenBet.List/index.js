import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import { compose, graphql } from 'react-apollo';
import moment from 'moment-timezone'
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import colors from '../../styles/colors'
import _ from 'lodash'
import SelectBar from '../../components/SelectBar'
import NoDataFound from '../../components/NoDataFound'
import Loading from '../../components/Loading'
import { handleSelectBetOrder } from '../../actions/utilSelect'

class OpenBetList extends Component {
	_selectBetOrder(BetOrder){
		this.props.handleSelectBetOrder(BetOrder)
		this.props.navigation.navigate(this.props.nextRouteName)
	}
	_refetch(){
		this.props.handleSelectBetOrder('')
		this.props.data.refetch()
	}
	render() {
		const { data: { refetch, loading, betOrders }, navigation, handleSelectBetOrder, utilSelect: { BetOrder } } = this.props
        if(_.isEmpty(betOrders)) return <NoDataFound onPress={ () => navigation.navigate(this.props.prevRouteName) } />
		return (
			<Container>
				<FlatList
					data={betOrders}
					keyExtractor={betOrder => betOrder._id}
					refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> }
					extraData={() => null}
					renderItem={({item : betOrder}) => {
						const selectedBetOrderColor = BetOrder === betOrder._id ? { color: colors.action } : { color: colors.white }
						return (
							<SelectBar style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => this._selectBetOrder(betOrder._id)}>
								<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
									<StrongText style={ selectedBetOrderColor } text={betOrder.title.toUpperCase()}/>
									<SmallText text={(betOrder.Player ? (betOrder.Player.username + ' ') : '') + '#' + betOrder.ID.toUpperCase()}/>
						  			<SmallText text={`Submit @ ${moment(betOrder.createdAt).tz("America/Los_Angeles").format('MMM DD, YY - hh:mm A')}`}/>
								</View>
								<View style={{ flexDirection: 'column', justifyContent: 'space-around', paddingRight: 16 }}>
									<Text style={{ color: colors.warning, fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>{betOrder.bet.atRisk}</Text>
									<Text style={{ color: colors.success, fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>{betOrder.bet.toWin}</Text>
								</View>
							</SelectBar>
						)
					}}
				/>
			</Container>
		);
	}
}

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, { handleSelectBetOrder } )(OpenBetList);
