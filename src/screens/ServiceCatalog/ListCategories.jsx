import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from "../../components/LoadingScreen";
import d from "../../services/api/scheduleSpecialties.json"
import { global } from "../../components/styles/global";
import { useCatalog } from "../../contexts/catalog";

export default function ListCategories({ navigation }) {
    const { specialties, setCategoryIndex } = useCatalog([])

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
            <ScrollView style={{ height: '94%' }}>
                <Text style={global.textHeader}>Lista de categorias</Text>
                {specialties.map((item, index) => (
                    <TouchableOpacity key={item.category_id} style={global.blueBoxItems} onPress={() => changeScreen('ListServices', [index])}>
                        <Text style={global.whiteTextMiddle}>{item.category_name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={global.button}>
                <Text style={global.textButton}>Adicionar Categoria</Text>
            </TouchableOpacity>
        </View>
    );
}