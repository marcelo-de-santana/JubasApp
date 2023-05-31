import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../../components/styles/global";
import { useEffect, useState } from "react";
import LoadScreen from "../../../components/LoadingScreen";
import env from "../../../../env.json"
import d from "../../../services/api/barberServices.json"

//TELA RESPONSÁVEL POR LISTAR AS ESPECIALIDADES QUE O BARBEIRO ATENDE
export default function SpecialtiesEmployee({ navigation }) {
    const [specialties, setSpecialties] = useState(d);
    const [refresh, setRefresh] = useState(1);

    //BUSCAR NO BANCO DE DADOS AS ESPECIALIDADES SEPARADAS DE ACORDO COM O BARBEIRO
    useEffect(() => {
        fetch(`${env.host}/barber/services-by-category`)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error))
    }, [])

    //BUSCA TODOS OS SERVIÇOS
    useEffect(() => {
        fetch(`${env.host}/barber/services`)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error))
    }, [])

    //BUSCAR NO BANCO DE DADOS AS ESPECIALIDADES SEPARADAS DE ACORDO COM O BARBEIRO
    useEffect(() => {
        fetch(`${env.host}/barber/services-by-category`)
            .then(response => response.json())
            .then(json => setSpecialties(json))
            .catch(error => console.log(error))
    }, [refresh])

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

    if (specialties.length === 0) {
        return (
            <LoadScreen />
        );
    }

    return (
        < View style={global.container} >
            <ScrollView>

                <Text style={global.textHeader}>Especialidades que atende</Text>
                {specialties.map((item, index) => (
                    <View key={index} style={global.blueBoxItems}>
                        <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                        {item.name_services?.map(sName => (
                            <TouchableOpacity key={sName.service_id} style={global.greyBoxItems} onPress={() => registerSpecialty(sName.service_id)}>
                                <Text style={global.whiteTextSmall}>{sName.service_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
                <Text style={global.textHeader}>Especialidades que não atende</Text>

                <TouchableOpacity style={global.button} onPress={() => alert('')}>
                    <Text style={global.textButton}>Inserir especialidade ao barbeiro</Text>
                </TouchableOpacity>
                <Text style={{ color: '#000' }}>id especialidade</Text>
                <Text style={{ color: '#000' }}>id do serviço</Text>
                <Text style={{ color: '#000' }}>id do barbeiro</Text>

            </ScrollView>

        </View >
    );
}