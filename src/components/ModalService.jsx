import { useCatalog } from "../contexts/catalog";
import { Alert, Modal, Pressable, TextInput, TouchableOpacity, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import mask from "../utils/mask";
import env from "../../env.json";

export function ModalService({ modalParams, setModalParams, parentCategoryId }) {
	const { refreshPage } = useCatalog();
	const serviceId = modalParams.data.serviceId ?? false;

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
	async function deleteService() {
		const response = await fetch(`${env.host}/schedule/service`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				service_id: serviceId,
			})
		})
		const json = await response.json()

		if (response.status === 200) {
			closeModal()
			Alert.alert('', json.message)
			refreshPage()
		} else {
			Alert.alert('', json.message)
		}
	}

	async function sendData() {
		const response = await fetch(`${env.host}/schedule/service`, {
			method: (serviceId ? 'PUT' : 'POST'),
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_id: parentCategoryId,
				service_id: serviceId,
				service_name: modalParams.data?.serviceName,
				duration: modalParams.data?.duration,
				price: modalParams.data?.price
			})
		})
		const json = await response.json()

		if (response.status === 200) {
			closeModal()
			Alert.alert('', json.message)
			refreshPage()
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
			<View style={modal.container} >
				<Pressable style={modal.pressable} onPress={() => closeModal()}>
				</Pressable>
				<View style={modal.boxItems}>
					<View style={modal.boxForm}>
						<Text style={global.textHeader}>Nome do serviço</Text>
						<TextInput style={modal.input}
							keyboardType="default"
							placeholderTextColor="#161c2660"
							placeholder="Corte de cabelo na tesoura"
							maxLength={40}
							value={modalParams.data?.serviceName ?? ''}
							onChangeText={text => handleTextInput('serviceName', text)}
						/>
						<Text style={global.textHeader}>Duração</Text>
						<TextInput style={modal.input}
							keyboardType="numeric"
							placeholderTextColor="#161c2660"
							placeholder="HH:MM:SS"
							maxLength={8}
							value={modalParams.data?.duration ?? ''}
							onChangeText={text => handleTextInput('duration', mask.fullTime(text))}
						/>
						<Text style={global.textHeader}>Preço</Text>
						<TextInput style={modal.input}
							keyboardType="numeric"
							placeholderTextColor="#161c2660"
							placeholder="10.00"
							maxLength={7}
							value={modalParams.data?.price ?? ''}
							onChangeText={text => handleTextInput('price', text)}
						/>
					</View>
					<TouchableOpacity style={modal.button} onPress={() => sendData()}>
						<Text style={modal.textButton}>{serviceId ? 'Editar' : 'Cadastrar'}</Text>
					</TouchableOpacity>
					{serviceId &&
						<TouchableOpacity style={modal.redButton} onPress={() => deleteService()}>
							<Text style={modal.textButton}>Excluir</Text>
						</TouchableOpacity>}
				</View>
			</View>
		</Modal>
	);
}
