import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput, Switch, Picker, RefreshControl } from 'react-native';
import _ from 'lodash'
import moment from 'moment'
import Card from '../../components/Card'
import Container from '../../components/Container'
import SectionTitle from '../../components/SectionTitle'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import colors from '../../styles/colors'
import { NavigationActions } from 'react-navigation'
import SelectBar from '../../components/SelectBar'
import HeaderTitle from '../../components/HeaderTitle'
import { withNavigation } from 'react-navigation';
import BottomButton from '../../components/BottomButton'
import { handleSelectPlayer } from '../../actions/utilSelect'
import Loading from '../../components/Loading'
import StripBar from '../../components/StripBar'
import NoDataFound from '../../components/NoDataFound'
import Collapsible from 'react-native-collapsible';
import yup from 'yup'
import RowTDE from '../../components/RowTDE'
import { Query, Mutation, switchActivate } from './gql'
import { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } from '../../actions/submitModal'
import SubmitModalWithPasscode from '../../containers/SubmitModalWithPasscode'

const initialValues = { 
	newPassword: '', 
	newPasscode: '', 
	newInitial: '',
	newMaxWin: '',
	newMinRisk: '',
	isSetNewWagerLimit: false,
	newParlay: false,
	newParlayTeam: 2,
	newBasicTeaser: false,
	newSpecialTeaser: false,
	newBigTeaser: false,
	newSuperTeaser: false,
	newWinReverse: false,
	newActionReverse: false,
	newBasicTeaserTeam: 2,
	newSpecialTeaserTeam: 2,
	newBigTeaserTeam: 2,
	newWinReverseTeam: 2,
	newActionReverseTeam: 2,
	passcode: ''
}

const limitTeam = {
	newParlayTeam: { min: 2, max: 8 },
	newPasicTeaserTeam: { min: 2, max: 8 },
	newSpecialTeaserTeam: { min: 2, max: 8 },
	newBigTeaserTeam: { min: 2, max: 8 },
	newWinReverseTeam: { min: 2, max: 4 },
	newActionReverseTeam: { min: 2, max: 4 },
}

class EditPlayer extends Component {
	_changeActionTeamValue(actionTeam){
		const { setFieldValue, values } = this.props
		values[actionTeam] < limitTeam[actionTeam].max ? setFieldValue(actionTeam, (values[actionTeam]+1)) : setFieldValue(actionTeam, limitTeam[actionTeam].min)
	}
	_switchResetWagerLimit(val){
		this.props.setFieldValue('isSetNewWagerLimit', val)
		const { parlay,
				parlayTeam,
				basicTeaser,
				specialTeaser,
				bigTeaser,
				superTeaser,
				winReverse,
				actionReverse,
				basicTeaserTeam,
				specialTeaserTeam,
				bigTeaserTeam,
				winReverseTeam,
				actionReverseTeam 
		} = this.props.data.agentPlayer.wagerLimit

		if(val){
			this.props.setFieldValue('newParlay', parlay)
			this.props.setFieldValue('newParlayTeam', parlayTeam)
			this.props.setFieldValue('newBasicTeaser', basicTeaser)
			this.props.setFieldValue('newBasicTeaserTeam', basicTeaserTeam)
			this.props.setFieldValue('newSpecialTeaser', specialTeaser)
			this.props.setFieldValue('newSpecialTeaserTeam', specialTeaserTeam)
			this.props.setFieldValue('newBigTeaser', bigTeaser)
			this.props.setFieldValue('newBigTeaserTeam', bigTeaserTeam)
			this.props.setFieldValue('newSuperTeaser', superTeaser)
			this.props.setFieldValue('newWinReverse', winReverse)
			this.props.setFieldValue('newWinReverseTeam', winReverseTeam)
			this.props.setFieldValue('newActionReverse', actionReverse)
			this.props.setFieldValue('newActionReverseTeam', actionReverseTeam)
		}
	}
	render() {
		if(this.props.data.loading ) return <Loading />
		if(_.isEmpty(this.props.data.agentPlayer)) return <NoDataFound onPress={() => this.props.navigation.goBack()} />
		const { utilSelect: { Player }, navigation, errors, handleSubmit, isSubmitting, setFieldValue, handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset, switchPlayerActivate } = this.props
		const { 
			newPassword, 
			newPasscode, 
			newInitial, 
			newMinRisk, 
			newMaxWin, 
			isSetNewWagerLimit, 
			newParlay, 
			newParlayTeam,
			newBasicTeaser,
			newSpecialTeaser,
			newBigTeaser,
			newSuperTeaser,
			newWinReverse,
			newActionReverse,
			newBasicTeaserTeam,
			newSpecialTeaserTeam,
			newBigTeaserTeam,
			newWinReverseTeam,
			newActionReverseTeam,
			passcode
		} = this.props.values

		const { loading, refetch, agentPlayer: { isActivate, username, 
			wagerLimit: { 
				initialCredit,
				minRisk, 
				maxWin, 
				parlay,
				parlayTeam,
				basicTeaser,
				specialTeaser,
				bigTeaser,
				superTeaser,
				winReverse,
				actionReverse,
				basicTeaserTeam,
				specialTeaserTeam,
				bigTeaserTeam,
				winReverseTeam,
				actionReverseTeam  
			} 
		}} = this.props.data

		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={refetch}/> }>

					<StripBar style={{ color: colors[isActivate ? 'success' : 'danger'] }} title={isActivate ? 'ACCOUNT ACTIVATE' : 'ACCOUNT DEACTIVATED'}>
						<Switch 
							style={styles.switch} 
							value={isActivate} 
							onValueChange={val => switchPlayerActivate({ variables: { Player: Player, isActivate: val } }).then(() => refetch())}
						/>
					</StripBar>

					<StripBar style={{ color: colors.white }} title='USERNAME'>
						<TouchableOpacity style={ styles.setActionTeam } onPress={ () => null }>
							<StrongText style={ styles.setActionTeamVal } text={username} />
						</TouchableOpacity>
					</StripBar>

					{isActivate &&	
					<View>

					<StripBar title='NEW PASSWORD'>
						<TextInput 
							style={ styles.input }
							placeholder='Leave Empty If No Change'
							secureTextEntry={true}
							autoCorrect={false}
							placeholderTextColor={colors.mute}
							keyboardAppearance='dark'
							value={newPassword}
							maxLength={12}
							onChangeText={text => setFieldValue('newPassword', text)}
						/>
					</StripBar>

					<StripBar title='NEW PASSCODE'>
						<TextInput 
							style={ styles.input }
							returnKeyType='done'
							secureTextEntry={true}
							placeholder='Leave Empty If No Change'
							autoCorrect={false}
							placeholderTextColor={colors.mute}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={newPasscode}
							maxLength={4}
							onChangeText={text => setFieldValue('newPasscode', text)}
						/>
					</StripBar>

					<StripBar title='WEEKLY INITIAL CREDIT'>
						<TextInput 
							style={ [ styles.input, { color: colors.action } ] }
							returnKeyType='done'
							placeholder={initialCredit.toString()}
							autoCorrect={false}
							placeholderTextColor={colors.action}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={newInitial}
							onChangeText={text => setFieldValue('newInitial', text)}
						/>
					</StripBar>

					<StripBar title='MINIMUN RISK PER BET'>
						<TextInput 
							style={ [ styles.input, { color: colors.warning } ] }
							returnKeyType='done'
							placeholder={minRisk.toString()}
							autoCorrect={false}
							placeholderTextColor={colors.warning}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={newMinRisk}
							onChangeText={text => setFieldValue('newMinRisk', text)}
						/>
					</StripBar>

					<StripBar title='MAXIMUN WIN PER BET'>
						<TextInput 
							style={ [ styles.input, { color: colors.success } ] }
							returnKeyType='done'
							placeholder={maxWin.toString()}
							autoCorrect={false}
							placeholderTextColor={colors.success}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={newMaxWin}
							onChangeText={text => setFieldValue('newMaxWin', text)}
						/>
					</StripBar>

					<StripBar title='EDIT ACTIONS'>
						<Switch 
							style={styles.switch} 
							value={isSetNewWagerLimit} 
							onValueChange={val => this._switchResetWagerLimit(val)}
						/>
					</StripBar>


					<Collapsible collapsed={!isSetNewWagerLimit}>

					<StripBar title='STRAIGHT'>
							<Switch 
								disabled={true}
								style={styles.switch} 
								value={true} 
							/>
						</StripBar>

						<StripBar title='PARLAY'>
							<Switch 
								style={styles.switch} 
								value={newParlay} 
								onValueChange={val => setFieldValue('newParlay', val)}
							/>
						</StripBar>
						<Collapsible collapsed={!newParlay}>
							<StripBar style={{ color: colors.mute }} title='PARLAY 2-8 TEAMS'>
								<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('newParlayTeam') }>
									<StrongText style={ styles.setActionTeamVal } text={newParlayTeam} />
								</TouchableOpacity>
							</StripBar>
						</Collapsible>



					<StripBar title='BASIC TEASER'>
						<Switch 
							style={styles.switch} 
							value={newBasicTeaser} 
							onValueChange={val => setFieldValue('newBasicTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!newBasicTeaser}>
						<StripBar style={{ color: colors.mute }} title='BASIC TEASER 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('newBasicTeaserTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={newBasicTeaserTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='SPECIAL TEASER'>
						<Switch 
							style={styles.switch} 
							value={newSpecialTeaser} 
							onValueChange={val => setFieldValue('newSpecialTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!newSpecialTeaser}>
						<StripBar style={{ color: colors.mute }} title='SPECIAL TEASER 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('newSpecialTeaserTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={newSpecialTeaserTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='BIG TEASER'>
						<Switch 
							style={styles.switch} 
							value={newBigTeaser} 
							onValueChange={val => setFieldValue('newBigTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!newBigTeaser}>
						<StripBar style={{ color: colors.mute }} title='BIG TEASER 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('newBigTeaserTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={newBigTeaserTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='SUPER TEASER'>
						<Switch 
							style={styles.switch} 
							value={newSuperTeaser} 
							onValueChange={val => setFieldValue('newSuperTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!newSuperTeaser}>
						<StripBar style={{ color: colors.mute }} title='SUPER TEASER 3 TEAMS'>
							<View style={ styles.setActionTeam }>
								<StrongText style={ styles.setActionTeamVal } text={3} />
							</View>
						</StripBar>
					</Collapsible>

					<StripBar title='ACTION REVERSE'>
						<Switch 
							style={styles.switch} 
							value={newActionReverse} 
							onValueChange={val => setFieldValue('newActionReverse', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!newActionReverse}>
						<StripBar style={{ color: colors.mute }} title='ACTION REVERSE 2-4 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('newActionReverseTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={newActionReverseTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='WIN REVERSE'>
						<Switch 
							style={ styles.switch } 
							value={newWinReverse} 
							onValueChange={val => setFieldValue('newWinReverse', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!newWinReverse}>
						<StripBar style={{ color: colors.mute }} title='WIN REVERSE 2-4 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('newWinReverseTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={newWinReverseTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>


					</Collapsible>
				</View>
				}
				</ScrollView>

				<BottomButton 
					activate={_.isEmpty(errors) && !_.isEqual(initialValues, this.props.values)} 
					warning={ errors[Object.keys(errors)[0]] }
					tip='MAKE CHANGES' 
					next='SUBMIT' 
					onPress={handleSubmitModalOn}
				/>



                <SubmitModalWithPasscode
                	handleSubmit={handleSubmit}
                	setFieldValue={setFieldValue}
                	passcode={passcode}
                	isSubmitting={isSubmitting}
                	handleAfterSuccess={() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            key: null,
                            actions: [ NavigationActions.navigate({routeName: 'AgentNavigator'}) ]
                        })
                        navigation.dispatch(resetAction)
						handleSubmitModalReset()
                	}}
                />

			</Container>
		);
	}
}

const styles = StyleSheet.create({
    input: {
        fontWeight: 'bold', 
        textAlign: 'right',
        color: colors.white
    },
    switch: {
		margin: -9, 
		alignSelf: 'flex-end', 
		transform: [{ scale: .7 }]
    },
    setActionTeam: {
    	flex: 1, 
    	justifyContent: 'center', 
    	alignItems: 'flex-end'
    },
    setActionTeamVal: {
    	fontSize: 15, 
    	color: colors.primary
    }
});

const EditPlayerWithData = compose( 
	graphql(Query, {
		options: ({ utilSelect: { Player } }) => ({
			fetchPolicy: 'network-only',
			variables: { 
				Player: Player,
			}
		})
	}),
	graphql(switchActivate, { name: 'switchPlayerActivate' }),
	graphql(Mutation, { name: 'editPlayer' }),
	withFormik({
		mapPropsToValues: () => initialValues,
        handleSubmit: async (values, formik) => {
			try {
				const req = { ...values, Player: formik.props.utilSelect.Player }
				const serverResponse = await formik.props.editPlayer({ variables: req }).then(res => res.data.playerMutation)
				formik.props.handleSubmitModalSetServerResponse(serverResponse)
				if(serverResponse.status === 'success'){
					formik.resetForm()
				}else{
					formik.setFieldValue('passcode', '')
					formik.setSubmitting(false)
				}
			}catch(e) {
				formik.props.handleSubmitModalSetServerResponse({ title: 'Unknow Error', content: 'Please try again.', status: 'danger' })
				formik.setSubmitting(false)
			}
        },
        validationSchema: yup.object().shape({
			newPassword: yup.string().min(4 | null, 'Password at least 4 characters.').max(12),
			newPasscode: yup.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4 | null, 'Passcode requires 4 digits.').max(4),
			newInitial: yup.number().integer().min(0).max(999999),
			newMinRisk: yup.number().integer().positive().min(10 | null, 'Minimun Risk must greater then 10.').max(999999),
			newMaxWin: yup.number().integer().min(0).max(999999),
		})
	})
)(EditPlayer)

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } )(EditPlayerWithData);