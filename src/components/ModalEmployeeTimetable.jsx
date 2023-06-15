import { useState } from "react";
import { Alert, Keyboard, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { global, modal } from "./styles/global";
import { WeekDaysForm } from "./WeekDaysForm";
import mask from "../utils/mask";
import env from "../../env.json";
import { useEmployee } from "../contexts/employee";

export function ModalTimetable({ modalParams, setModalParams }) {
    const { barbersData, indexButton, refreshPage } = useEmployee();
    const [statusButton, setStatusButton] = useState({})
    const registerForm = modalParams.data?.week
    const barberId = barbersData[indexButton].barber_id

    function sendTimeWeek() {
        Alert.alert('', 'Deseja gravar o registro?', [{
            text: 'Cancelar',
            style: 'cancel',
        },
        {
            text: 'Confirmar',
            onPress: () => sendTimeWeekData()
        }])
        async function sendTimeWeekData() {
            const response = await fetch(`${env.host}/barber/service-hour`, {
                method: (registerForm ? 'POST' : 'PUT'),
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: modalParams.data,
                    barber_id: barberId,
                    statusButton
                })
            })
            const json = await response.json()
            Alert.alert('', json.message)
            refreshPage()
            closeModal()
        }
    }

    function deleteTimeWeek() {
        Alert.alert('', 'Deseja gravar o registro?', [{
            text: 'Cancelar',
            style: 'cancel',
        },
        {
            text: 'Confirmar',
            onPress: () => sendDeleteTimeWeek()
        }])
        async function sendDeleteTimeWeek() {
            const response = await fetch(`${env.host}/barber/service-hour`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: modalParams.data,
                })
            })
            const json = await response.json()
            Alert.alert('', json.message)
            refreshPage()
            closeModal()
        }
    }

    function closeModal() {
        setModalParams((prev) => ({ ...prev, visible: false, data: {} }));
        setStatusButton({})
    }

    function handleTextInput(key, value) {
        setModalParams((prev) => ({
            ...prev,
            data: { ...prev.data, [key]: value }
        }));
    }

    return (
        <Modal visible={modalParams.visible} onRequestClose={() => closeModal()}>
            <View style={modal.container}>
                <Pressable style={modal.pressable} onPress={() => closeModal()} />
                <Pressable onPress={Keyboard.dismiss}>
                    {registerForm && <WeekDaysForm statusButton={statusButton} setStatusButton={setStatusButton} />}

                    <View style={modal.boxItems}>

                        <View style={modal.boxForm}>
                            <Text style={modal.label}>Entrada</Text>

                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="07:00:00"
                                maxLength={8}
                                value={modalParams.data?.start_time}
                                onChangeText={(text) => handleTextInput("start_time", mask.fullTime(text))}
                            />

                            <Text style={modal.label}>Entrada Intervalo</Text>

                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="11:00:00"
                                maxLength={8}
                                value={modalParams.data?.start_interval}
                                onChangeText={(text) => handleTextInput("start_interval", mask.fullTime(text))}
                            />

                            <Text style={modal.label}>Retorno Intervalo</Text>
                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="12:00:00"
                                maxLength={8}
                                value={modalParams.data?.end_interval}
                                onChangeText={(text) => handleTextInput("end_interval", mask.fullTime(text))}
                            />

                            <Text style={modal.label}>Saída</Text>
                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="16:00:00"
                                maxLength={8}
                                value={modalParams.data?.end_time}
                                onChangeText={(text) => handleTextInput("end_time", mask.fullTime(text))}
                            />

                            <View style={global.boxFlexRowSwitch}>
                                <Text style={modal.label}>Status</Text>
                                <Switch value={Boolean(modalParams.data?.status)} onValueChange={value => handleTextInput('status', value)} />
                            </View>
                            <TouchableOpacity style={modal.button} onPress={() => sendTimeWeek()}>
                                <Text style={modal.textButton}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                        {!registerForm && <TouchableOpacity style={modal.redButton} onPress={() => deleteTimeWeek()}>
                            <Text style={modal.textButton}>Excluir horário</Text>
                        </TouchableOpacity>}
                    </View>
                </Pressable>
            </View>
        </Modal>
    );
}
