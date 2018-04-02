import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, RefreshControl, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Query, Mutation } from './gql'
import { compose, graphql } from 'react-apollo';
import Container from '../../components/Container'
import SectionTitle from '../../components/SectionTitle'
import BigNumber from '../../components/BigNumber'
import StatusIndicator from '../../components/StatusIndicator'
import Hr from '../../components/Hr'
import Loading from '../../components/Loading'
import RowTDE from '../../components/RowTDE'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import { handleSubmitModalOn, handleSubmitModalReset } from '../../actions/submitModal'
//import { NativeModules } from 'react-native'
import Collapsible from 'react-native-collapsible';
//const { InAppUtils } = NativeModules


class PurchaseCredit extends Component {

	render() {
		return (
			<Container/>
		);
	}
}

const PurchaseCreditWithData = compose( 
	graphql(Query, {
		options: {
			fetchPolicy: 'network-only',
		}
	}),
	graphql(Mutation)
)(PurchaseCredit)


const mapStateToProps = state => ({ submitModal: state.submitModal })

export default connect( mapStateToProps, { handleSubmitModalReset, handleSubmitModalOn } )(PurchaseCreditWithData)

