import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import yup from 'yup'
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { Mutation } from './gql'
import wallpaper from '../../images/background/wallpaper_2.jpg'
import colors from '../../styles/colors'
import Hr from '../../components/Hr'
import BottomButton from '../../components/BottomButton'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import _ from 'lodash'

class ForgotPassword extends Component {
	render() {
		const { navigation, errors, resetForm, handleSubmit, isSubmitting, setFieldValue, values: { email, passcode, title, content, status } } = this.props
		return (
			<ImageBackground style={ styles.image } source={ wallpaper }>
				<ScrollView refreshControl={ <RefreshControl refreshing={false} onRefresh={resetForm}/> }>
					<View style={{ paddingTop: 90 }}>
						{status === '' && 
							<View>
					 			<View style={ styles.inputBox }>
					 			    <TextInput 
					 			        style={ styles.inputText } 
					 			        placeholder='E-MAIL' 
					 			        placeholderTextColor={colors.dust}
					 			        keyboardAppearance='dark'
					 			        autoCapitalize='none'
					 			        autoCorrect={false}
					 			        maxLength={24}
					 			        value={email}
					 			        onChangeText={text => setFieldValue('email', text)}
					 			    />
					 			</View>
								<View style={{ height: 12 }} />
					        	<View style={ styles.inputBox }>
					        	    <TextInput 
					        	        style={ styles.inputText } 
					        	        placeholder='PASSCODE' 
					        	        placeholderTextColor={colors.dust}
					        	        secureTextEntry
					        	        keyboardAppearance='dark'
					        	        autoCapitalize='none'
					        	        autoCorrect={false}
					        	        maxLength={4}
					        	        onChangeText={text => setFieldValue('passcode', text)}
					        	        keyboardType='number-pad'
					        	        value={passcode}
					        	        returnKeyType='done'
					        	    />
					        	</View>
					        	<View style={{ height: 12 }} />
					        	<SmallText style={{ backgroundColor: 'transparent', color: colors.white, textAlign: 'center' }} text='FOR AGENT ONLY'/>
					        	<View style={{ height: 12 }} />
				        	</View>
			        	}

			        	{status !== '' && <StrongText style={{ backgroundColor: 'transparent', color: colors[status], textAlign: 'center', fontSize: 18 }} text={title.toUpperCase()}/>}
			        	<View style={{ height: 12 }} />

			        	{(status === 'danger' || status === 'warning') && 
			        			<View >
					        		<SmallText style={{ backgroundColor: 'transparent', color: colors[status], textAlign: 'center' }} text={content.toUpperCase()}/>
				        		</View>
			        	}

			        	{status === 'success' && 
			        			<View >
				        			<SmallText style={{ backgroundColor: 'transparent', color: colors[status], textAlign: 'center' }} text='TEMPORARY PASSWORD HAS BEEN SENT TO'/>
					        		<SmallText style={{ backgroundColor: 'transparent', color: colors[status], textAlign: 'center' }} text={content.toUpperCase()}/>
				        		</View>
			        	}
		        	</View>
				</ScrollView>

				{status === '' &&
		            <BottomButton 
		            	loading={isSubmitting}
		            	warning={ errors[Object.keys(errors)[0]] }
		                activate={email !== '' && _.isEmpty(errors)} 
		                tip='RESET PASSWORD' 
		                next='SUBMIT'
		                onPress={handleSubmit}
		            />
				}

				{(status === 'danger' || status === 'warning') &&
		            <BottomButton
		                activate={true} 
		                next='TRY AGAIN'
		                onPress={() => resetForm()}
		            />
				}

				{status === 'success' &&
		            <BottomButton 
		                activate={true} 
		                next='SIGN IN'
		                onPress={() => navigation.navigate('GuestLoginScreen')}
		            />
				}

			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	image: {
        flex: 1,
        height: null,
        width: null,
        alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: 'black',
        flexDirection: 'column'
	},
    inputBox: {
        width: 240,
        height: 42,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    inputText: {
        width: 240,
        height: 42,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
});

const ForgotPasswordWithData = compose(
	graphql(Mutation),
    withFormik({
	    mapPropsToValues: (props) => ({ email: '', passcode: '', title: '', content: '', status: '' }),
		handleSubmit: async ({ email, passcode }, formik) => {
			const { title, content, status } = await formik.props.mutate({ variables: { email: email, passcode: passcode } }).then(res => res.data.forgotPassword)
			formik.setSubmitting(false)
			formik.setValues({ email: '', passcode: '', title: title, content: content, status: status })
		},
        validationSchema: yup.object().shape({
			email: yup.string().email().required('Email Required'),
			passcode: yup.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4).required('Passcode Required')
		})
    })
)(ForgotPassword)

export default ForgotPasswordWithData;
