import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import env from "../../env.json";

export default function DailyForm(props) {

    const [data, setData] = useState(props.route.params)
    const [stateTimes, setStateTimes] = useState({ status: false })

    async function sendData() {
        let params = []
        for (let id in data.times) {
            params.push({
                barber_id: data.barber_id,
                weekday: id,
                start_time: stateTimes.start_time,
                end_time: stateTimes.end_time,
                start_interval: stateTimes.start_interval,
                end_interval: stateTimes.end_interval,
                status: Number(stateTimes.status)
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
        if(response.status != 200){
            alert(json.message)
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
                        value={stateTimes['start_time']}
                        onChangeText={value => { setStateTimes(prev => ({ ...prev, start_time: value })) }}
                    />
                    <Text style={styles.label}>Entrada Intervalo</Text>
                    <TextInput style={styles.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="11:00"
                        maxLength={5}
                        value={stateTimes['start_interval']}
                        onChangeText={value => setStateTimes(prev => ({ ...prev, start_intervalo: value }))}
                    />
                    <Text style={styles.label}>Retorno Intervalo</Text>
                    <TextInput style={styles.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="12:00"
                        maxLength={5}
                        value={stateTimes['end_interval']}
                        onChangeText={value => setStateTimes(prev => ({ ...prev, end_interval: value }))}
                    />
                    <Text style={styles.label}>Saída</Text>
                    <TextInput style={styles.input}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#161c2660"
                        placeholder="16:00"
                        maxLength={5}
                        value={stateTimes['end_time']}
                        onChangeText={value => setStateTimes(prev => ({ ...prev, end_time: value }))}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 40 }}>
                        <Text style={styles.label}>Status</Text>
                        <Switch value={stateTimes.status} onChange={() => { setStateTimes(prev => ({ ...prev, status: !stateTimes.status })) }} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => sendData()}>
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