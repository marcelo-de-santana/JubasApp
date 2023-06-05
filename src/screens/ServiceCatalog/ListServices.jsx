import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { global, modal } from "../../components/styles/global";
import { useCatalog } from "../../contexts/catalog";
import { ModalService } from "../../components/ModalService";

export default function ListServices({ navigation, route }) {
    const { specialties, categoryIndex } = useCatalog();
    const [modalParams, setModalParams] = useState({
        addService: false,
        editService: false,
        serviceParams: {}
    });

    function ModalAddService({ modalParams, setModalParams }) {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalParams.addService}
            >
                <Pressable style={modal.container} onPress={() => setModalParams(prev => ({
                    ...prev,
                    addService: false,
                }))}>
                    {/* <ServiceRegistrationForm /> */}
                </Pressable>
            </Modal>
        );
    }

    function showModalEdit(services) {
        setModalParams(prev => ({ ...prev, editService: true, serviceParams: services }))
    }
    function showModalAdd() {
        setModalParams(prev => ({ ...prev, editService: true, serviceParams: {} }))
    }

    return (
        <View style={global.container}>
            {/* <EditService modalParams={modalParams} setModalParams={setModalParams} /> */}
            <ModalService modalParams={modalParams} setModalParams={setModalParams} />

            <ScrollView style={{ height: '94%' }}>
                <Text style={global.textHeader}>Serviços</Text>

                {specialties?.[categoryIndex]?.services.map((item, index) => (
                    <View key={item.service_id} style={global.blueBoxItems}>
                        <View style={global.boxFlexRow}>

                            <Text style={global.whiteTextSmall}>
                                {item.service_name}
                            </Text>
                            <TouchableOpacity onPress={() => showModalEdit({
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

            <TouchableOpacity style={global.button} onPress={() => showModalAdd()}>
                <Text style={global.textButton}>Adicionar Serviço</Text>
            </TouchableOpacity>
        </View>

    );
}
