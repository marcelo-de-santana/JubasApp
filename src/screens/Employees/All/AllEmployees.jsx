import { useEmployee } from "../../../contexts/employee";
import LoadScreen from "../../../components/LoadingScreen";
import { Alert, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { global } from "../../../components/styles/global";
import { useEffect, useState } from "react";
import env from "../../../../env.json";

export default function InactiveEmployees() {
    const [loading, setLoading] = useState(true);
    const [barbers, setBarbers] = useState([]);
    const [refresh, setRefresh] = useState(1);

    useEffect(() => {
        fetch(`${env.host}/barber/`)
            .then(response => response.json())
            .then(json => {
                setBarbers(json)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [refresh])

    function alert(message, barberId, status) {
        return (
            Alert.alert('', message, [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => sendData(barberId, status)
                }
            ])
        );
    }

    async function sendData(barberId, status) {
        const response = await fetch(`${env.host}/users/register-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                barber_id: barberId,
                status: Number(status)
            })
        })

        if (response.status == 200) {
            setRefresh(refresh + 1)
        } else {
            Alert.alert('', response.message)
        }
    }

    if (loading) {
        return (
            <LoadScreen />
        );
    }
    return (
        <ScrollView style={global.container}>
            <Text style={global.textHeaderMiddle}>
                Barbeiros ativos
            </Text>

            {barbers.map((value) => {
                return (
                    //VERFICA SE O BARBEIRO ESTÁ ATIVO
                    (value.status === 1) &&
                    <View key={value.barber_id}>
                        <TouchableOpacity
                            style={global.blueBoxItems}
                            onPress={() => alert(`Deseja deixar ${value.barber_name} inativo?`, value.barber_id, !value.status)}
                        >
                            <Text style={global.whiteTextMiddle}>
                                {value.barber_name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
            <Text style={global.textHeaderMiddle}>
                Barbeiros inativos
            </Text>
            {barbers.map((value) => {
                return (
                    //VERIFICA SE O BARBEIRO ESTÁ INATIVO
                    (value.status === 0) &&
                    <View key={value.barber_id}>
                        <TouchableOpacity
                            style={global.greyBoxItems}
                            onPress={() => alert(`Deseja deixar ${value.barber_name} ativo?`, value.barber_id, !value.status)}
                        >
                            <Text style={global.whiteTextMiddle}>
                                {value.barber_name}
                            </Text>
                        </TouchableOpacity>
                    </View>)
            })}

        </ScrollView>
    );

}
