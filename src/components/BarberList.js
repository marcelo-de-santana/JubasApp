import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberList({ data }) {


	function timeResponse(id, name, time) {
		alert(`Você está sendo redirecionado para a página de confirmação.
				Deseja marcar um atendimento com ${name} às ${time.substr(0, 5)}?
				Lembre-se que o tempo de tolerância é de 10 minutos, não se atrase!`)
	}


	return (

		(data != null) ?
			<ScrollView>

				{data.map(item => (

					<View key={item.id} style={styles.boxHeader}>

						<Text style={styles.textHeader}>{item.name}</Text>

						<View style={styles.timesBox}>

							{item.available_times.map((aTimes) => (
								(item.unavailable_times.find(uTimes => uTimes == aTimes)) ?
									<Text key={aTimes} style={styles.textUnATimes}>{aTimes.substr(0, 5)}</Text>
									:
									<TouchableOpacity key={aTimes} onPress={() => timeResponse(item.id, item.name, aTimes)}>
										<Text style={styles.textATimes}>{aTimes.substr(0, 5)}</Text>
									</TouchableOpacity>

							))}
						</View>
					</View>

				))}
			</ScrollView>

			:

			<View style={{ alignItems: "center", height: "70%", justifyContent: "center" }}>
				<Text style={{ fontSize: 18, fontWeight: "bold", color:"#000000" }}>Agenda Indiponível</Text>
			</View>

	)

}

const styles = StyleSheet.create({
	boxHeader: {
		marginTop:5,
		paddingBottom: 10
	},
	textHeader: {
		color: "#000000",
		fontSize: 14,
		paddingLeft: 15,
		paddingBottom: 4
	},
	timesBox: {
		backgroundColor: "#9ba7bf",
		borderRadius: 10,
		flexDirection: "row",
		flexWrap: 'wrap',
		marginHorizontal: 10,
		padding: 12
	},
	textATimes: {
		color: "white",
		fontSize: 20,
		paddingHorizontal: 4
	},
	textUnATimes: {
		color: "red",
		fontSize: 20,
		paddingHorizontal: 4
	}
})
