import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import env from "../../../env.json";
import { global } from "../../components/styles/global";

export default function RegisterEmployee() {
    const [users, setUsers] = useState([])

    console.log(users)

    useEffect(() => {
        fetch(`${env.host}/users/all`)
            .then(response => response.json())
            .then(json => setUsers(json))
    }, [])

    function alert() {
        return (
            Alert.alert('', 'Deseja cadastrar FULANO como barbeiro?')
        );

    }

    return (
        <View style={global.container}>
            <ScrollView>
                {users.map((item, index) => (
                    <View key={index} >
                        <TouchableOpacity style={global.blueBoxItems} onPress={() => alert()}>
                        <Text style={global.whiteTextMiddle}>{item.nome}</Text>
                        <View style={global.boxFlexRow}>
                            <Text style={global.whiteTextSmall}>Status do cadastro: {item.status_cadastro}</Text>
                            <Text style={global.whiteTextSmall}>Nível acesso: {item.nivel_acesso}</Text>
                            </View>
                        </TouchableOpacity>
                        
                        </View>
                ))}
            </ScrollView>
        </View>
    );
}