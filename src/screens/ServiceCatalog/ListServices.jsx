import { useCatalog } from "../../contexts/catalog";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import { ModalService } from "../../components/ModalService";

export default function ListServices({ navigation, route }) {
    const { specialties, categoryIndex } = useCatalog();
    const [modalParams, setModalParams] = useState({
        modalVisible: false,
        serviceParams: {}
    });

    function openModal(services) {
        setModalParams(prev => ({ ...prev, modalVisible: true, serviceParams: services }))
    }

    return (
        <View style={global.container}>
            <ModalService modalParams={modalParams} setModalParams={setModalParams} />

            <ScrollView style={{ height: '94%' }}>
                <Text style={global.textHeader}>Serviços</Text>

                {specialties?.[categoryIndex]?.services.map((item, index) => (
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
                            <Text style={global.darkBlueTextSmall}>Preço: R${item.price},00</Text>
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
