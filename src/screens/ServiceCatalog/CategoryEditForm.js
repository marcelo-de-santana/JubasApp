import { useState } from "react";
import { useCatalog } from "../../contexts/catalog";
import { TextInput, TouchableOpacity, Text, View, Alert } from "react-native";
import { global } from "../../components/styles/global";
import env from "../../../env.json";


export default function CategoryEditForm({ navigation }) {
	const { specialties, categoryIndex, refreshPage } = useCatalog();
	const [categoryName, setCategoryName] = useState(specialties[categoryIndex]?.category_name)

    function DeleteAlert() {
        return (
            Alert.alert('', 'Deseja excluir a categoria?', [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => deleteCategory()
                }
            ])
        );
    }

	async function deleteCategory() {
		const response = await fetch(`${env.host}/schedule/category`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_id: specialties[categoryIndex]?.category_id
			})
		})
		const json = await response.json()

		if (response.status === 200) {
			Alert.alert('', json.message)
			refreshPage()
			navigation.pop()
		} else {
			Alert.alert('', json.message)
		}
	}

	async function updateCategory() {
		const response = await fetch(`${env.host}/schedule/category`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_id: specialties[categoryIndex]?.category_id,
				category_name: categoryName
			})
		})
		const json = await response.json()

		if (response.status === 200) {
			Alert.alert('', json.message)
			navigation.pop()
			refreshPage()
		} else {
			Alert.alert('', json.message)
		}
	}

	return (
		<View style={global.container}>
			<View style={{ height: "94%" }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={global.textHeader}>Categoria</Text>
					<TouchableOpacity onPress={() => DeleteAlert()}>
						<Text style={global.blackTextSmall}>Excluir categoria</Text>
					</TouchableOpacity>
				</View>

				<TextInput style={global.input}
					keyboardType="default"
					placeholderTextColor="#161c2660"
					placeholder="Corte de cabelo"
					maxLength={30}
					value={categoryName}
					onChangeText={setCategoryName}
				/>
			</View>
			<TouchableOpacity style={global.button} onPress={() => updateCategory()}>
				<Text style={global.textButton}>Salvar alteração</Text>
			</TouchableOpacity>
		</View>
	);
}
