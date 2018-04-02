import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { PlayerQuery, Mutation } from './gql'
import { withFormik } from 'formik';
import { generateAtRiskToWin, submitValidate } from './functions'

import moment from 'moment-timezone'
import Card from '../../components/Card'
import RowTDE from '../../components/RowTDE'
import RowTDM from '../../components/RowTDM'
import RowTDMTeam from '../../components/RowTDM.Team'
import RowTDMOddMarked from '../../components/RowTDM.OddMarked'
import Container from '../../components/Container'
import SectionTitle from '../../components/SectionTitle'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import colors from '../../styles/colors'
import BottomButton from '../../components/BottomButton'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderTitle from '../../components/HeaderTitle'
import renameAction from '../../utils/functions/renameAction'
import showTeaserOddLine from '../../utils/functions/showTeaserOddLine'
import { NavigationActions } from 'react-navigation'
import SubmitModalWithPasscode from '../../containers/SubmitModalWithPasscode'
import { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } from '../../actions/submitModal'
import NoDataFround from '../../components/NoDataFound'
import Loading from '../../components/Loading'
import { handleClearWagerData } from '../../actions'


class Wager extends Component {
    _inputBetAmount(betAmount){
    	const { action, values: { betType }, data: { wagerPicks }  } = this.props
    	const { atRisk, toWin } = generateAtRiskToWin( action, betType, betAmount, wagerPicks )
    	this.props.setFieldValue('betAmount', betAmount)
    	this.props.setFieldValue('atRisk', atRisk.toString())
    	this.props.setFieldValue('toWin', toWin.toString())
    }
    _switchBetType(){
    	this.props.resetForm()
    	this.props.setFieldValue('betType', this.props.values.betType === 'wager' ? 'risk' : 'wager')
    }
    async _refetch(){
    	this.props.resetForm()
    	this.props.data.refetch()
    }
	render() {
		const { creditRemaining, action, values: { betType, betAmount, atRisk, toWin, passcode }, errors, submitForm, handleSubmitModalOn, handleSubmit, setFieldValue, isSubmitting, navigation, handleSubmitModalReset, handleClearWagerData, data: { loading, wagerPicks } } = this.props
		return (
			<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> }>
				<HeaderTitle title={`${wagerPicks.length} TEAM${wagerPicks.length > 1 ? 'S' : ''} ${renameAction(action)}`} />
				<Card>
					<View style={ styles.inputRow }>
						<TouchableOpacity style={{ flex: 1 }} onPress={this._switchBetType.bind(this)}>
							<StrongText style={{ color: betType === 'wager' ? colors.primary : colors.warning }} text={`${betType.toUpperCase()}`}/>
						</TouchableOpacity>
						<TextInput 
							style={ styles.betInput }
							value={betAmount}
							onChangeText={this._inputBetAmount.bind(this)}
							placeholder='ENTER AMOUNT'
							placeholderTextColor={colors.mute}
							keyboardType='number-pad'
							returnKeyType='done'
							keyboardAppearance='dark'
						/>
					</View>
					{showTeaserOddLine(action, wagerPicks.length) && <RowTDE title='TEASER LINE' style={{ color: colors.mute }} detail={showTeaserOddLine(action, wagerPicks.length)} />}
					<RowTDE title='AT RISK' style={{ color: colors.warning }} detail={atRisk} />
					<RowTDE title='TO WIN' style={{ color: colors.success }} detail={toWin} />
					{_.isNumber(creditRemaining) && <RowTDE title='CREDIT REMANING' style={{ color: colors[ creditRemaining >= 0 ? 'action' : 'danger' ] }} detail={creditRemaining} />}
				</Card>

			    <FlatList
			        data={wagerPicks}
			        keyExtractor={pick => pick.ID}
			        extraData={() => null}
			        renderItem={({item : pick}) => {
			            const { Event, marked } = pick
			            return (
			                <View>
			                    <HeaderTitle title={Event.title} />
			                    <Card>
			                        <RowTDM title='TIME' detail={moment(Event.matchTime).tz("America/Los_Angeles").format('ddd, MMM DD, YY - hh:mm A')} />
			                        <RowTDM title='PERIOD' detail={Event.period} />
			                        <RowTDMTeam team='AWAY' img={Event.teamLogo.away} defaultImg={Event.teamLogo.default} name={Event.team.away}/>
			                        <RowTDMTeam team='HOME' img={Event.teamLogo.home} defaultImg={Event.teamLogo.default} name={Event.team.home}/>
			                        <RowTDMOddMarked oddType={marked.oddType} oddTarget={marked.oddTarget} oddPoint={marked.oddPoint} oddLine={marked.oddLine} />
			                        <Text style={ styles.expires }>odd expires at {moment(Event.cutOffAt).tz("America/Los_Angeles").format('hh:mm A')}</Text>
			                    </Card>
			                </View>
			            )
			        }}
			    />   

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	inputRow: {
		 alignItems: 'center', 
		 flexDirection: 'row', 
		 height: 36, 
		 borderBottomWidth: 1, 
		 borderColor: colors.dark
	},
	betInput: {
		flex: 1, 
		fontSize: 13, 
		fontWeight: 'bold', 
		textAlign: 'right', 
		color: colors.white
	},
    expires: {
    	textAlign: 'right',
        marginTop: 8, 
        color: colors.mute, 
        fontSize: 8, 
    }
});

export default Wager
