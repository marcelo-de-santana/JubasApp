import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from "../../components/LoadingScreen";
import { global } from "../../components/styles/global";
import { useCatalog } from "../../contexts/catalog";

export default function ListCategories({ navigation }) {
    const { specialties, setCategoryIndex } = useCatalog();

    function changeScreen(routerName, arrayIndex) {
        setCategoryIndex(arrayIndex)
        navigation.push(routerName, arrayIndex)
    }

    if (specialties.length === 0) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View style={global.container}>
            <View style={{ height: '94%' }}>
                {specialties.length === 0 ?
                    <View style={global.blueBoxItems}>
                        <Text style={global.whiteTextSmallCenter}>Nenhuma categoria disponível</Text>
                    </View>
                    :
                    <ScrollView>
                        <Text style={global.textHeader}>Lista de categorias</Text>
                        {specialties.map((item, index) => (
                            <View key={item.category_id} style={global.blueBoxItems}>
                                
                                <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                                    <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                                    <TouchableOpacity onPress={() =>changeScreen('CategoryEditForm', [index])}>
                                        <Text style={global.whiteTextSmall}>Editar</Text>
                                    </TouchableOpacity>
                                </View>

                                {item.services.map(serviceItem => (
                                    <TouchableOpacity key={serviceItem.service_id} style={global.greyBoxItemsSmall} onPress={() => changeScreen('ListServices', [index])} >
                                        <Text style={global.whiteTextSmall}>{(serviceItem.service_id)? serviceItem.service_name : 'Nenhum serviço'}</Text>
                                    </TouchableOpacity>
                                ))}

                            </View>
                        ))}
                    </ScrollView>
                }
            </View>
            <TouchableOpacity style={global.button} onPress={() => navigation.push('CategoryEntryForm')}>
                <Text style={global.textButton}>Adicionar Categoria</Text>
            </TouchableOpacity>
        </View>
    );
}
