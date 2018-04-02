import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import colors from '../styles/colors'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
const SelectBar = ({ hide, onPress, style, children }) => {
    if(hide) return null
    return (
        <TouchableOpacity style={ styles.container } onPress={onPress} >
        <View style={[ { flex: 1 }, style ]}>{children}</View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.mute }}><IconFontAwesome name='chevron-right' size={13}/></Text>
        </View>
        </TouchableOpacity>     
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        marginBottom: 3, 
        minHeight: 48,
        backgroundColor: colors.black,
        flexDirection: 'row'
    }
});

export default SelectBar