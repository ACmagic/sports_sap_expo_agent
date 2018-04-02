import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { StyleSheet, ScrollView, Switch, View, RefreshControl } from 'react-native';
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import colors from '../../styles/colors'
import SelectBar from '../../components/SelectBar'
import StripBar from '../../components/StripBar'
import HeaderTitle from '../../components/HeaderTitle'
import Loading from '../../components/Loading'

class Setting extends Component {

	render() {
		return (
			<Container>
				<ScrollView>
					<HeaderTitle title={'CHANGES'} />
					<SelectBar style={{ justifyContent: 'center' }} onPress={ () => navigation.navigate('AgentSettingChangePasswordScreen')}>
						<SmallText style={{ color: colors.white }} text='SET NEW PASSWORD'/>
					</SelectBar>
					<SelectBar style={{ justifyContent: 'center' }} onPress={ () => navigation.navigate('AgentSettingChangePasscodeScreen')}>
						<SmallText style={{ color: colors.white }} text='SET NEW PASSCODE'/>
					</SelectBar>
					<SelectBar style={{ justifyContent: 'center' }} onPress={ () => navigation.navigate('AgentSettingChangeEmailScreen')}>
						<SmallText style={{ color: colors.white }} text='SET NEW EMAIL'/>
					</SelectBar>
					<View style={{ height: 24 }} />
				</ScrollView>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
    switch: {
		margin: -9, 
		alignSelf: 'flex-end', 
		transform: [{ scale: .7 }]
    },
});

// const SettingWithData = compose(
// 	graphql(Query, { optinos: { fetchPolicy: 'network-only'} }),
// 	graphql(Mutation)
// )(Setting)

export default Setting;