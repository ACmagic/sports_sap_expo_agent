import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'

const HeaderTitle = ({ style, title }) => <Text style={ [styles.title, style] }>{title}</Text>

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold', 
        letterSpacing: 2,
        fontSize: 15, 
        color: colors.mute,
        paddingLeft: '6%',
        paddingBottom: 6,
        paddingTop: 12
    }
});

export default HeaderTitle