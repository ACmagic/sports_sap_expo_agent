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

class SettingChangePassword extends Component {
	render() {
		const { resetRouteName, resetForm, values: { password, newPassword, confirmNewPassword }, isSubmitting, handleSubmit, handleSubmitModalOn, handleSubmitModalReset, errors, setFieldValue, navigation } = this.props
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={false} onRefresh={resetForm}/> }>

					<StripBar title='CURRENT PASSWORD'>
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

					<StripBar title='NEW PASSWORD'>
						<TextInput 
							style={ styles.input }
							placeholder='****'
							placeholderTextColor={colors.mute}
							secureTextEntry={true}
							keyboardAppearance='dark'
							value={newPassword}
							onChangeText={text => setFieldValue('newPassword', text)}
						/>
					</StripBar>

					<StripBar title='CONFIRM NEW PASSWORD'>
						<TextInput 
							style={ styles.input }
							placeholder='****'
							placeholderTextColor={colors.mute}
							secureTextEntry={true}
							keyboardAppearance='dark'
							value={confirmNewPassword}
							onChangeText={text => setFieldValue('confirmNewPassword', text)}
						/>
					</StripBar>

				</ScrollView>

				<BottomButton 
					activate={ password !== '' && newPassword !== '' && ( newPassword === confirmNewPassword ) && _.isEmpty(errors) }
					warning={ newPassword !== confirmNewPassword ? 'PASSWORD NOT MATCH' : errors[Object.keys(errors)[0]] }
					tip='ENTER PASSWORDS'
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

const SettingChangePasswordWithData = compose(
	graphql(Mutation),
    withFormik({
        mapPropsToValues: () => ({ password: '', newPassword: '', confirmNewPassword: '' }),
        handleSubmit: async (values, formik) => {
        	const serverResponse = await formik.props.mutate({ variables: values }).then(res => res.data.changePassword)
        	formik.props.handleSubmitModalSetServerResponse(serverResponse)
        	formik.resetForm()
        },
        validationSchema: yup.object().shape({
        	password: yup.string().min(4 | _, 'requires 4 characters').max(12 | _, 'maximun 12 characters'),
        	newPassword: yup.string().min(4 | _, 'requires 4 characters').max(12 | _, 'maximun 12 characters'),
			confirmNewPassword: yup.string().min(4 | _, 'requires 4 characters').max(12 | _, 'maximun 12 characters')
		})
    })
)(SettingChangePassword)

export default connect( null, { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } )(withNavigation(SettingChangePasswordWithData));