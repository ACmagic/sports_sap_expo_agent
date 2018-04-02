import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import { StyleSheet, View } from 'react-native';
import StrongText from '../../components/StrongText'
import PickBar from '../../components/PickBar'
import colors from '../../styles/colors'
import { handleSelectAction } from '../../actions/action'
import { Straight, Parlay, BasicTeaser, SpecialTeaser, BigTeaser, SuperTeaser, WinReverse, ActionReverse } from '../../components/ActionRules'

class Action extends Component {
	render() {
		const { action, handleSelectAction, wagerLimit } = this.props
		const { straight, parlay, basicTeaser, specialTeaser, bigTeaser, superTeaser, actionReverse, winReverse } = wagerLimit
		return (
			<View>
				<PickBar hide={!straight} style={ styles.stripe } onPress={ () => handleSelectAction('straight') }>
					<StrongText text='STRAIGHT' style={action === 'straight' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'straight' }><Straight /></Collapsible>
				
				<PickBar hide={!parlay} style={ styles.stripe } onPress={ () => handleSelectAction('parlay') }>
					<StrongText text='PARLAY' style={action === 'parlay' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'parlay' }><Parlay /></Collapsible>

				<PickBar hide={!basicTeaser} style={ styles.stripe } onPress={ () => handleSelectAction('basicTeaser') }>
					<StrongText text='BASIC TEASER' style={action === 'basicTeaser' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'basicTeaser' }><BasicTeaser /></Collapsible>

				<PickBar hide={!specialTeaser} style={ styles.stripe } onPress={ () => handleSelectAction('specialTeaser') }>
					<StrongText text='SPECIAL TEASER' style={action === 'specialTeaser' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'specialTeaser' }><SpecialTeaser /></Collapsible>

				<PickBar hide={!bigTeaser} style={ styles.stripe } onPress={ () => handleSelectAction('bigTeaser') }>
					<StrongText text='BIG TEASER' style={action === 'bigTeaser' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'bigTeaser' }><BigTeaser /></Collapsible>

				<PickBar hide={!superTeaser} style={ styles.stripe } onPress={ () => handleSelectAction('superTeaser') }>
					<StrongText text='SUPER TEASER' style={action === 'superTeaser' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'superTeaser' }><SuperTeaser /></Collapsible>

				<PickBar hide={!winReverse} style={ styles.stripe } onPress={ () => handleSelectAction('winReverse') }>
					<StrongText text='WIN REVERSE' style={action === 'winReverse' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'winReverse' }><WinReverse /></Collapsible>

				<PickBar hide={!actionReverse} style={ styles.stripe } onPress={ () => handleSelectAction('actionReverse') }>
					<StrongText text='ACTION REVERSE' style={action === 'actionReverse' ? styles.activate : null}/>
				</PickBar>
				<Collapsible collapsed={ action !== 'actionReverse' }><ActionReverse /></Collapsible>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	stripe: {
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	activate: {
		fontSize: 15,
		color: colors.action
	}
});

export default connect( null, { handleSelectAction } )(Action);