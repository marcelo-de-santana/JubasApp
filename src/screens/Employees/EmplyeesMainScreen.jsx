import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { global } from "../../components/styles/global";
import { useEmployee } from "../../contexts/employee";

export default function ({ navigation }) {
    const {handlePagination} = useEmployee();
    return (
        <View style={global.container}>
            <ScrollView style={{ height: '94%' }}>
                <TouchableOpacity style={global.blueBoxItems} onPress={() => handlePagination('ActiveEmployees')}>
                    <Text style={global.whiteTextMiddle}>Funcionários ativos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={global.blueBoxItems} onPress={() => navigation.navigate('AllEmployees')}>
                    <Text style={global.whiteTextMiddle}>Todos os funcionários</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={global.blueBoxItems} onPress={() => navigation.navigate('RegisterEmployee')}>
                    <Text style={global.whiteTextMiddle}>Todos os usuários</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={global.button} onPress={() => navigation.navigate('RegisterEmployee')}>
                <Text style={global.textButton}>Cadastrar funcionário</Text>
            </TouchableOpacity>
        </View>
    );
}