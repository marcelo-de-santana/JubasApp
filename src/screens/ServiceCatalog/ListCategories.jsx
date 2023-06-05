import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from "../../components/LoadingScreen";
import { global } from "../../components/styles/global";
import { useCatalog } from "../../contexts/catalog";
import { RegisterCategory } from "../../components/ModalCategory";

export default function ListCategories({ navigation }) {
    const { specialties, setCategoryIndex, refreshPage } = useCatalog();
    const [modalVisible, setModalVisible] = useState(false);

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
            <RegisterCategory modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={{ height: '94%' }}>
                {specialties.length === 0 ?
                    <View style={global.blueBoxItems}>
                        <Text style={global.whiteTextSmallCenter}>Nenhuma categoria disponível</Text>
                    </View>
                    :
                    <ScrollView>
                        <Text style={global.textHeader}>Categorias</Text>
                        {specialties.map((item, index) => (
                            <View key={item.category_id} style={global.blueBoxItems}>

                                <View style={global.boxFlexRow}>
                                    <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                                    <TouchableOpacity onPress={() => changeScreen('CategoryEditForm', [index])}>
                                        <Text style={global.whiteTextSmall}>Editar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={global.greyBoxItemsFlex} >
                                    <View>
                                        {item.services.map(serviceItem => (
                                            <Text key={serviceItem.service_id} style={global.darkBlueTextSmall}>{(serviceItem.service_id) ? serviceItem.service_name : 'Nenhum serviço'}</Text>
                                        ))}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => changeScreen('ListServices', [index])} >
                                    <Text style={global.whiteTextSmallVeryCenter}>Ver serviços</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                }
            </View>
            <TouchableOpacity style={global.button} onPress={() => setModalVisible(true)}>
                <Text style={global.textButton}>Adicionar Categoria</Text>
            </TouchableOpacity>
        </View>
    );
}
