import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Container from '../../components/Container'
import SmallText from '../../components/SmallText'
import { NavigationActions } from 'react-navigation'
import SelectBar from '../../components/SelectBar'
import colors from '../../styles/colors'

class PlayerControl extends Component {
	render() {
		const { navigation } = this.props
		return (
			<Container>
				<ScrollView>
					<SelectBar style={{ justifyContent: 'center' }} onPress={ () => navigation.navigate('AgentPlayerControlCreatePlayerScreen') }>
						<SmallText style={{ color: colors.white }} text='CREATE NEW PLAYER'/>
					</SelectBar>
					<SelectBar style={{ justifyContent: 'center' }} onPress={ () => navigation.navigate('AgentPlayerControlSelectPlayerScreen') }>
						<SmallText style={{ color: colors.white }} text='EDIT EXISTING PLAYERS'/>
					</SelectBar>
				</ScrollView>
			</Container>
		);
	}
}

export default PlayerControl;
