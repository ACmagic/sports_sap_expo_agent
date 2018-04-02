import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput, Switch, Picker, RefreshControl } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'
import moment from 'moment'
import Card from '../../components/Card'
import Container from '../../components/Container'
import SectionTitle from '../../components/SectionTitle'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import Badge from '../../components/Badge'
import colors from '../../styles/colors'
import { NavigationActions } from 'react-navigation'
import SelectBar from '../../components/SelectBar'
import HeaderTitle from '../../components/HeaderTitle'
import { withNavigation } from 'react-navigation';
import BottomButton from '../../components/BottomButton'
import { handleSelectPlayer } from '../../actions/utilSelect'
import Loading from '../../components/Loading'
import StripBar from '../../components/StripBar'
import Collapsible from 'react-native-collapsible';
import yup from 'yup'
import RowTDE from '../../components/RowTDE'
import { Mutation } from './gql'
import { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } from '../../actions/submitModal'
import SubmitModalWithPasscode from '../../containers/SubmitModalWithPasscode'

const limitTeam = {
	parlayTeam: { min: 2, max: 8 },
	basicTeaserTeam: { min: 2, max: 8 },
	specialTeaserTeam: { min: 2, max: 8 },
	bigTeaserTeam: { min: 2, max: 8 },
	winReverseTeam: { min: 2, max: 4 },
	actionReverseTeam: { min: 2, max: 4 },
}

class CreatePlayer extends Component {
	_changeActionTeamValue(actionTeam){
		const { setFieldValue, values } = this.props
		values[actionTeam] < limitTeam[actionTeam].max ? setFieldValue(actionTeam, (values[actionTeam]+1)) : setFieldValue(actionTeam, limitTeam[actionTeam].min)
	}
	render() {

		const { 
			handleSubmit,
			isSubmitting,
			errors, 
			setFieldValue,
			setFieldTouched,
			setErrors,
			values: { 
	        	playerUsername, 
	        	playerPassword, 
	        	playerPasscode, 
	        	maxWin,
	        	minRisk,
	        	initial,
	        	parlay,
	        	basicTeaser,
	        	specialTeaser,
	        	bigTeaser,
	        	superTeaser,
	        	winReverse,
	        	actionReverse,
	        	parlayTeam,
	        	basicTeaserTeam,
	        	specialTeaserTeam,
	        	bigTeaserTeam,
	        	winReverseTeam,
	        	actionReverseTeam,
	        	passcode
			},
			navigation,
			handleSubmitModalOn, 
			handleSubmitModalSetServerResponse, 
			handleSubmitModalReset
		} = this.props


		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={false}/> }>


					<StripBar title='USERNAME'>
						<TextInput
							style={ styles.input }
							placeholder='Username'
							autoCorrect={false}
							placeholderTextColor={colors.mute}
							keyboardAppearance='dark'
							value={playerUsername}
							onChangeText={text => setFieldValue('playerUsername', text)}
						/>
					</StripBar>

					<StripBar title='PASSWORD'>
						<TextInput 
							style={ styles.input }
							placeholder='Password'
							secureTextEntry={true}
							autoCorrect={false}
							placeholderTextColor={colors.mute}
							keyboardAppearance='dark'
							value={playerPassword}
							onChangeText={text => setFieldValue('playerPassword', text)}
						/>
					</StripBar>

					<StripBar title='PASSCODE'>
						<TextInput 
							style={ styles.input }
							returnKeyType='done'
							secureTextEntry={true}
							placeholder='Passcode'
							autoCorrect={false}
							placeholderTextColor={colors.mute}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={playerPasscode}
							maxLength={4}
							onChangeText={text => setFieldValue('playerPasscode', text)}
						/>
					</StripBar>

					<StripBar title='WEEKLY INITIAL CREDIT'>
						<TextInput 
							style={ [ styles.input, { color: colors.action } ] }
							returnKeyType='done'
							placeholder='Amount'
							autoCorrect={false}
							placeholderTextColor={colors.action}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={initial}
							onChangeText={text => setFieldValue('initial', text)}
						/>
					</StripBar>

					<StripBar title='MINIMUN RISK PER BET'>
						<TextInput 
							style={ [ styles.input, { color: colors.warning } ] }
							returnKeyType='done'
							placeholder='Amount'
							autoCorrect={false}
							placeholderTextColor={colors.warning}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={minRisk}
							onChangeText={text => setFieldValue('minRisk', text)}
						/>
					</StripBar>

					<StripBar title='MAXIMUN WIN PER BET'>
						<TextInput 
							style={ [ styles.input, { color: colors.success } ] }
							returnKeyType='done'
							placeholder='Amount'
							autoCorrect={false}
							placeholderTextColor={colors.success}
							keyboardAppearance='dark'
							keyboardType='number-pad'
							value={maxWin}
							onChangeText={text => setFieldValue('maxWin', text)}
						/>
					</StripBar>

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
							value={parlay} 
							onValueChange={val => setFieldValue('parlay', val)}
						/>
					</StripBar>
					<Collapsible collapsed={!parlay}>
						<StripBar style={{ color: colors.mute }} title='PARLAY 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('parlayTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={parlayTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='BASIC TEASER'>
						<Switch 
							style={styles.switch} 
							value={basicTeaser} 
							onValueChange={val => setFieldValue('basicTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!basicTeaser}>
						<StripBar style={{ color: colors.mute }} title='BASIC TEASER 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('basicTeaserTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={basicTeaserTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='SPECIAL TEASER'>
						<Switch 
							style={styles.switch} 
							value={specialTeaser} 
							onValueChange={val => setFieldValue('specialTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!specialTeaser}>
						<StripBar style={{ color: colors.mute }} title='SPECIAL TEASER 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('specialTeaserTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={specialTeaserTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='BIG TEASER'>
						<Switch 
							style={styles.switch} 
							value={bigTeaser} 
							onValueChange={val => setFieldValue('bigTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!bigTeaser}>
						<StripBar style={{ color: colors.mute }} title='BIG TEASER 2-8 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('bigTeaserTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={bigTeaserTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='SUPER TEASER'>
						<Switch 
							style={styles.switch} 
							value={superTeaser} 
							onValueChange={val => setFieldValue('superTeaser', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!superTeaser}>
						<StripBar style={{ color: colors.mute }} title='SUPER TEASER 3 TEAMS'>
							<View style={ styles.setActionTeam }>
								<StrongText style={ styles.setActionTeamVal } text={3} />
							</View>
						</StripBar>
					</Collapsible>

					<StripBar title='ACTION REVERSE'>
						<Switch 
							style={styles.switch} 
							value={actionReverse} 
							onValueChange={val => setFieldValue('actionReverse', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!actionReverse}>
						<StripBar style={{ color: colors.mute }} title='ACTION REVERSE 2-4 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('actionReverseTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={actionReverseTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

					<StripBar title='WIN REVERSE'>
						<Switch 
							style={ styles.switch } 
							value={winReverse} 
							onValueChange={val => setFieldValue('winReverse', val)}
						/>
					</StripBar>

					<Collapsible collapsed={!winReverse}>
						<StripBar style={{ color: colors.mute }} title='WIN REVERSE 2-4 TEAMS'>
							<TouchableOpacity style={ styles.setActionTeam } onPress={ () => this._changeActionTeamValue('winReverseTeam') }>
								<StrongText style={ styles.setActionTeamVal } text={winReverseTeam} />
							</TouchableOpacity>
						</StripBar>
					</Collapsible>

				</ScrollView>

				<BottomButton 
					activate={_.isEmpty(errors) && !_.isEmpty(playerUsername)} 
					warning={ errors[Object.keys(errors)[0]] }
					tip='CREATE' 
					next='NEXT' 
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

const CreatePlayerWithData = compose(
	graphql(Mutation),
    withFormik({
        mapPropsToValues: () => ({ 
        	playerUsername: '', 
        	playerPassword: '', 
        	playerPasscode: '', 
        	initial: '500',
        	maxWin: '200',
        	minRisk: '10',
        	parlay: false,
        	basicTeaser: false,
        	specialTeaser: false,
        	bigTeaser: false,
        	superTeaser: false,
        	winReverse: false,
        	actionReverse: false,
        	parlayTeam: 5,
        	basicTeaserTeam: 5,
        	specialTeaserTeam: 5,
        	bigTeaserTeam: 5,
        	winReverseTeam: 2,
        	actionReverseTeam: 2,
        	passcode: '',
        }),
        handleSubmit: async (values, formik) => {
         	try {
				const serverResponse = await formik.props.mutate({ variables: values }).then(res => res.data.playerRegister)
				formik.props.handleSubmitModalSetServerResponse(serverResponse)
				if(serverResponse.status === 'success'){
					formik.resetForm()
				}else{
					formik.setFieldValue('passcode', '')
					if(serverResponse.content === 'Username has already been taken.'){
						formik.setFieldValue('playerUsername', '')
					}
					formik.setSubmitting(false)
				}
				
         	}catch(e) {
         		formik.props.handleSubmitModalSetServerResponse({ title: 'Unknow Error', content: 'Please try again.', status: 'danger' })
         		formik.setFieldValue('passcode', '')
         		formik.setSubmitting(false)
         	}

        },
        validationSchema: yup.object().shape({
			playerUsername: yup.string().matches(/^\w+$/, 'Username format is invalid.').min(4 | null, 'Username at least 4 characters.').max(10).required('Username required'),
			playerPassword: yup.string().min(4 | null, 'Password at least 4 characters.').max(12).required('Password required'),
			playerPasscode: yup.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4 | null, 'Passcode requires 4 digits.').max(4).required('Passcode required'),
			initial: yup.number().integer().min(0).max(999999).required(),
			minRisk: yup.number().integer().positive().min(10 | null, 'Min Risk must greater then 10.').max(999999).required(),
			maxWin: yup.number().integer().min(0).max(999999).required(),
		})
    })
)(CreatePlayer)

export default connect( null, { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } )(CreatePlayerWithData);
