import React from "react";
import {View,TextInput,StyleSheet} from "react-native";

export default function InputLabel(){
	return(
	<View>
		<TextInput style={styles.input} keyboardType='email-address' placeholder='jubadeleao@exemplo.com'/>
	</View>
)}

const styles = StyleSheet.create({
input:{
    width:"80%",
    height: 40,
    borderWidth: 0.8,
    borderRadius: 6,
    padding: 10,
},
})