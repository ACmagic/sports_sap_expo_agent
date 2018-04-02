import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import colors from '../../styles/colors'
import wallpaper from '../../images/background/wallpaper_2.jpg'
import whiteLogo from '../../images/logo/sportsagent_white.png'

class Signin extends Component {
	// componentDidMount(){
	// 	PushNotificationIOS.requestPermissions()
	// 	// PushNotificationIOS.addEventListener('notification', notification => null)
	// 	// PushNotificationIOS.addEventListener('register', deviceToken => {
	// 	// 	this.setState({ deviceToken: deviceToken })
	// 	// })
	// }
	render() {
		return (
			<ImageBackground style={ styles.image } source={ wallpaper }>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 2, justifyContent: 'center' }}>
						<Image style={{ height: 120, justifyContent: 'center', resizeMode: 'contain' }} source={whiteLogo} />
						<View style={{ height: 12 }} />
						<Text style={ styles.text }>SPORTS</Text>
						<Text style={ styles.text }>AGENT</Text>
					</View>
					<View style={{ flex: 1 }}>
					</View>
				</View>
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
        backgroundColor: 'black'
	},
	text: {
		color: 'white', 
		fontSize: 32, 
		fontWeight: 'bold', 
		backgroundColor: 'transparent', 
		letterSpacing: 4,
		textAlign: 'center'

	}
});

export default Signin;