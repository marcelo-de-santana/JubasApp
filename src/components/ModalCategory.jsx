import { useState } from "react";
import { useCatalog } from "../contexts/catalog";
import { Alert, Modal, Pressable, TextInput, TouchableOpacity, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import env from "../../env.json";

function RegisterCategory({ modalVisible, setModalVisible }) {
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
			setCategoryName('')
			setModalVisible(false)

		} else {
			Alert.alert('', json.message)
		}
	}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={modal.container}>
				<Pressable style={modal.pressable}
					onPressIn={() => setModalVisible(false)}>
				</Pressable>
				<View style={modal.boxItems}>

					<View style={modal.boxForm}>
						<Text style={global.textHeader}>Nome</Text>
						<TextInput style={modal.input}
							keyboardType="default"
							placeholderTextColor="#161C26"
							placeholder="Corte de cabelo feminino"
							value={categoryName}
							onChangeText={setCategoryName}
						/>

					</View>

					<TouchableOpacity style={modal.button} onPress={() => addCategory()}>
						<Text style={modal.textButton}>Cadastrar categoria</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}


function EditCategory() {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
		>
			<View style={modal.container} >
				<Pressable style={modal.pressable} onPress={() => setModalVisible(!modalVisible)}>
				</Pressable>
				<View style={modal.boxItems}>
					<Text style={global.label}>Nome</Text>
					<TextInput style={global.input}
						maxLength={30}
						keyboardType="default"

						placeholderTextColor="#161C26"
						placeholder="Corte de cabelo feminino"
						value={categoryName}
						onChangeText={text => setCategoryName(text)}
					/>
					<TouchableOpacity style={global.button} onPress={() => setModalVisible(true)}>
						<Text style={global.textButton}>Cadastrar categoria</Text>
					</TouchableOpacity>
				</View>


			</View>
		</Modal>
	);
}

export { RegisterCategory, EditCategory }
