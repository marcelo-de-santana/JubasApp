import { useState } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { global } from "../../components/styles/global";
import env from "../../../env.json";

export default function CategoryEditForm({navigation}){
	const [categoryName, setCategoryName] = useState()	
	
	return(
		<View style={global.container}>
			<View style={{height:"94%"}}>
				<Text style={global.textHeader}>Nome da categoria</Text>
				            	
            	<Text style={global.textHeader}>Deletar</Text>
				<TextInput style={global.input}
                	keyboardType="default"
                	placeholderTextColor="#161c2660"
                	placeholder="Corte de cabelo"
                	value={categoryName}
                	onChangeText={setCategoryName}
            	/>
			</View>
			<TouchableOpacity style={global.button} onPress={() => addCategory()}>
            	<Text style={global.textButton}>Salvar alteração</Text>
            </TouchableOpacity>		
		</View>
	);
}
