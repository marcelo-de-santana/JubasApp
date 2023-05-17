import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import TextAlert from "../../components/TextAlert"
import env from "../../../env.json";
import validations from "../../utils/inputValidations";
import * as regx from "../../utils/regularExpressions"

export default function Insert(props) {

    const [data, setData] = useState(props.route.params)
    const [timeValues, setTimeValues] = useState({
        start_time: '07:00',
        end_time: '17:00',
        start_interval: '11:00',
        end_interval: '12:00',
        status: false
    })

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
        let times = (Object.values(statusTime))
        if (times.includes(false)) {
            return
        }
        sendData()
    }

    async function sendData() {
        let params = []
        for (let id in data.times) {
            params.push({
                barber_id: data.barber_id,
                weekday: id,
                start_time: timeValues.start_time,
                end_time: timeValues.end_time,
                start_interval: timeValues.start_interval,
                end_interval: timeValues.end_interval,
                status: Number(timeValues.status)
            })
        }
        const response = await fetch(`${env.host}/barber/service-hour`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        const json = await response.json()
        if (response.status != 201) {
            alert(json.message)
        } else {
            props.navigation.navigate('MyEmployeesTimes',{barber_id: data?.barber_id})
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Pressable onPress={Keyboard.dismiss}>
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
                        <Switch value={timeValues.status} onChange={() => { setTimeValues(prev => ({ ...prev, status: !timeValues.status })) }} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => verifyData()}>
                        <Text style={styles.textButton}>Confirmar</Text>
                    </TouchableOpacity>
                </Pressable>
            </ScrollView>

        </View>
    )

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
        color:'#000000',
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