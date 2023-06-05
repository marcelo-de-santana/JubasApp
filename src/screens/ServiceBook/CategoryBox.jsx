import { useService } from '../../contexts/service';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { global } from '../../components/styles/global';
import LoadingScreen from '../../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function CategoryBox({ navigation }) {
    const { serviceData, loading } = useService()

    useEffect(()=>{
        navigation.setOptions({headerShown:true})
    },[navigation])

    function handlePagination(index) {
        navigation.navigate('Services', { categoryIndex: index })
    }

    if (loading) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <View style={global.container}>
                <ScrollView style={{height:'94%'}}>
                    <View style={global.boxHeader}>
                        
                        <Text style={global.textHeader}>
                            Selecione uma categoria
                        </Text>
                        {
                            serviceData.map((item, index) => (
                                <View key={index} style={global.blueBoxItems}>
                                    <TouchableOpacity onPress={() => { handlePagination(index) }}>
                                        <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                                    </TouchableOpacity>
                                </View>

                            ))
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity style={global.button} onPress={() => navigation.push('Cart')}>
                    <Text style={global.textButton}>Ver carrinho</Text>
                </TouchableOpacity>
            </View>
        );
                    }

}

