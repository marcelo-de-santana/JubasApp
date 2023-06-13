import { useEffect, useState } from 'react';
import env from "../../../env.json";
import { useService } from '../../contexts/service';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';
import { global } from '../../components/styles/global';


export default function CategoryBox({ navigation }) {
    const { serviceData, setServiceData, serviceParams } = useService();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${env.host}/barber/${serviceParams.barberId}/specialties`)
            .then(response => response.json())
            .then(json => {
                setServiceData(json)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [serviceParams])

    function handlePagination(index) {
        navigation.navigate('ServiceBox', { categoryIndex: index })
    }

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View style={global.container}>
            <ScrollView style={{ height: '94%' }}>
                <View style={global.boxHeader}>

                    <Text style={global.textHeader}>
                        Selecione uma categoria
                    </Text>
                    {serviceData.map((item, index) => (
                        <View key={index} style={global.blueBoxItems}>
                            <TouchableOpacity onPress={() => { handlePagination(index) }}>
                                <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={global.button} onPress={() => navigation.push('Cart')}>
                <Text style={global.textButton}>Ver carrinho</Text>
            </TouchableOpacity>
        </View>
    );
}

