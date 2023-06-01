import { useState } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { global } from "../../components/styles/global";
import env from "../../../env.json"

export default function ServiceEntryForm({navigation}){
	const [serviceName, setServiceName] = useState()

	async function addService(){
		const response = await fetch(`${env.host}/schedule/service`,{
			method: 'POST',
			headers:{
				'Content-Type': 'applicattion/json'
			},
			body: JSON.stringify({
				category_id: 1,
				service_name: serviceName
			})
		})
		const json = await response.json()
		
		console.log(json)
		
		navigation.pop()
	}

	return(
		<View style={global.container}>
			<View style={{height:"94%"}}>
				<Text style={global.textHeader}>Nome do serviço</Text>
		<TextInput style={global.input}
            keyboardType="default"
            placeholderTextColor="#161c2660"
            placeholder="Corte de cabelo na tesoura"
            maxLength={20}
            value={serviceName}
            onChangeText={setServiceName}
        />
			
			</View>
			<TouchableOpacity style={global.button} onPress={() => addService()}>
            	<Text style={global.textButton}>Cadastrar serviço</Text>
            </TouchableOpacity>
		</View>
	);


}
