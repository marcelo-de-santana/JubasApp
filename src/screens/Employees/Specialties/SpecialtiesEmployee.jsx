import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../../components/styles/global";
import { useEffect, useState } from "react";
import LoadScreen from "../../../components/LoadingScreen";
import env from "../../../../env.json"
import d from "../../../services/api/barberServices.json"

//TELA RESPONSÁVEL POR LISTAR AS ESPECIALIDADES QUE O BARBEIRO ATENDE
export default function SpecialtiesEmployee({ navigation, route }) {
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(1);
    const barberId = route.params.barberId;

    //BUSCAR NO BANCO DE DADOS AS ESPECIALIDADES SEPARADAS DE ACORDO COM O BARBEIRO
    useEffect(() => {
        fetch(`${env.host}/barber/${barberId}/specialties`)
            .then(response => response.json())
            .then(json => {
                setSpecialties(json)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    function sendAlert(serviceId, serviceNme) {
        return (
            Alert.alert('', `Deseja remover a especialidade "${serviceNme}"?`, [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => deleteSpecialty(serviceId)
                }
            ])
        );
    }

    function refreshPage() {
        setRefresh(refresh + 1)
    }

    //FUNÇÃO RESPONSÁVEL POR ALTERNAR O ESPECIALIDADE QUE O BARBEIRO ATENTE    
    async function deleteSpecialty(serviceId) {
        await fetch(`${env.host}/barber/specialties`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                barber_id: barberId,
                service_id: serviceId
            })
        })
        refreshPage()
    }

    if (loading) {
        return (
            <LoadScreen />
        );
    }

    return (
        < View style={global.container} >
            <View style={{ height: '94%' }}>
                {specialties.length === 0 ?
                    <View style={global.blueBoxItems}>
                        <Text style={global.whiteTextSmallCenter}>Nenhuma especialidade atribuída</Text>
                    </View>
                    :
                    <ScrollView>
                        <Text style={global.textHeader}>Especialidades que atende</Text>
                        {specialties.map((item) => (
                            <View key={item.category_id} style={global.blueBoxItems}>
                                <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                                {item.services.map(serviceItem => (
                                    <TouchableOpacity key={serviceItem.service_id} style={global.greyBoxItems} onPress={() => sendAlert(serviceItem.service_id, serviceItem.service_name)}>
                                        <Text style={global.whiteTextSmall}>{serviceItem.service_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                }
            </View>
            <TouchableOpacity style={global.button} onPress={() => navigation.navigate('SpecialtiesList')}>
                <Text style={global.textButton}>Adicionar especialidade</Text>
            </TouchableOpacity>
        </View >
    );
}