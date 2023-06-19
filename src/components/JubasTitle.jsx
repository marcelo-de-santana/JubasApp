import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Title() {
	return (
		<View style={styles.titleBox}>
			<Text style={styles.h1}>Juba's Barbearia</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	titleBox: {
		backgroundColor: "#3c4659",
		height: 60,
		justifyContent: 'center',
	},
	h1: {
		textAlign: "center",
		fontSize: 20,
		color: "#ffffff"
	}
})