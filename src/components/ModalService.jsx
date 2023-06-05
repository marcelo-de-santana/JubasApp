import { useCatalog } from "../contexts/catalog";
import { Alert, Modal, Pressable, TextInput, TouchableOpacity, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import env from "../../env.json"

export function ModalService({ modalParams, setModalParams }) {
	const { refreshPage } = useCatalog();
	const serviceId = modalParams.serviceParams.serviceId ?? false;

	function closeModal() {
		setModalParams(prev => ({ modalVisible: false, serviceParams: {} }))
	}

	function handleTextInput(key, value) {
		setModalParams(
			prev => ({
				...prev, serviceParams: {
					...prev.serviceParams,
					[key]: value
				}
			})
		)
	}

	async function sendData() {
		const response = await fetch(`${env.host}/schedule/service`, {
			method: (serviceId ? 'PUT' : 'POST'),
			headers: {
				'Content-Type': 'applicattion/json'
			},
			body: JSON.stringify({
				service_id: serviceId,
				service_name: modalParams.serviceParams?.serviceName,
				duration: modalParams.serviceParams?.duration,
				price: modalParams.serviceParams?.price
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
			visible={modalParams.modalVisible}
			onRequestClose={() => closeModal()}
		>
			<View style={modal.container} >
				<Pressable style={modal.pressable} onPress={() => closeModal()}>
				</Pressable>
				<View style={modal.boxItems}>
					<View style={modal.boxForm}>
						<Text style={global.label}>Nome do serviço</Text>
						<TextInput style={modal.input}
							keyboardType="default"
							placeholderTextColor="#161c2660"
							placeholder="Corte de cabelo na tesoura"
							maxLength={40}
							value={modalParams.serviceParams?.serviceName ?? ''}
							onChangeText={text => handleTextInput('serviceName', text)}
						/>
						<Text style={global.label}>Duração</Text>
						<TextInput style={modal.input}
							keyboardType="default"
							placeholderTextColor="#161c2660"
							placeholder="00:20"
							maxLength={20}
							value={modalParams.serviceParams?.duration ?? ''}
							onChangeText={text => handleTextInput('duration', text)}
						/>
						<Text style={global.label}>Preço</Text>
						<TextInput style={modal.input}
							keyboardType="numeric"
							placeholderTextColor="#161c2660"
							placeholder="10,00"
							maxLength={20}
							value={modalParams.serviceParams?.price ?? ''}
							onChangeText={text => handleTextInput('price', text)}
						/>
					</View>
					<TouchableOpacity style={modal.button} onPress={() => sendData()}>
						<Text style={modal.textButton}>{serviceId ? 'Editar' : 'Cadastrar'} serviço</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
