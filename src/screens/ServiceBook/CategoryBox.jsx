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

    

    function MyCartButtom() {
        return (
            <View style={global.cart}>
                <TouchableOpacity onPress={() => navigation.push('Cart')}>
                    <Text style={global.blackTextSmall}>Meu carrinho</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (loading) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <View style={global.container}>
                <ScrollView>
                    <View style={global.boxHeader}>
                        <MyCartButtom />
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
            </View>
        );
                    }

}

