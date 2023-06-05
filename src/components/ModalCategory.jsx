import { useCatalog } from "../contexts/catalog";
import { Alert, Modal, Pressable, TextInput, TouchableOpacity, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import env from "../../env.json";

function ModalCategory({ modalParams, setModalParams }) {
	const { refreshPage } = useCatalog();
	
	function closeModal() {
		setModalParams(prev => ({ ...prev, visible: false, data: {} }))
	}

	function handleTextInput(key, value) {
		setModalParams(
			prev => ({
				...prev, data: {
					...prev.data,
					[key]: value
				}
			})
		)
	}
	async function sendData() {
		const response = await fetch(`${env.host}/schedule/category`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_name: 'categoryName'
			})
		})
		const json = await response.json()

		if (response.status == 200) {
			Alert.alert('', json.message)
			refreshPage()
			closeModal()

		} else {
			Alert.alert('', json.message)
		}
	}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalParams.visible}
			onRequestClose={() => closeModal()}
		>
			<View style={modal.container}>
				<Pressable style={modal.pressable}
					onPress={() => closeModal()}>
				</Pressable>
				<View style={modal.boxItems}>

					<View style={modal.boxForm}>
						<Text style={global.textHeader}>Nome</Text>
						<TextInput style={modal.input}
							keyboardType="default"
							placeholderTextColor="#161C26"
							placeholder="Corte de cabelo feminino"
							value={modalParams.data?.categoryName}
							onChangeText={text => handleTextInput('categoryName',text)}
						/>

					</View>

					<TouchableOpacity style={modal.button} onPress={() => sendData()}>
						<Text style={modal.textButton}>Cadastrar categoria</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ Modal>
	);
}

export { ModalCategory }
