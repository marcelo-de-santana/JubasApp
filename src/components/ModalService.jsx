import { useCatalog } from "../contexts/catalog";
import { useState } from "react";
import { Modal, Pressable, TextInput, TouchableOpacity, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import env from "../../env.json"

export function ModalService({ modalParams, setModalParams }) {
	const { refreshPage } = useCatalog();
	const serviceId = modalParams.serviceParams?.serviceId;

	async function sendService() {
		const response = await fetch(`${env.host}/schedule/service`, {
			method: (serviceId == null ? 'POST' : 'PUT'),
			headers: {
				'Content-Type': 'applicattion/json'
			},
			body: JSON.stringify({
				service_id: (serviceId != null ? modalParams.serviceParams?.serviceId : ''),
				service_name: modalParams.serviceParams?.serviceName,
				duration: modalParams.serviceParams?.duration,
				price: modalParams.serviceParams?.price
			})
		})
		const json = await response.json()

		if (response.status === 200) {
			setModalParams(false)
			Alert.alert('', json.message)
			refreshPage()
		} else {
			Alert.alert('', json.message)
		}
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

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalParams.editService}
		>
			<View style={modal.container} >
				<Pressable style={modal.pressable} onPress={() => setModalParams(prev => ({ editService: false, serviceParams: {} }))}>
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
					<TouchableOpacity style={modal.button} onPress={() => sendService()}>
						<Text style={modal.textButton}>Cadastrar serviço</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
