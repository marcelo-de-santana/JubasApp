import { useState } from "react";
import { Alert, Keyboard, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { global, modal } from "./styles/global";
import { WeekDaysForm } from "./WeekDaysForm";
import mask from "../utils/mask";
import env from "../../env.json";

export function ModalTimetable({ modalParams, setModalParams }) {
    const [statusButton, setStatusButton] = useState({})
    
    async function registerTimeWeek(){
        const response = await fetch(`${env.host}/barber/service-hour`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(modalParams.data,statusButton)
        })
        const json = await response.json()
        Alert.alert('', json.message)
        closeModal()
    }

    function closeModal() {
        setModalParams((prev) => ({ ...prev, visible: false, data: {} }));
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
                    {modalParams.data?.week && <WeekDaysForm statusButton={statusButton} setStatusButton={setStatusButton} />}

                    <View style={modal.boxItems}>

                        <View style={modal.boxForm}>
                            <Text style={modal.label}>Entrada</Text>

                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="07:00:00"
                                maxLength={5}
                                value={modalParams.data?.start_time}
                                onChangeText={(text) => handleTextInput("start_time", mask(text))}
                            />
                            {/*(inputErrorStatus.start_time && <TextAlert error={'*Campo obrigatório'} />)*/}

                            <Text style={modal.label}>Entrada Intervalo</Text>

                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="11:00:00"
                                maxLength={5}
                                value={modalParams.data?.start_interval}
                            // onChangeText={value => { setTimeInputValues(prev => ({ ...prev, start_interval: mask.time(value) })) }}
                            />
                            {/*(inputErrorStatus.start_interval && <TextAlert error={'*Campo obrigatório'} />)*/}

                            <Text style={modal.label}>Retorno Intervalo</Text>
                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="12:00:00"
                                maxLength={5}
                                value={modalParams.data?.end_interval}
                            //                      onChangeText={value => setTimeInputValues(prev => ({ ...prev, end_interval: mask.time(value) }))}
                            />
                            {/*(inputErrorStatus.end_interval && <TextAlert error={'*Campo obrigatório'} />)*/}

                            <Text style={modal.label}>Saída</Text>
                            <TextInput
                                style={modal.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                placeholder="16:00:00"
                                maxLength={5}
                                value={modalParams.data?.end_time}
                            //                      onChangeText={value => setTimeInputValues(prev => ({ ...prev, end_time: mask.time(value) }))}
                            />
                            {/*(inputErrorStatus.end_time && <TextAlert error={'*Campo obrigatório'} />)*/}

                            <View style={global.boxFlexRowSwitch}>
                                <Text style={modal.label}>Status</Text>
                                <Switch value={Boolean(modalParams.data?.status)} onValueChange={value => handleTextInput('status', value)} />
                            </View>
                            <TouchableOpacity style={modal.button} onPress={() => registerTimeWeek()}>
                                <Text style={modal.textButton}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={modal.redButton} onPress={() => closeModal()}>
                            <Text style={modal.textButton}>Excluir horário</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </View>
        </Modal>
    );
}
