import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Image } from 'react-native';
import _ from 'lodash'
import { handleSelectEventOdd, handleClearEventOdd } from '../../actions/eventOdd'
import moment from 'moment-timezone'
import Card from '../../components/Card'
import SectionTitle from '../../components/SectionTitle'
import StrongText from '../../components/StrongText'
import HeaderTitle from '../../components/HeaderTitle'
import colors from '../../styles/colors'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import lineDisplay from '../../utils/functions/lineDisplay'
import spreadPointDisplay from '../../utils/functions/spreadPointDisplay'
import showTeaserOddLine from '../../utils/functions/showTeaserOddLine'
import EventLogoDisplay from '../../containers/EventLogoDisplay'

class Event extends Component {
    _refetch(){
        this.props.handleClearEventOdd()
        this.props.refetch()
    }
	render() {
        const { actionEvents, wagerLimit, handleSelectEventOdd, eventOddPicks, loading } = this.props
		return (
			<FlatList
				data={actionEvents}
				keyExtractor={event => event._id}
                refreshControl={ <RefreshControl refreshing={loading} onRefresh={this._refetch.bind(this)}/> }
				extraData={() => null}
				renderItem={({item: event}) => {
                    const { _id, ID, actionOdd, matchTime, team: { away, home, awayPitcher, homePitcher }, title, period, teamLogo: { away: awayLogo, home: homeLogo, default: defaultLogo }, cutOffAt } = event
                    const { awayMoneyLine,
                            awaySpreadLine,
                            awaySpreadPoint,
                            homeMoneyLine,
                            homeSpreadLine,
                            homeSpreadPoint,
                            totalOverLine,
                            totalOverPoint,
                            totalUnderLine,
                            totalUnderPoint,
                            drawLine } = actionOdd

                    const awayMoneyLinePick = { 
                        Event: _id, 
                        ID: `${ID}_MONEY_LINE_AWAY`, 
                        radioID: `${ID}_BET`,
                        marked: {
                            oddType: 'MLine',
                            oddTarget: 'Away',
                            oddLineTarget: 'awayMoneyLine',
                            oddPointTarget: null,
                        }
                    }

                    const homeMoneyLinePick = { 
                        Event: _id, 
                        ID: `${ID}_MONEY_LINE_HOME`, 
                        radioID: `${event.ID}_BET`,
                        marked: {
                            oddType: 'MLine',
                            oddTarget: 'Home',
                            oddLineTarget: 'homeMoneyLine',
                            oddPointTarget: null,
                        }
                    }

                    const awaySpreadPick = { 
                        Event: _id, 
                        ID: `${ID}_SPREAD_AWAY`, 
                        radioID: `${ID}_BET`,
                        marked: {
                            oddType: 'Spread',
                            oddTarget: 'Away',
                            oddLineTarget: 'awaySpreadLine',
                            oddPointTarget: 'awaySpreadPoint',
                        }
                    }

                    const homeSpreadPick = { 
                        Event: _id, 
                        ID: `${ID}_SPREAD_HOME`, 
                        radioID: `${ID}_BET`,
                        marked: {
                            oddType: 'Spread',
                            oddTarget: 'Home',
                            oddLineTarget: 'homeSpreadLine',
                            oddPointTarget: 'homeSpreadPoint',
                        }
                    }

                    const totalOverPick = { 
                        Event: _id, 
                        ID: `${ID}_TOTAL_OVER`, 
                        radioID: `${ID}_TOTAL`,
                        marked: {
                            oddType: 'Total',
                            oddTarget: 'Over',
                            oddLineTarget: 'totalOverLine',
                            oddPointTarget: 'totalOverPoint',
                        }
                    }

                    const totalUnderPick = { 
                        Event: _id, 
                        ID: `${ID}_TOTAL_UNDER`, 
                        radioID: `${ID}_TOTAL`,
                        marked: {
                            oddType: 'Total',
                            oddTarget: 'Under',
                            oddLineTarget: 'totalUnderLine',
                            oddPointTarget: 'totalUnderPoint',
                        }
                    }

                    const drawPick = { 
                        Event: event._id, 
                        ID: `${ID}_DRAW`, 
                        radioID: `${ID}_BET`,
                        marked: {
                            oddType: 'Draw',
                            oddTarget: null,
                            oddLineTarget: 'drawLine',
                            oddPointTarget: null,
                        }
                    }

                    const isSelectedAwayMoneyLine = _.some(eventOddPicks, { ID: awayMoneyLinePick.ID })
                    const isSelectedHomeMoneyLine = _.some(eventOddPicks, { ID: homeMoneyLinePick.ID })
                    const isSelectedAwaySpread = _.some(eventOddPicks, { ID: awaySpreadPick.ID })
                    const isSelectedHomeSpread = _.some(eventOddPicks, { ID: homeSpreadPick.ID })
                    const isSelectedTotalOver = _.some(eventOddPicks, { ID: totalOverPick.ID })
                    const isSelectedTotalUnder = _.some(eventOddPicks, { ID: totalUnderPick.ID })
                    const isSelectedDraw = _.some(eventOddPicks, { ID: drawPick.ID })

					return (
                        <View>
                            <HeaderTitle title={title} />
                            <Card>
                                <View style={ styles.eventRow }>
                                    <View style={ styles.box } >
                                        <EventLogoDisplay style={ styles.logo } img={awayLogo} defaultImg={defaultLogo} />
                                    </View>
                                    <View style={ styles.box } >
                                        <Text style={ [ styles.event, { fontSize: 16 } ] }>{moment(matchTime).tz("America/Los_Angeles").format('hh:mm A')}</Text>
                                        <Text style={ [ styles.event, { fontSize: 9 } ] }>{moment(matchTime).tz("America/Los_Angeles").format('ddd, MMM DD, YY').toUpperCase()}</Text>
                                    </View>
                                    <View style={ styles.box } >
                                        <EventLogoDisplay style={ styles.logo } img={homeLogo} defaultImg={defaultLogo} />
                                    </View>
                                </View>

                                <View style={ styles.eventRow }>
                                    <View style={ styles.box } >
                                        <Text style={[ styles.event, { fontSize: 9 } ]}>{away}</Text>
                        {awayPitcher && <Text style={[ styles.event, { fontSize: 9 } ]}>{awayPitcher}</Text>}
                                    </View>
                                    <View style={ styles.box } >
                                        <Text style={ [ styles.event, { fontSize: 9 } ] }>{period.toUpperCase()}</Text>
                                    </View>
                                    <View style={ styles.box } >
                                        <Text style={[ styles.event, { fontSize: 9 } ]}>{home}</Text>
                        {homePitcher && <Text style={[ styles.event, { fontSize: 9 } ]}>{homePitcher}</Text> }
                                    </View>
                                </View>


                            { ( awayMoneyLine !== null && homeMoneyLine !== null ) && 
                                <View style={ styles.oddRow }>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(awayMoneyLinePick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedAwayMoneyLine ? 11 : 9, color: isSelectedAwayMoneyLine ? colors.success : colors.white }}>{lineDisplay(awayMoneyLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={ styles.box }>
                                        <Text style={{ fontWeight: 'bold', fontSize: isSelectedAwayMoneyLine || isSelectedHomeMoneyLine ? 11 : 9, color: isSelectedAwayMoneyLine || isSelectedHomeMoneyLine ? colors.success : colors.white }}>M-LINE</Text>
                                    </View>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(homeMoneyLinePick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedHomeMoneyLine ? 11 : 9, color: isSelectedHomeMoneyLine ? colors.success : colors.white }}>{lineDisplay(homeMoneyLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                             }


                            { ( awaySpreadPoint !== null && homeSpreadPoint !== null ) && 
                                <View style={ styles.oddRow }>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(awaySpreadPick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedAwaySpread ? 11 : 9, color: isSelectedAwaySpread ? colors.success : colors.white }}>{spreadPointDisplay(awaySpreadPoint)}{lineDisplay(awaySpreadLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={ styles.box }>
                                        <Text style={{ fontWeight: 'bold', fontSize: isSelectedAwaySpread || isSelectedHomeSpread ? 11 : 9, color: isSelectedAwaySpread || isSelectedHomeSpread ? colors.success : colors.white }}>SPREAD</Text>
                                    </View>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(homeSpreadPick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedHomeSpread ? 11 : 9, color: isSelectedHomeSpread ? colors.success : colors.white }}>{spreadPointDisplay(homeSpreadPoint)}{lineDisplay(homeSpreadLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }

                            { ( totalOverPoint !== null && totalUnderPoint !== null ) && 
                                <View style={ styles.oddRow }>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(totalOverPick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedTotalOver ? 11 : 9, color: isSelectedTotalOver ? colors.success : colors.white }}><IconFontAwesome name='arrow-up' size={8} />{' '}{totalOverPoint}{lineDisplay(totalOverLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={ styles.box }>
                                        <Text style={{ fontWeight: 'bold', fontSize: isSelectedTotalOver || isSelectedTotalUnder ? 11 : 9, color: isSelectedTotalOver || isSelectedTotalUnder ? colors.success : colors.white }}>TOTAL</Text>
                                    </View>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(totalUnderPick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedTotalUnder ? 11 : 9, color: isSelectedTotalUnder ? colors.success : colors.white }}><IconFontAwesome name='arrow-down' size={8} />{' '}{totalUnderPoint}{lineDisplay(totalUnderLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }

                            { ( drawLine !== null ) && 
                                <View style={ styles.oddRow }>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(drawPick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedDraw ? 11 : 9, color: isSelectedDraw ? colors.success : colors.white }}>{lineDisplay(drawLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={ styles.box }>
                                        <Text style={{ fontWeight: 'bold', fontSize: isSelectedDraw ? 11 : 9, color: isSelectedDraw ? colors.success : colors.white }}>DRAW</Text>
                                    </View>
                                    <View style={ styles.flex1 }>
                                        <TouchableOpacity style={ styles.oddButton } onPress={ () => handleSelectEventOdd(drawPick, wagerLimit) }>
                                            <Text style={{ fontWeight: 'bold', fontSize: isSelectedDraw ? 11 : 9, color: isSelectedDraw ? colors.success : colors.white }}>{lineDisplay(drawLine)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            <Text style={ styles.expires }>odd expires at {moment(cutOffAt).tz("America/Los_Angeles").format('hh:mm A')}</Text>
                            </Card>
                        </View>
					)
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
    logo: {
        height: 48, 
        width: 60, 
        resizeMode: 'contain',
        marginBottom: 4
    },
    eventRow: {
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 3, paddingBottom: 3
    },
    event: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    oddRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingTop: 6
    },
    flex1: {
        flex: 1, 
    },
    box: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    oddButton: {
        height: 24, 
        backgroundColor: colors.dark, 
        borderRadius: 6, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    expires: {
        marginTop: 8, 
        color: colors.mute, 
        fontSize: 8, 
        textAlign: 'center'
    }
});

const mapStateToProps = state => ({ eventOddPicks: state.eventOddPicks })
export default connect( mapStateToProps, { handleSelectEventOdd, handleClearEventOdd } )(Event);
