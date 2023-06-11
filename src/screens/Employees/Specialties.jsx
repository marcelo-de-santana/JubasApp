import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import { useEffect, useState } from "react";
import LoadScreen from "../../components/LoadingScreen";
import env from "../../../env.json"
import d from "../../services/api/barberServices.json"
import { useEmployee } from "../../contexts/employee";

//TELA RESPONSÁVEL POR LISTAR AS ESPECIALIDADES QUE O BARBEIRO ATENDE
export default function EmployeeSpecialties({ navigation }) {
    const { barbersData, indexButton } = useEmployee();
    const [barberSpecialties, setBarberSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    
    //BUSCAR NO BANCO DE DADOS AS ESPECIALIDADES DO BARBEIRO
    useEffect(() => {
        fetch(`${env.host}/barber/${barbersData[indexButton].barber_id}/specialties`)
        .then(response => response.json())
        .then(json => {
            setBarberSpecialties(json)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, [refresh])
    
    //ATUALIZA A PÁGINA QUANDO A NAVEGAÇÃO É RETORNADA
    navigation.addListener('focus', () => refreshPage())
    
    function refreshPage() {
        setLoading(true)
        setRefresh(refresh + 1)
    }

    function removeSpecialty(serviceId, serviceName) {
        //FUNÇÃO RESPONSÁVEL POR REMOVER A ESPECIALIDADE QUE O BARBEIRO ATENTE    
        async function deleteSpecialty(serviceId) {
            const response = await fetch(`${env.host}/barber/specialty`, {
                method: 'DELETE',
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
            refreshPage()
        }
        Alert.alert('', `Deseja remover a especialidade "${serviceName}"?`, [{
            text: 'Cancelar',
            style: 'cancel'
        }, {
            text: 'Confirmar',
            onPress: () => deleteSpecialty(serviceId)
        }])
    }

    if (loading) {
        return (
            <LoadScreen />
        );
    }

    return (
        <View style={global.container} >
            {barberSpecialties.length == 0 ?
                <View style={global.blueBoxItems}>
                    <Text style={global.whiteTextSmallCenter}>Nenhuma especialidade atribuída</Text>
                </View>
                :
                <ScrollView>
                    <Text style={global.textHeader}>Especialidades que atende</Text>
                    {barberSpecialties.map((item) => (
                        <View key={item.category_id} style={global.blueBoxItems}>
                            <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                            {item.services.map(serviceItem => (
                                <TouchableOpacity onPress={() => removeSpecialty(serviceItem.service_id, serviceItem.service_name)}
                                    key={serviceItem.service_id} style={global.greyBoxItems}>
                                    <Text style={global.whiteTextSmall}>{serviceItem.service_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            }
            <TouchableOpacity style={global.button} onPress={() => navigation.navigate('SpecialtiesList')}>
                <Text style={global.textButton}>Adicionar especialidade</Text>
            </TouchableOpacity>
        </View >
    );
}