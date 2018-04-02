import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../../styles/colors'

class EventLogoDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            teamImg: true 
        }
    }
    render(){
        const { style, img, defaultImg } = this.props
        return  <Image style={ style } source={{ uri: this.state.teamImg ? img : defaultImg }} onError={() => this.setState({ teamImg: false }) }/>
    }
}

export default EventLogoDisplay