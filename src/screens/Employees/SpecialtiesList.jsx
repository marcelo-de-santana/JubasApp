import { useEmployee } from "../../contexts/employee";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import LoadScreen from "../../components/LoadingScreen";
import env from "../../../env.json";

//TELA RESPONSÁVEL POR LISTAR AS ESPECIALIDADES QUE O BARBEIRO ATENDE
export default function SpecialtiesList({ navigation, route }) {
    const { barbersData, indexButton } = useEmployee();
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);

    //BUSCAR NO BANCO DE DADOS AS ESPECIALIDADES SEPARADAS DE ACORDO COM O BARBEIRO
    useEffect(() => {
        fetch(`${env.host}/schedule/specialties`)
            .then(response => response.json())
            .then(json => {
                setSpecialties(json)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    //FUNÇÃO RESPONSÁVEL POR ALTERNAR O ESPECIALIDADE QUE O BARBEIRO ATENTE    
    function assingSpecialty(serviceId) {
        async function registerSpecialty(serviceId) {
            const response = await fetch(`${env.host}/barber/specialty`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    barber_id: barbersData[indexButton].barber_id,
                    service_id: serviceId
                })
            })
            const json = await response.json()
            Alert.alert('', json.message)
            navigation.navigate('EmployeeSpecialties')
        }
        Alert.alert('',
            `Deseja atribuir a especialidade ao barbeiro ${barbersData[indexButton].barber_name}`, [{
                text: 'Cancelar',
                style: 'cancel'
            }, {
                text: 'Confirmar',
                onPress: () => registerSpecialty(serviceId)
            }])
    }


    if (loading) {
        return (
            <LoadScreen />
        );
    }

    return (
        < View style={global.container} >
            <Text style={global.textHeader}>Especialidades disponíveis</Text>
            <ScrollView>
                {specialties.map((item, index) => (
                    <View key={index} style={global.blueBoxItems}>
                        <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                        {item.services?.map(serviceItem => (
                            <TouchableOpacity onPress={() => assingSpecialty(serviceItem.service_id)}
                                key={serviceItem.service_id} style={global.greyBoxItems} >
                                <Text style={global.whiteTextSmall}>{serviceItem.service_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View >
    );
}