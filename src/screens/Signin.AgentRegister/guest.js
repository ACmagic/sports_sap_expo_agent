import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { withFormik } from 'formik';
import { Mutation } from './gql'
import { handleAuthLogin } from '../../actions/auth'
import yup from 'yup'

import wallpaper from '../../images/background/wallpaper_2.jpg'
import colors from '../../styles/colors'
import Hr from '../../components/Hr'
import BottomButton from '../../components/BottomButton'
import _ from 'lodash'
//import { PushNotificationIOS } from 'react-native';

class Register extends Component {

	render() {
		const { errors, handleSubmit, resetForm, isSubmitting, setFieldValue, values: { username, email, password, confirmPassword, passcode } } = this.props
		return (
			<ImageBackground style={ styles.image } source={ wallpaper }>

				<ScrollView refreshControl={ <RefreshControl refreshing={false} onRefresh={resetForm}/> }>
					<View style={{ paddingTop: 90 }}>

			 			<View style={ styles.inputBox }>
			 			    <TextInput 
			 			        style={ styles.inputText } 
			 			        placeholder='USERNAME' 
			 			        placeholderTextColor={colors.dust}
			 			        keyboardAppearance='dark'
			 			        autoCapitalize='none'
			 			        autoCorrect={false}
			 			        maxLength={10}
			 			        value={username}
			 			        onChangeText={text => setFieldValue('username', text)}
			 			    />
			 			</View>
						<View style={{ height: 12 }}/>

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

			 			<View style={{ height: 12 }}/>

			        	<View style={ styles.inputBox }>
			        	    <TextInput 
			        	        style={ styles.inputText } 
			        	        placeholder='PASSWORD' 
			        	        placeholderTextColor={colors.dust}
			        	        secureTextEntry
			        	        keyboardAppearance='dark'
			        	        autoCapitalize='none'
			        	        autoCorrect={false}
			        	        maxLength={12}
			        	        onChangeText={text => setFieldValue('password', text)}
			        	        value={password}
			        	    />
			        	</View>
						<View style={{ height: 12 }}/>

			        	<View style={ styles.inputBox }>
			        	    <TextInput 
			        	        style={ styles.inputText } 
			        	        placeholder='CONFIRM PASSWORD' 
			        	        placeholderTextColor={colors.dust}
			        	        secureTextEntry
			        	        keyboardAppearance='dark'
			        	        autoCapitalize='none'
			        	        autoCorrect={false}
			        	        maxLength={12}
			        	        onChangeText={text => setFieldValue('confirmPassword', text)}
			        	        value={confirmPassword}
			        	    />
			        	</View>
						<View style={{ height: 12 }}/>

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

					</View>
				</ScrollView>


	            <BottomButton 
	            	loading={isSubmitting}
	            	warning={errors[Object.keys(errors)[0]] || (password !== confirmPassword ? 'Passwords not match.' : null)}
	                activate={username !== '' && _.isEmpty(errors) && password === confirmPassword} 
	                tip='REGISTER' 
	                next='REGISTER'
	                onPress={handleSubmit}
	            />

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

const RegisterWithData = compose(
	graphql(Mutation),
    withFormik({
        mapPropsToValues: (props) => ({ username: '', email: '', password: '', confirmPassword: '', passcode: '' }),
        handleSubmit: async (values, formik) => {
        	const serverRes = await formik.props.mutate({ variables: values }).then(res => res.data.agentRegister)
        	formik.setSubmitting(false)
        	if(serverRes.status === 'success') {
        		formik.props.handleAuthLogin(serverRes.content)
        		formik.props.navigation.navigate('AgentNavigator')
        	}else if(serverRes.status === 'warning'){
        		formik.resetForm()
        		formik.setErrors({ failed: serverRes.content })
        	}else{
        		formik.resetForm()
        		formik.setErrors({ failed: 'ERROR, Try again later!' })
        	}
        },
        validationSchema: yup.object().shape({
			username: yup.string().matches(/^\w+$/, 'Username format is invalid.').min(4 | null, 'Username at least 4 characters.').max(10).required('Username Required'),
			email: yup.string().email().required('Email Required'),
			password: yup.string().min(4 | null, 'Password at least 4 characters.').max(12).required('Password Required'),
			confirmPassword: yup.string().min(4 | null, 'Password at least 4 characters.').max(12).required('Confirm Password Required'),
			passcode: yup.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4).required('Passcode Required')
		}),
    })
)(Register)
export default connect( null, { handleAuthLogin } )(RegisterWithData);