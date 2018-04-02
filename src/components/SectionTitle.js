import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors'


const SectionTitle = ({ title, style }) => (
    <Text style={ [ styles.title, style ] }>{title}</Text>
)

const styles = StyleSheet.create({
//     container: {
// //        flex: 1,
//         paddingLeft: '6%', 
//         paddingRight: '6%',
//         paddingBottom: 12
//     },
    title: {
        paddingLeft: '6%', 
        paddingRight: '6%',
        paddingBottom: 12,
        color: colors.mute, 
        fontSize: 18, 
        fontWeight: 'bold', 
        letterSpacing: 2
    }
});

export default SectionTitle


