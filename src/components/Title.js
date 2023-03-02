import React from "react";
import {View,Text,StyleSheet} from "react-native";

export default function Title(){
	return(
      <View style={{height:60}}>
        <Text style={styles.h1}>Juba's Barbearia</Text>
        {/**<Text style={styles.h2}>Confira os horários disponíveis</Text>**/}
      </View>
	)}

const styles = StyleSheet.create({
	h1:{
		textAlign:"center",
		fontSize: 20,
		color:"#161c26"
	},
	h2:{
		textAlign:"center",
		fontSize: 12,
		color:"#161c26"
	}
})