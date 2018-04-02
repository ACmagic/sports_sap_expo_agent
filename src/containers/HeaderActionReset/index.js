import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import _ from 'lodash'
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import colors from '../../styles/colors'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { handleClearWagerData } from '../../actions'

class HeaderActionReset extends Component {
	render() {
		const { navigation, handleClearWagerData, authUser: { role } } = this.props
		return (
			<TouchableOpacity style={ styles.container } onPress={ () => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    // key: null,
                    actions: [
                        NavigationActions.navigate({routeName: `${role === 'Player' ? 'Player' : 'Agent'}ActionScreen` }),
                    ]
                })
                navigation.dispatch(resetAction)
                handleClearWagerData()
			} }>
				<SmallText style={{ color: colors.danger, fontSize: 13 }} text='RESET'/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		paddingLeft: 16,
		paddingRight: 16
	},
});

const mapStateToProps = state => ({ authUser: state.auth.jwt })

export default connect( mapStateToProps, { handleClearWagerData } )(withNavigation(HeaderActionReset))


//export default withNavigation(HeaderActionReset)
