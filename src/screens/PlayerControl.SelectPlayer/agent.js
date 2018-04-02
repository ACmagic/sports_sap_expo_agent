import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, RefreshControl, Picker } from 'react-native';
import { compose, graphql } from 'react-apollo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import moment from 'moment'
import Card from '../../components/Card'
import Container from '../../components/Container'
import SectionTitle from '../../components/SectionTitle'
import StrongText from '../../components/StrongText'
import SmallText from '../../components/SmallText'
import Hr from '../../components/Hr'
import Badge from '../../components/Badge'
import colors from '../../styles/colors'
import { NavigationActions } from 'react-navigation'
import { handleSelectPlayer } from '../../actions/utilSelect'
import SelectBar from '../../components/SelectBar'
import { withNavigation } from 'react-navigation';
import BottomButton from '../../components/BottomButton'
import Loading from '../../components/Loading'
import SelectPlayer from '../../containers/SelectPlayer'

class EditPlayer extends Component {
	render() {
		return <SelectPlayer nextRouteName='AgentPlayerControlEditPlayerScreen'/>
	}
}

export default EditPlayer;