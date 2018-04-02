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
import NoDataFround from '../../components/NoDataFound'
import Loading from '../../components/Loading'
import { handleSelectBetOrder } from '../../actions/utilSelect'
import classNames from 'classnames'

class HistoryBetList extends Component {
	_selectBetOrder(BetOrder){
		this.props.handleSelectBetOrder(BetOrder)
		this.props.navigation.navigate(this.props.nextRouteName)
	}
	_refetch(){
		this.props.handleSelectBetOrder('')
		this.props.data.refetch()
	}
	render() {
		if(this.props.data.loading ) return <Loading />
		const { data: { refetch, loading, betOrders }, navigation, handleSelectBetOrder, utilSelect: { BetOrder } } = this.props
        if(_.isEmpty(betOrders)) return <NoDataFround onPress={ () => navigation.navigate(this.props.prevRouteName) } />
		return (
			<Container>
				<FlatList
					data={betOrders}
					keyExtractor={betOrder => betOrder._id}
					refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> }
					extraData={() => null}
					renderItem={({item : betOrder}) => {
						const selectedBetOrderColor = BetOrder === betOrder._id ? { color: colors.action } : { color: colors.white }
						const historyBetResultColor = colors[classNames({ 'dust': betOrder.resultAmount === 0, 'success': betOrder.resultAmount > 0, 'danger': betOrder.resultAmount < 0 })]
						return (
							<SelectBar style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => this._selectBetOrder(betOrder._id)}>
								<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
									<StrongText style={ selectedBetOrderColor } text={betOrder.title.toUpperCase()}/>
									<SmallText text={(betOrder.Player ? (betOrder.Player.username + ' ') : '') + '#' + betOrder.ID.toUpperCase()}/>
						  			<SmallText text={`Closed @ ${moment(betOrder.updatedAt).tz("America/Los_Angeles").format('MMM DD, YY - hh:mm A')}`}/>
								</View>
								<View style={{ flexDirection: 'column', justifyContent: 'space-around', paddingRight: 16 }}>
									<Text style={{ color: historyBetResultColor, fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>{betOrder.status}</Text>
									<Text style={{ color: historyBetResultColor, fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>{betOrder.resultAmount}</Text>
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

export default connect( mapStateToProps, { handleSelectBetOrder } )(HistoryBetList);
