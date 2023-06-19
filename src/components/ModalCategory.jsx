import { useCatalog } from "../contexts/catalog";
import { Alert, Modal, Pressable, TextInput, TouchableOpacity, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import env from "../../env.json";

function ModalCategory({ modalParams, setModalParams }) {
	const { refreshPage } = useCatalog();
	const categoryId = modalParams.data.categoryId ?? false;

	function closeModal() {
		setModalParams(({ visible: false, data: {} }))
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

	function deleteCategory() {
		Alert.alert('', "Deseja deletar o registro de categoria?", [{
			text: 'Cancelar',
			style: "cancel"
		}, {
			text: "Confirmar",
			onPress: () => sendDeleteCategory()
		}])
		async function sendDeleteCategory() {
			const response = await fetch(`${env.host}/schedule/category`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					category_id: categoryId
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
	}

	function sendData() {
		Alert.alert('', "Deseja gravar o registro de categoria?", [{
			text: 'Cancelar',
			style: "cancel"
		}, {
			text: "Confirmar",
			onPress: () => sendCategory()
		}])
		async function sendCategory() {
			const response = await fetch(`${env.host}/schedule/category`, {
				method: (categoryId ? 'PUT' : 'POST'),
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					category_id: categoryId,
					category_name: modalParams.data.categoryName
				})
			})
			const json = await response.json()

			if (response.status == 200) {
				closeModal()
				Alert.alert('', json.message)
				refreshPage()
			} else {
				Alert.alert('', json.message)
			}
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
							<View style={global.boxFlexRow}>
								<Text style={global.textHeader}>Nome</Text>
							</View>
							<TextInput style={modal.input}
								keyboardType="default"
								placeholderTextColor="#161C2660"
								placeholder="Corte de cabelo feminino"
								value={modalParams.data?.categoryName}
								onChangeText={text => handleTextInput('categoryName', text)}
							/>

						</View>

						<TouchableOpacity style={modal.button} onPress={() => sendData()}>
							<Text style={modal.textButton}>{categoryId ? 'Editar' : 'Cadastrar'}</Text>
						</TouchableOpacity>
						{categoryId &&
							<TouchableOpacity style={modal.redButton} onPress={() => deleteCategory()}>
								<Text style={modal.textButton}>Excluir</Text>
							</TouchableOpacity>}
					</View>
				</View>
			</ Modal>
		);
	}

	export { ModalCategory }
