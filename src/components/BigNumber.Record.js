import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StrongText from './StrongText'
import Card from './Card'
import colors from '../styles/colors'
import _ from 'lodash'

const Record = ({ hide, title, won, lost, push, pending }) => {
	if(hide) return null
	return (    
		<Card style={ styles.container }>
        	<StrongText text={title}/>
            { !_.isNumber(pending) && 
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <StrongText style={ [ styles.text, { color: colors.success } ] } text={won}/>
                    </View>
                        <StrongText style={ [ styles.text, { color: colors.mute, fontSize: 12 } ] } text={' | '}/>
                    <View style={{ flex: 1 }}>
                        <StrongText style={ [ styles.text, { color: colors.danger } ] } text={lost}/>
                    </View>
                        <StrongText style={ [ styles.text, { color: colors.mute, fontSize: 12 } ] } text={' | '}/>
                    <View style={{ flex: 1 }}>
                        <StrongText style={ [ styles.text, { color: colors.dust } ] } text={push}/>
                    </View>
                </View>
            }
            { _.isNumber(pending) && 
                <StrongText style={ [ styles.text, { color: colors.warning } ] } text={pending}/>
            }
    	</Card>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        color: colors.mute, 
        fontSize: 36,
        textAlign: 'center'
    }
});

export default Record