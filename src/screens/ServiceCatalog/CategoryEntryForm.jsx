import { useState } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { global } from "../../components/styles/global";
import env from "../../../env.json";

export default function CategoryEntryForm({navigation}){
	const [categoryName, setCategoryName] = useState()
	
	async function addCategory(){
		fetch(`${env.host}/schedule/category`, {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				category_name: categoryName
			
			})
		})
		navigation.pop()
	}

	return(
		<View style={global.container}>
			<View style={{height:"94%"}}>
				<Text style={global.textHeader}>Nome da categoria</Text>
				<TextInput style={global.input}
                	keyboardType="default"
                	placeholderTextColor="#161c2660"
                	placeholder="Corte de cabelo"
                	maxLength={20}
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
