import React, { useEffect, useState } from "react";
import { useEmployee } from "../../../contexts/employee";
import { Alert, Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import { global } from "../../../components/styles/global"
import TextAlert from "../../../components/TextAlert"
import env from "../../../../env.json";
import mask from "../../../utils/mask";
import validation from "../../../utils/validation";

//FORMULÁRIO DE INSERÇÃO DE HORÁRIOS
export default function TimetableEntryForm({ navigation, route }) {
    const { data, indexButton, handlePagination } = useEmployee();
    const [timeInputValues, setTimeInputValues] = useState({
        start_time: '07:00',
        end_time: '17:00',
        start_interval: '11:00',
        end_interval: '12:00',
    });
    const [inputErrorStatus, setInputErrorStatus] = useState({
        start_time: false,
        end_time: false,
        start_interval: false,
        end_interval: false,
    });
    const [buttonStatus, setButtonStatus] = useState(Boolean(true));
    const [buttonPressed, setButtonPressed] = useState(false);
    const daysId = route.params;

    //ATUALIZA O ESTADO DA VARIÁVEL PARA VALIDAÇÃO
    useEffect(() => {
        if (buttonPressed === true) {
            setButtonPressed(false)
            sendData()
        }
    }, [inputErrorStatus])


    //FUNÇÃO RESPONSÁVEL POR VERIFICAR OS VALORES DOS INPUTS E EMITIR MENSAGEM DE ALERTA
    function checkAndSendData() {
        for (let key in timeInputValues) {
            if (validation.time.test(timeInputValues[key])) {
                setInputErrorStatus(prevState => ({ ...prevState, [key]: false }))
            } else {
                setInputErrorStatus(prevState => ({ ...prevState, [key]: true }))
            }
        }
        setButtonPressed(true)
    }

    //FUNÇÃO RESPONSÁVEL POR ENVIAR OS DADOS, MOSTRAR MENSAGEM DE SUCESSO E MUDAR DE TELA
    async function sendData() {
        //VERIFICA SE HÁ ERROS DE INSERÇÃO ANTES DE ENVIAR OS DADOS
        if (!Object.values(inputErrorStatus).includes(true)) {
            let params = []
            daysId.map(day => (
                params.push({
                    barber_id: data[indexButton].barber_id,
                    weekday: day,
                    start_time: timeInputValues.start_time,
                    end_time: timeInputValues.end_time,
                    start_interval: timeInputValues.start_interval,
                    end_interval: timeInputValues.end_interval,
                    status: buttonStatus
                })
            ))

            //ENVIANDO OS DADOS
            const response = await fetch(`${env.host}/barber/service-hour`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            })

            const json = await response.json()

            if (response.status == 201) {
                Alert.alert('', json.message)
                handlePagination('EmployeeTimeList')
            } else {
                Alert.alert('', response.message)
            }
        }
    }

    return (
        <View style={global.container}>
            <ScrollView>
                <Pressable onPress={Keyboard.dismiss}>
                    <View style={global.boxFlexRow}>
                        <Text style={global.textHeaderMiddle}>{data[indexButton].barber_name}</Text>
                    </View>

                    <Text style={global.label}>Entrada</Text>

                    <TextInput style={global.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="07:00"
                        maxLength={5}
                        value={timeInputValues['start_time']}
                        onChangeText={value => { setTimeInputValues(prev => ({ ...prev, start_time: mask.time(value) })) }}
                    />
                    {(inputErrorStatus.start_time && <TextAlert error={'*Campo obrigatório'} />)}

                    <Text style={global.label}>Entrada Intervalo</Text>

                    <TextInput style={global.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="11:00"
                        maxLength={5}
                        value={timeInputValues['start_interval']}
                        onChangeText={value => { setTimeInputValues(prev => ({ ...prev, start_interval: mask.time(value) })) }}
                    />
                    {(inputErrorStatus.start_interval && <TextAlert error={'*Campo obrigatório'} />)}

                    <Text style={global.label}>Retorno Intervalo</Text>
                    <TextInput style={global.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="12:00"
                        maxLength={5}
                        value={timeInputValues['end_interval']}
                        onChangeText={value => setTimeInputValues(prev => ({ ...prev, end_interval: mask.time(value) }))}
                    />
                    {(inputErrorStatus.end_interval && <TextAlert error={'*Campo obrigatório'} />)}

                    <Text style={global.label}>Saída</Text>
                    <TextInput style={global.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="16:00"
                        maxLength={5}
                        value={timeInputValues['end_time']}
                        onChangeText={value => setTimeInputValues(prev => ({ ...prev, end_time: mask.time(value) }))}
                    />
                    {(inputErrorStatus.end_time && <TextAlert error={'*Campo obrigatório'} />)}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 40 }}>
                        <Text style={global.label}>Status</Text>
                        <Switch value={buttonStatus} onValueChange={setButtonStatus} />
                    </View>
                    <TouchableOpacity style={global.button} onPress={() => checkAndSendData()}>
                        <Text style={global.textButton}>Confirmar</Text>
                    </TouchableOpacity>

                </Pressable>
            </ScrollView>

        </View>
    );
}
