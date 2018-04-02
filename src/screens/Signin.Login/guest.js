import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import yup from 'yup'
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import Mutation from './gql'
import { handleAuthLogin } from '../../actions/auth'
import wallpaper from '../../images/background/wallpaper_2.jpg'
import colors from '../../styles/colors'
import Hr from '../../components/Hr'
import BottomButton from '../../components/BottomButton'
import _ from 'lodash'

class Login extends Component {
	render() {
		const { resetForm, errors, handleSubmit, isSubmitting, setFieldValue, values: { username, password } } = this.props
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
						<View style={{ height: 12 }} />
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
		        	</View>
				</ScrollView>

	            <BottomButton 
	            	loading={isSubmitting}
	            	warning={errors[Object.keys(errors)[0]]}
	                activate={username !== '' && password !== '' && _.isEmpty(errors)} 
	                tip='LOGIN' 
	                next='LOGIN'
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

const LoginWithData = compose(
	graphql(Mutation),
    withFormik({
        mapPropsToValues: (props) => ({ username: '', password: '' }),
        handleSubmit: async (values, formik) => {
        	const serverRes = await formik.props.mutate({ variables: values }).then(res => res.data.agentLogin)
        	formik.setSubmitting(false)
        	if(serverRes.status === 'success') {
        		formik.props.handleAuthLogin(serverRes.content)
        		formik.props.navigation.navigate(serverRes.title)
        	}else if(serverRes.status === 'warning'){
        		formik.resetForm()
        		formik.setErrors({ failed: serverRes.content })
        	}else{
        		formik.resetForm()
        		formik.setErrors({ failed: 'ERROR, Try again later!' })
        	}
        },
        validationSchema: yup.object().shape({
			username: yup.string().matches(/^\w+$/, 'Username format is invalid.').min(4).max(10).required(),
			password: yup.string().min(4).max(12).required()
		})
    })
)(Login)

export default connect( null, { handleAuthLogin } )(LoginWithData);


//	<View style={{ height: 12 }}/>
//	<TouchableOpacity onPress={this.props.handleSubmit}><Text style={ styles.text }>submit</Text></TouchableOpacity>