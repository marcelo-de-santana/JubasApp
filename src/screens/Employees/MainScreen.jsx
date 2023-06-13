import { useEmployee } from "../../contexts/employee";
import LoadScreen from "../../components/LoadingScreen";
import { Modal, Text, TouchableOpacity, ScrollView, View, Pressable, TextInput } from "react-native";
import { global, modal } from "../../components/styles/global";
import { useState } from "react";
import { ModalEmployee, ModalRegisterEmployee } from "../../components/ModalEmployee";

export default function EmployeesMainScreen() {
    const { barbersData, loading, changePage } = useEmployee();
    const [modalParams, setModalParams] = useState({
        visible: false,
        data: ''
    });
    const [modalRegisterParams, setModalRegisterParams] = useState({
        visible: false,
        data: ''
    });

    function openModal(barberId, barberName, barberStatus) {
        setModalParams(prev => ({
            ...prev,
            visible: true,
            data: {
                barberId: barberId,
                barberName: barberName,
                barberStatus: barberStatus
            }
        }))
    }

    function openModalRegister() {
        setModalRegisterParams(prev => ({
            ...prev,
            visible: true,
        }))
    }

    if (loading) {
        return (
            <LoadScreen />
        );
    }

    return (
        <View style={global.container}>
            <ModalEmployee modalParams={modalParams} setModalParams={setModalParams} />
            <ModalRegisterEmployee modalParams={modalRegisterParams} setModalParams={setModalRegisterParams} />
            <ScrollView>
                <Text style={global.textHeaderMiddle}>
                    Barbeiros
                </Text>
                {barbersData.map((item, index) => (
                    <View key={item.barber_id}>
                        <View style={global.blueBoxItems}>
                            <View style={global.boxFlexRow}>
                                <Text style={global.whiteTextMiddle}>
                                    {item.barber_name}
                                </Text>
                                <TouchableOpacity onPress={() => openModal(item.barber_id, item.barber_name, item.registration_status)}>
                                    <Text style={global.whiteTextSmall}>Editar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={global.greyBox}>
                                {item.times.map(timesItem => (
                                    <Text key={timesItem.weekday} style={global.darkBlueTextSmallCenter}>
                                        {timesItem.weekday?? 'Sem registro'}
                                    </Text>
                                ))}
                                <Text style={global.darkBlueTextSmallCenter}>
                                    {item.registration_status ? 'Ativo' : 'Inativo'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => changePage('EmployeeOverview', index)}>
                                <Text style={global.whiteTextSmallVeryCenter}>Ver detalhes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

            </ScrollView>
            <TouchableOpacity style={global.button} onPress={() => openModalRegister()}>
                <Text style={global.textButton}>Cadastrar barbeiro</Text>
            </TouchableOpacity>
        </View>
    );

}
