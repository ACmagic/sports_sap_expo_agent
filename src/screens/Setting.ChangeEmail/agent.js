import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, RefreshControl, TextInput } from 'react-native';
import { compose, graphql } from 'react-apollo';
import yup from 'yup'
import { withFormik } from 'formik';
import Container from '../../components/Container'
import colors from '../../styles/colors'
import { NavigationActions } from 'react-navigation'
import { withNavigation } from 'react-navigation';
import BottomButton from '../../components/BottomButton'
import StripBar from '../../components/StripBar'
import _ from 'lodash'
import { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } from '../../actions/submitModal'
import { Query, Mutation } from './gql'
import Loading from '../../components/Loading'
import SubmitModalWithPasscode from '../../containers/SubmitModalWithPasscode'

class SettingChangeEmail extends Component {
	_refetch(){
		this.props.resetForm
		this.props.data.refetch()
	}
	render() {
		if(this.props.data.loading ) return <Loading/>
		const { navigation, values: { email, passcode }, isSubmitting, handleSubmit, handleSubmitModalOn, handleSubmitModalReset, errors, setFieldValue, data: { loading, refetch, agent: { email: agentEmail } } } = this.props
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> }>



					<StripBar title='NEW EMAIL'>
						<TextInput 
			 				style={ styles.input } 
			 				placeholder={agentEmail} 
			 				placeholderTextColor={colors.mute}
			 				keyboardAppearance='dark'
			 				autoCapitalize='none'
			 				autoCorrect={false}
			 				maxLength={24}
			 				value={email}
			 				onChangeText={text => setFieldValue('email', text)}
						/>
					</StripBar>

				</ScrollView>

				<BottomButton 
					activate={ email !== '' && _.isEmpty(errors) }
					warning={ errors[Object.keys(errors)[0]] }
					tip='ENTER NEW EMAIL'
					next='CONFIRM'
					onPress={handleSubmitModalOn}
				/>

                <SubmitModalWithPasscode
                	setFieldValue={setFieldValue}
                	passcode={passcode}
                	handleSubmit={handleSubmit}
                	isSubmitting={isSubmitting}
                	handleAfterSuccess={() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [ NavigationActions.navigate({routeName: 'AgentSettingScreen'}) ]
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

const SettingChangeEmailWithData = compose(
	graphql(Query, { optinos: { fetchPolicy: 'network-only'} }),
	graphql(Mutation),
    withFormik({
        mapPropsToValues: () => ({ email: '', passcode: '' }),
        handleSubmit: async (values, formik) => {
        	const serverResponse = await formik.props.mutate({ variables: values }).then(res => res.data.changeEmail)
        	formik.props.handleSubmitModalSetServerResponse(serverResponse)
        	formik.resetForm()
        },
        validationSchema: yup.object().shape({
        	email: yup.string().email(),
		})
    })
)(SettingChangeEmail)

export default connect( null, { handleSubmitModalOn, handleSubmitModalSetServerResponse, handleSubmitModalReset } )(SettingChangeEmailWithData);