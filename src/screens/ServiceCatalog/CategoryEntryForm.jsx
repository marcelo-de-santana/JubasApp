import { useState } from "react";
import { useCatalog } from "../../contexts/catalog";
import { TextInput, TouchableOpacity, Text, View, Alert } from "react-native";
import { global } from "../../components/styles/global";
import env from "../../../env.json";

export default function CategoryEntryForm({ navigation }) {
	const { refreshPage } = useCatalog();
	const [categoryName, setCategoryName] = useState();

	async function addCategory() {
		const response = await fetch(`${env.host}/schedule/category`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_name: categoryName

			})
		})
		const json = await response.json()

		if (response.status == 200) {
			Alert.alert('', json.message)
			refreshPage()
			navigation.pop()
		} else {
			Alert.alert('', json.message)
		}
	}

	return (
		<View style={global.container}>
			<View style={{ height: "94%" }}>
				<Text style={global.textHeader}>Categoria</Text>
				<TextInput style={global.input}
					maxLength={30}
					keyboardType="default"
					placeholderTextColor="#161c2660"
					placeholder="Corte de cabelo feminino"
					value={categoryName}
					onChangeText={setCategoryName}
				/>
			</View>
			<TouchableOpacity style={global.button} onPress={() => addCategory()}>
				<Text style={global.textButton}>Cadastrar categoria</Text>
			</TouchableOpacity>
		</View>
	);
}
