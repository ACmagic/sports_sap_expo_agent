import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { Query } from './gql'
import moment from 'moment-timezone'
import Container from '../../components/Container'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import colors from '../../styles/colors'
import { handleSelectWeekNum } from '../../actions/utilSelect'
import SelectBar from '../../components/SelectBar'
import { withNavigation } from 'react-navigation';
import Loading from '../../components/Loading'

class SelectWeek extends Component {
	_pickWeekNum(weekNum){
		const { nextRouteName, navigation, handleSelectWeekNum } = this.props
		handleSelectWeekNum(weekNum)
		navigation.navigate(nextRouteName)
	}
	render() {
		if(this.props.data.loading ) return <Loading/>
		const { handleSelectWeekNum, utilSelect: { startOfWeekNum, endOfWeekNum }, data: { loading, refetch, user: { createdAt } } } = this.props
		const diffWeekNum = Math.abs((moment(moment(createdAt).tz("America/Los_Angeles").startOf('isoWeek')).diff(moment().tz("America/Los_Angeles").endOf('isoWeek'), 'weeks'))) + 1
		const weekNums = [...Array(diffWeekNum)].map((_, idx) => idx)
		return (
			<Container>
				<FlatList
					data={weekNums}
					keyExtractor={weekNum => weekNum}
					refreshControl={ <RefreshControl refreshing={loading} onRefresh={refetch}/> }
					extraData={() => null}
					renderItem={({ index }) => {
						const isSelectedStartOfWeekNum = Math.abs(startOfWeekNum) === index
						const isSelectedEndOfWeekNum = Math.abs(endOfWeekNum) === index
						return (
							<SelectBar style={{ flexDirection: 'row', alignItems: 'center' }}  onPress={() => this._pickWeekNum(-index)}>
								<StrongText style={{ width: 120, color: isSelectedStartOfWeekNum ? colors.action : colors.white }} text={`${moment().tz("America/Los_Angeles").add(-index, 'w').startOf('isoWeek').format('MMM DD, YYYY').toUpperCase()}`}/>
								<SmallText style={{ width: 32, }} text='TO' />
								<StrongText style={{ color: isSelectedEndOfWeekNum ? colors.action : colors.white }} text={`${moment().tz("America/Los_Angeles").add(-index, 'w').endOf('isoWeek').format('MMM DD, YYYY').toUpperCase()}`}/>
							</SelectBar>
						)
					}}
				/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	text: {
		color: 'red', 
		fontSize: 24, 
		fontWeight: 'bold'
	}
});

const SelectWeekWithData = compose( graphql(Query, { optinos: { fetchPolicy: 'network-only'} }) )(SelectWeek)

const mapStateToProps = state => ({ utilSelect: state.utilSelect })

export default connect( mapStateToProps, { handleSelectWeekNum } )(withNavigation(SelectWeekWithData));
