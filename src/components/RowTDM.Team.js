import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../styles/colors'

//const RowTDMTeam = ({ team, name, img, score }) => (
class RowTDMTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            teamImg: true 
        }
    }

    render(){
        const { team, name, img, score, defaultImg } = this.props
        return (
            <View style={ styles.container }>
                <Text style={ styles.team }>{team}</Text>
                <View style={ styles.detailRow }>
                  <Image style={ styles.img } source={{ uri: this.state.teamImg ? img : defaultImg }} onError={() => this.setState({ teamImg: false }) }/>
                  {score && <Text style={ [ styles.name, { color: colors.primary } ] }>{score}</Text>}
                  <Text style={ styles.name }>{name}</Text>
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
		height: 36, 
		alignItems: 'center', 
		flexDirection: 'row', 
		borderBottomWidth: 1, 
		borderColor: colors.dark
    },
    detailRow: {
        paddingLeft: 12, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    img: {
        height: 20, 
        width: 30, 
        resizeMode: 'contain'
    },
    team: {
        width: 60, 
        textAlign: 'right',
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.mute
    },
    name: {
    	paddingLeft: 12,
        fontWeight: 'bold', 
        letterSpacing: 1, 
        fontSize: 11, 
        color: colors.dust
    }
});

export default RowTDMTeam

