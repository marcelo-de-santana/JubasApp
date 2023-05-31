import { useEffect, useState } from "react";
import { useEmployee } from "../../../contexts/employee";
import { Alert, Keyboard, Pressable, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { global } from "../../../components/styles/global"
import env from "../../../../env.json";
import mask from "../../../utils/mask";
import validation from "../../../utils/validation";
import TextAlert from "../../../components/TextAlert";

export default function TimeEditForm({ navigation, route }) {
    const { data, indexButton, handlePagination } = useEmployee()
    const weekTimes = data[indexButton].times[route.params.timeIndex];

    const [timeInputValues, setTimeInputValues] = useState({
        start_time: weekTimes.start_time.slice(0, -3),
        end_time: weekTimes.end_time.slice(0, -3),
        start_interval: weekTimes.start_interval.slice(0, -3),
        end_interval: weekTimes.end_interval.slice(0, -3),
    })
    const [inputErrorStatus, setInputErrorStatus] = useState({
        start_time: false,
        end_time: false,
        start_interval: false,
        end_interval: false,
    })
    const [buttonStatus, setButtonStatus] = useState(Boolean(weekTimes.status))
    const [buttonPressed, setButtonPressed] = useState(false)

    useEffect(()=>{
        if(buttonPressed === true){
            setButtonPressed(false)
            updateTime()
        }
    },[inputErrorStatus])

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

    async function updateTime() {
        if (!Object.values(inputErrorStatus).includes(true)) {
            const response = await fetch(`${env.host}/barber/service-hour`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    time_id: weekTimes.time_id,
                    times: timeInputValues,
                    status: buttonStatus
                })
            })
            
            const json = await response.json()

            if (response.status == 200) {
                Alert.alert('',json.message)
                handlePagination('EmployeeTimeList')
                
            } else {
                Alert.alert('',response.message)
            }
        }
    }

    async function deleteTime() {
        let response = await fetch(`${env.host}/barber/service-hour`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                time_id: weekTimes.time_id
            })
        })
        let json = await response.json()

        if (response.status == 200) {
            Alert.alert('',json.message)
            handlePagination('EmployeeTimeList')
        } else {
            Alert.alert('',response.message)
        }
    }

    function DeleteTimeAlert() {
        return (
            Alert.alert('', 'Deseja excluir o horário?', [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => deleteTime()
                }
            ])
        );
    }

    return (
        <View style={global.container}>
            <ScrollView>
                <Pressable onPress={Keyboard.dismiss}>
                    <View style={global.boxFlexRow}>
                        <Text style={global.textHeaderMiddle}>{data[indexButton].barber_name}</Text>
                        <TouchableOpacity onPress={DeleteTimeAlert}>
                            <Text style={global.label}>Excluir horário</Text>
                        </TouchableOpacity>
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

