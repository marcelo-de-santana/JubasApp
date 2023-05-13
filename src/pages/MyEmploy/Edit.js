import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TextAlert from "../../components/TextAlert";
import env from "../../../env.json";
import * as validations from "../../utils/validations";
import * as regx from "../../utils/regularExpressions";

export default function Edit(props) {
    const [data, setData] = useState(props.route.params)
    const [timeValues, setTimeValues] = useState({
        start_time: data.dayInfo.start_time,
        end_time: data.dayInfo.end_time,
        start_interval: data.dayInfo.start_interval,
        end_interval: data.dayInfo.end_interval,
    })
    const [statusButton, setStatusButton] = useState(Boolean(data.dayInfo.status))
    const [statusTime, setStatusTime] = useState({
        start_time: true,
        end_time: true,
        start_interval: true,
        end_interval: true,
    })


    function verifyData() {
        for (let key in timeValues) {
            setStatusTime(prev => ({ ...prev, [key]: regx.time.test(timeValues[key]) }))
        }
        let times = Object.values(statusTime)
        if (!times.includes(false)) {
        } else {
            return
        }

    }
    function sendAlert() {
        return (
            Alert.alert('Excluindo horário', 'Deseja excluir o horário?', [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => deleteBarberTime()
                }
            ])
        );
    }

    async function updateBarberTime(){
        let response = await fetch(`${env.host}/barber/service-hour`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                time_id: data.time_id,
                times: timeValues,
                status: statusButton
            })
            
        })
        if(response.status == 200){
            Alert.alert(response.message)
            props.navigation.navigate('MyEmployeesTimes',{barber_id: data?.barber_id})
        } else {
            Alert.alert(response.message)
        }
    }

    async function deleteBarberTime(){
        let response = await fetch(`${env.host}/barber/service-hour`,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                time_id: data.time_id
            })
        })
        if(response.status == 200){
            Alert.alert('Registro excluído com sucesso')
            props.navigation.navigate('MyEmployeesTimes',{barber_id: data?.barber_id})
        } else {
            Alert.alert(response.message)
        }
    }

    try {
        return (

            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Pressable onPress={Keyboard.dismiss}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: '#000' }}>{data.dayInfo.weekday}</Text>
                            <TouchableOpacity style={{}} onPress={sendAlert}>
                                <Text style={styles.label}>Excluir horário</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Entrada</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholderTextColor="#161c2660"
                            placeholder="07:00"
                            maxLength={5}
                            value={timeValues['start_time']}
                            onChangeText={value => { setTimeValues(prev => ({ ...prev, start_time: validations.time(value) })) }}
                        />
                        {(!statusTime?.start_time) ? <TextAlert error={'*Campo obrigatório'} /> : ''}

                        <Text style={styles.label}>Entrada Intervalo</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholderTextColor="#161c2660"
                            placeholder="11:00"
                            maxLength={5}
                            value={timeValues['start_interval']}
                            onChangeText={value => { setTimeValues(prev => ({ ...prev, start_interval: validations.time(value) })) }}
                        />
                        {(!statusTime?.start_interval) ? <TextAlert error={'*Campo obrigatório'} /> : ''}

                        <Text style={styles.label}>Retorno Intervalo</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholderTextColor="#161c2660"
                            placeholder="12:00"
                            maxLength={5}
                            value={timeValues['end_interval']}
                            onChangeText={value => setTimeValues(prev => ({ ...prev, end_interval: validations.time(value) }))}
                        />
                        {(!statusTime?.end_interval) ? <TextAlert error={'*Campo obrigatório'} /> : ''}

                        <Text style={styles.label}>Saída</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholderTextColor="#161c2660"
                            placeholder="16:00"
                            maxLength={5}
                            value={timeValues['end_time']}
                            onChangeText={value => setTimeValues(prev => ({ ...prev, end_time: validations.time(value) }))}
                        />
                        {(!statusTime?.end_time) ? <TextAlert error={'*Campo obrigatório'} /> : ''}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 40 }}>
                            <Text style={styles.label}>Status</Text>
                            <Switch value={statusButton} onValueChange={setStatusButton} />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => updateBarberTime()}>
                            <Text style={styles.textButton}>Confirmar</Text>
                        </TouchableOpacity>

                    </Pressable>
                </ScrollView>

            </View>

        );
    } catch (error) {
        alert(error)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "#f2f2f2"
    },
    scroll: {
    },
    label: {
        color: '#161c26',
        paddingTop: 5
    },
    input: {
        backgroundColor: '#ccced9',
        borderRadius: 6,
        borderWidth: 1,
        color: '#000000',
        height: 40,
        paddingLeft: 10,

    },
    button: {
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 20,
    },
    textButton: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 18
    },
})