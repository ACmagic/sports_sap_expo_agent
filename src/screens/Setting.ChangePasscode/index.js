import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, RefreshControl, TextInput } from 'react-native';
import { compose, graphql } from 'react-apollo';
import yup from 'yup'
import { withFormik } from 'formik';
import { Mutation } from './gql'
import Container from '../../components/Container'
import colors from '../../styles/colors'
import { NavigationActions } from 'react-navigation'
import { withNavigation } from 'react-navigation';
import BottomButton from '../../components/BottomButton'
import StripBar from '../../components/StripBar'
import _ from 'lodash'
import SubmitModal from '../../containers/SubmitModal'
import { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } from '../../actions/submitModal'

class SettingChangePasscode extends Component {
	render() {
		const { resetRouteName, resetForm, values: { password, newPasscode, confirmNewPasscode }, isSubmitting, handleSubmit, handleSubmitModalOn, handleSubmitModalReset, errors, setFieldValue, navigation } = this.props
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={false} onRefresh={resetForm}/> }>

					<StripBar title='PASSWORD'>
						<TextInput 
							style={ styles.input }
							placeholder='****'
							placeholderTextColor={colors.mute}
							secureTextEntry={true}
							keyboardAppearance='dark'
							value={password}
							onChangeText={text => setFieldValue('password', text)}
						/>
					</StripBar>

					<StripBar title='NEW PASSCODE'>
						<TextInput 
							style={ styles.input }
							placeholder='****'
							placeholderTextColor={colors.mute}
							secureTextEntry={true}
							keyboardAppearance='dark'
							value={newPasscode}
							onChangeText={text => setFieldValue('newPasscode', text)}
							keyboardType='number-pad'
							maxLength={4}
							returnKeyType='done'
						/>
					</StripBar>

					<StripBar title='CONFIRM NEW PASSCODE'>
						<TextInput 
							style={ styles.input }
							placeholder='****'
							placeholderTextColor={colors.mute}
							secureTextEntry={true}
							keyboardAppearance='dark'
							value={confirmNewPasscode}
							onChangeText={text => setFieldValue('confirmNewPasscode', text)}
							keyboardType='number-pad'
							maxLength={4}
							returnKeyType='done'
						/>
					</StripBar>

				</ScrollView>

				<BottomButton 
					activate={ password !== '' && newPasscode !== '' && confirmNewPasscode !== '' && ( newPasscode === confirmNewPasscode ) && _.isEmpty(errors) }
					warning={ newPasscode !== confirmNewPasscode ? 'PASSCODE NOT MATCH' : errors[Object.keys(errors)[0]] }
					tip='ENTER PASSCODES'
					next='CONFIRM'
					onPress={handleSubmitModalOn}
				/>

				<SubmitModal
                	handleSubmit={handleSubmit}
                	isSubmitting={isSubmitting}
                	handleAfterSuccess={() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [ NavigationActions.navigate({routeName: resetRouteName}) ]
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
    }
});

const SettingChangePasscodeWithData = compose(
	graphql(Mutation),
    withFormik({
        mapPropsToValues: () => ({ password: '', newPasscode: '', confirmNewPasscode: '' }),
        handleSubmit: async (values, formik) => {
        	const serverResponse = await formik.props.mutate({ variables: values }).then(res => res.data.changePasscode)
        	formik.props.handleSubmitModalSetServerResponse(serverResponse)
        	formik.resetForm()
        },
        validationSchema: yup.object().shape({
        	password: yup.string().min(4).max(12),
        	newPasscode: yup.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4),
			confirmNewPasscode: yup.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4)
		})
    })
)(SettingChangePasscode)

export default connect( null, { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } )(withNavigation(SettingChangePasscodeWithData));