import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { handleAuthLogout } from '../../actions/auth'
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import colors from '../../styles/colors'
import whiteLogo from '../../images/logo/sportsagent_white.png'
import moment from 'moment-timezone'

class DrawerContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		};
	}
	componentDidMount() {
		this._interval = setInterval(() => {
		  this.setState({ counter: this.state.counter++ })
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this._interval);
	}
	render() {
		const { appVersion, authUser: { username, role }, handleAuthLogout } = this.props
		return (
			<Container>
				<SafeAreaView>
				{role !== 'Guest' && 
				<View style={{ paddingTop: 42, paddingLeft: 16, paddingBottom: 16 }}>
					<StrongText style={{ fontSize: 32, paddingBottom: 6 }} text={username} />
					<StrongText style={{ fontSize: 11, color: colors.mute }} text={role.toUpperCase()} />
				</View>
				}
				{role === 'Guest' &&
				<View style={{ paddingTop: 42, paddingLeft: 16, paddingBottom: 16 }}>
					<Image style={{ height: 36, width: 42, resizeMode: 'contain' }} source={whiteLogo} />
				</View>
				}
				</SafeAreaView>
				<Hr/>
				<ScrollView>
					<View style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerItems {...this.props} />
					</View>
				</ScrollView>
				{role !== 'Guest' && 
					<TouchableOpacity style={{ padding: 16 }} onPress={handleAuthLogout}>
						<StrongText style={{ color: colors.danger }} text='LOGOUT'/>
					</TouchableOpacity>
				}
				<SafeAreaView>
					<SmallText style={{ fontSize: 9, paddingLeft: 16, paddingBottom: 2 }} text={moment().tz("America/Los_Angeles").add(this.state.counter, 's').format('ddd, MMM DD, YY - hh:mm A').toUpperCase()}/>
					<SmallText style={{ fontSize: 9, paddingLeft: 16, paddingBottom: 2 }} text={`PACIFIC STANDARD TIME`}/>
					<SmallText style={{ fontSize: 9, paddingLeft: 16, paddingBottom: 16 }} text={`SPORT AGENT v${appVersion}`}/>
				</SafeAreaView>
			</Container>
		);
	}
}

const mapStateToProps = state => ({ appVersion: state.app.version, authUser: state.auth.jwt })

export default connect( mapStateToProps, { handleAuthLogout } )(DrawerContent)
