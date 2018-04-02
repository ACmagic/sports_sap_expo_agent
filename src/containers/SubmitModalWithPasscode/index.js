import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { handleSubmitModalReset } from '../../actions/submitModal'

import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import Badge from '../../components/Badge'
import colors from '../../styles/colors'

class SubmitModalWithPasscode extends Component {
	_handleAfterSubmit(){
		if(this.props.submitModal.serverResponse.status === 'success'){
			this.props.handleAfterSuccess()
		}else{
			this.props.handleSubmitModalReset()
		}
	}
	_handleReturn(){
		this.props.handleSubmitModalReset()
		this.props.setFieldValue('passcode', '')
	}
	render() {
		const { isVisible, serverResponse } = this.props.submitModal
		const { isSubmitting, passcode, setFieldValue, handleSubmit, handleSubmitModalReset } = this.props

		let content1 = ''
		let content2 = ''
		let content3 = ''

		if(serverResponse.content !== ''){
			let contentArr = serverResponse.content.split(',')
			content1 = contentArr[0] || ''
			content2 = contentArr[1] || ''
			content3 = contentArr[2] || ''
		}

		return (
			<Modal visible={isVisible} transparent={true} animationType={'slide'}>

				{ ( serverResponse.status !== '' ) && 
					<TouchableOpacity style={ styles.container } onPress={this._handleAfterSubmit.bind(this)}>
						<View style={{ height: '30%' }}/>
						<StrongText style={{ color: colors[serverResponse.status] }} text={serverResponse.title}/>
						<View style={ styles.gap }/>
						<SmallText text={content1}/>
						<SmallText text={content2}/>
						<SmallText text={content3}/>
						<View style={ styles.button }>
							<StrongText style={ { color: serverResponse.status === 'success' ? colors.success : colors.warning } } text={ serverResponse.status === 'success' ? 'CONFIRM' : 'RETURN' }/>
						</View>

					</TouchableOpacity>
				}

				{ isSubmitting && 
					<View style={ [ styles.container, { justifyContent: 'center' } ] }>
						<ActivityIndicator />
					</View>
				}

				{ (serverResponse.status === '' && !isSubmitting) && 
					<View style={ styles.container }>
						<View style={{ height: '30%' }}/>
						<StrongText text='ENTER PASSCODE'/>
						<View style={ styles.gap }/>
						<TextInput
							style={ styles.inputPasscode } 
							placeholder='****'
							secureTextEntry={true}
							placeholderTextColor={colors.white}
							value={passcode}
							onChangeText={text => setFieldValue('passcode', text)}
							keyboardType='number-pad'
							maxLength={4}
							returnKeyType='done'
							keyboardAppearance='dark'
						/>
						<View style={{ flexDirection: 'row' }}>

							<TouchableOpacity style={ [ styles.button ] } onPress={this._handleReturn.bind(this)}>
								<StrongText style={ { color: colors.warning } } text='RETURN'/>
							</TouchableOpacity>

						{passcode.length === 4 &&
							<TouchableOpacity style={ styles.button } onPress={handleSubmit}>
								<StrongText style={ { color: colors.success } } text='SUBMIT'/>
							</TouchableOpacity>
						}

						</View>
					</View>
				}

			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		alignItems: 'center', 
		backgroundColor: 'rgba(0, 0, 0, 0.9)'
	},
	button: {
		marginTop: 30,
		width: 100, 
		alignItems: 'center', 
		justifyContent: 'center', 
	},
	inputPasscode: {
		width: 180, 
		height: 36, 
		backgroundColor: 
		colors.dark, 
		borderRadius: 12, 
		textAlign: 'center', 
		fontWeight: 'bold', 
		color: colors.white, 
		fontSize: 13
	},
	gap: {
		height: 30
	}
});

// const ActionSubmitModalWithData = compose(
// //	graphql(GQL)
// )(ActionSubmitModal)

const mapStateToProps = state => ({ submitModal: state.submitModal })

export default connect( mapStateToProps, { handleSubmitModalReset } )(SubmitModalWithPasscode)