import { useCatalog } from "../../contexts/catalog";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import { ModalService } from "../../components/ModalService";

export default function ListServices({ navigation, route }) {
    const { specialties, categoryIndex } = useCatalog();
    const parentCategoryId = specialties[categoryIndex].category_id
    const [modalParams, setModalParams] = useState({
        visible: false,
        data: {}
    });

    function openModal(service) {
        setModalParams(prev => ({ ...prev, visible: true, data: service }))
    }

    return (
        <View style={global.container}>
            <ModalService modalParams={modalParams} setModalParams={setModalParams} parentCategoryId={parentCategoryId} />

            <ScrollView style={{ height: '94%' }}>
                <Text style={global.textHeader}>Serviços</Text>
                {specialties?.[categoryIndex]?.services.map((item) => (
                    <View key={item.service_id} style={global.blueBoxItems}>
                        <View style={global.boxFlexRow}>

                            <Text style={global.whiteTextSmall}>
                                {item.service_name}
                            </Text>
                            <TouchableOpacity onPress={() => openModal({
                                serviceId: item.service_id,
                                serviceName: item.service_name,
                                duration: item.duration,
                                price: item.price
                            })}>
                                <Text style={global.whiteTextSmall}>Editar</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={global.greyBoxItemsFlex}>
                            <Text style={global.darkBlueTextSmall}>Duração: {item.duration}</Text>
                            <Text style={global.darkBlueTextSmall}>Preço: {(item?.price ?? 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={global.button} onPress={() => openModal({})}>
                <Text style={global.textButton}>Adicionar Serviço</Text>
            </TouchableOpacity>
        </View>

    );
}
