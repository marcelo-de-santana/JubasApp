import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import { useEffect, useState } from "react";
import LoadScreen from "../../components/LoadingScreen";
import env from "../../../env.json"
import d from "../../services/api/barberServices.json"

//TELA RESPONSÁVEL POR LISTAR AS ESPECIALIDADES QUE O BARBEIRO ATENDE
export default function SpecialtiesList({ navigation, route }) {
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);

    //BUSCAR NO BANCO DE DADOS AS ESPECIALIDADES SEPARADAS DE ACORDO COM O BARBEIRO
    useEffect(() => {
        fetch(`${env.host}/barber/specialties`)
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

    //FUNÇÃO RESPONSÁVEL POR ALTERNAR O ESPECIALIDADE QUE O BARBEIRO ATENTE    
    async function registerSpecialty(serviceId) {
        await fetch(`${env.host}/barber/specialties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                barberId: 1,
                serviceId: serviceId
            })
        })
        refreshPage()
    }

    function refreshPage() {
        setRefresh(refresh + 1)
    }

    if (loading) {
        return (
            <LoadScreen />
        );
    }

    return (
        < View style={global.container} >
            <View style={{ height: '94%' }}>
                <ScrollView>
                    <Text style={global.textHeader}>Especialidades disponíveis</Text>
                    {specialties.map((item, index) => (
                        <View key={index} style={global.blueBoxItems}>
                            <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                            {item.services?.map( serviceItem => (
                                <TouchableOpacity key={serviceItem.service_id} style={global.greyBoxItems} onPress={() => registerSpecialty(serviceItem.service_id)}>
                                    <Text style={global.whiteTextSmall}>{serviceItem.service_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
            <TouchableOpacity style={global.button} onPress={() => alert('')}>
                <Text style={global.textButton}>Adicionar especialidade</Text>
            </TouchableOpacity>
        </View >
    );
}