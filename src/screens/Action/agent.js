import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { handleClearWagerData } from '../../actions'
import Container from '../../components/Container'
import BottomButton from '../../components/BottomButton'
import Action from './index'
import colors from '../../styles/colors'

const wagerLimit = {
	straight: true,
	parlay: true,
	basicTeaser: true,
	specialTeaser: true,
	bigTeaser: true,
	superTeaser: true,
	actionReverse: true,
	winReverse: true
}

const { straight, parlay, basicTeaser, specialTeaser, bigTeaser, superTeaser, actionReverse, winReverse } = wagerLimit

class AgentAction extends Component {
	render() {
		const { action, navigation, handleClearWagerData } = this.props
		return (
			<Container>
				<ScrollView refreshControl={ <RefreshControl refreshing={false} onRefresh={handleClearWagerData}/> }>
					<Action action={action} wagerLimit={wagerLimit} />
				</ScrollView>
				<BottomButton 
					onPress={ () => navigation.navigate('AgentActionTabNavigator', { title: action }) }
					activate={action !== ''}
					tip='SELECT ACTION' 
					next='NEXT'
				/>
			</Container>
		);
	}
}

const mapStateToProps = state => ({ action: state.action })

export default connect( mapStateToProps, { handleClearWagerData } )(AgentAction);