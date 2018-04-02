import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../styles/colors'

export const Straight = () => (
    <View style={ styles.container }>
        <Text style={ styles.text }>Betting wagers on a single game that carries Money Line, Point-Spread, or Game Total (over/under). To win a straight bet you must correctly choose the team that will cover the spread, or correclty choose if the score of the game will be over or under a certain amount.</Text>
    </View>
)

export const Parlay = () => (
    <View style={ styles.container }>
        <Text style={ styles.text }>A parlay, accumulator, or combo bet is a single bet that links together two or more individual wagers and is dependent on all of those wagers winning together. The benefit of the parlay is that there are much higher payoffs than placing each individual bet separately since the difficulty of hitting it is much higher.</Text>
    </View>
)

export const BasicTeaser = () => (
    <View style={ styles.container }>
        <Text style={ [ styles.text, { fontWeight: 'bold', fontSize: 12, marginBottom: 3 } ] }>Football 6.0pts / Basketball 4.0pts</Text>
        <Text style={ styles.text }>Teams ( Line ) / 2 ( -110 ) / 3 ( +160 ) / 4 ( +250 ) / 5 ( +400 ) / 6 ( +600 ) / 7 ( +900 ) / 8 ( +1400 )</Text>
    </View>
)

export const SpecialTeaser = () => (
    <View style={ styles.container }>
        <Text style={ [ styles.text, { fontWeight: 'bold', fontSize: 12, marginBottom: 3 } ] }>Football 6.5pts / Basketball 4.5pts</Text>
        <Text style={ styles.text }>Teams ( Line ) / 2 ( -130 ) / 3 ( +140 ) / 4 ( +200 ) / 5 ( +350 ) / 6 ( +500 ) / 7 ( +800 ) / 8 ( +1200 )</Text>
    </View>
)

export const BigTeaser = () => (
    <View style={ styles.container }>
        <Text style={ [ styles.text, { fontWeight: 'bold', fontSize: 12, marginBottom: 3 } ] }>Football 7.0pts / Basketball 5.0pts</Text>
        <Text style={ styles.text }>Teams ( Line ) / 2 ( -140 ) / 3 ( +120 ) / 4 ( +180 ) / 5 ( +300 ) / 6 ( +400 ) / 7 ( +700 ) / 8 ( +1000 )</Text>
    </View>
)

export const SuperTeaser = () => (
    <View style={ styles.container }>
        <Text style={ [ styles.text, { fontWeight: 'bold', fontSize: 12, marginBottom: 3 } ] }>Football 10.0pts / Basketball 7.0pts</Text>
        <Text style={ styles.text }>Teams ( Line ) / 3 ( -130 )</Text>
        <Text style={ styles.text }>You must win all 3 games on the Bet Ticket for the Super Teaser to be a winner. Ties lose.</Text>
    </View>
)

export const WinReverse = () => (
    <View style={ styles.container }>
        <Text style={ styles.text }>This can be a combination of 2-4 Teams. All win reverse bets are double action: the remaining bets in the sequence will be placed if the preceding bet is a win. An "IF Win" follows the sequence "if Team 1 wins then Team 2."</Text>
    </View>
)

export const ActionReverse = () => (
    <View style={ styles.container }>
        <Text style={ styles.text }>This can be a combination of 2-4 Teams. All action reverse bets are double action: the remaining bets in the sequence will be placed if the preceding bet is a win, a "push," or is cancelled for any reason. An "if bet" (double action) follows the sequence "if Team 1 wins, ties or cancels then Team 2."</Text>
    </View>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.dark,
		padding: '2%',
		marginBottom: '2%'
	},
	text: {
		fontSize: 11,
		color: colors.dust
	}
});