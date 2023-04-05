import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default function About(){
	return(
		<View>
			<Text style={styles.textBody}>Somos um estabelecimento que atende o público masculino</Text>
		</View>
)}


const styles = StyleSheet.create({
	textBody:{
		color:'#000000'
	}
})
