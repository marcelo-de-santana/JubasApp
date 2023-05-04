import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import LoadingScreen from "../components/LoadingScreen"
import env from "../../env.json"

export default function TimeForm(props) {
    const [data, setData] = useState(props.route.params)
    const [week, setWeek] = useState(null)
    const [statusButton, setStatusButton] = useState(null)

    useEffect(() => {
        fetch(`${env.host}/barber/week`)
            .then(response => response.json())
            .then(json => setWeek(json)),
            () => {
                if (week != null) {
                    week.forEach((value, index) => (
                        setStatusButton[index] = false
                    ))
                }

            }
    }, [])



    try {
        if (data != null) {
            return (


                <View style={styles.container}>
                    <ScrollView style={styles.scroll}>
                        <Pressable onPress={Keyboard.dismiss}>

                            <Text style={styles.textTitle}>{data.barber_name}</Text>
                            <View style={styles.boxForm}>

                                <Text style={styles.label}>Quais dias deseja cadastrar?</Text>

                                {week.map((item, index) => (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => { setStatusButton[index](!statusButton[index]) }}
                                        >
                                            <View>
                                                <Text>{item.day}</Text>
                                                <Switch
                                                    value={statusButton}
                                                    onChange={() => { setStatusButton(!statusButton) }}
                                                    disabled={(data.times.find(value => (item.day == value.weekday))) ? true : false}

                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ))}
                                {/*
                            <Text style={styles.label}>Entrada</Text>
                            <TextInput style={styles.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                maxLength={8}
                                value={''}
                                onChangeText={''}
                            />
                            <Text style={styles.label}>Entrada Intervalo</Text>
                            <TextInput style={styles.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                maxLength={8}
                                value={''}
                                onChangeText={''}
                            />
                            <Text style={styles.label}>Retorno Intervalo</Text>
                            <TextInput style={styles.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                maxLength={8}
                                value={''}
                                onChangeText={''}
                            />
                            <Text style={styles.label}>Saída</Text>
                            <TextInput style={styles.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                maxLength={8}
                                value={''}
                                onChangeText={''}
                            />
                            <Text style={styles.label}>Status</Text>
                            <TextInput style={styles.input}
                                keyboardType="decimal-pad"
                                placeholderTextColor="#161c2660"
                                maxLength={8}
                                value={''}
                                onChangeText={''}
                            />
                            */}
                            </View>
                        </Pressable>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <LoadingScreen />
            )
        }
    } catch (error) {
        console.log(error)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    scroll: {
    },
    textTitle: {
        color: "#000000",
        fontSize: 18,
    },
    input: {
        backgroundColor: '#ccced9',
        borderRadius: 6,
        borderWidth: 1,
        height: 40,
        paddingLeft: 10,
    },
    phoneAlert: {

        fontSize: 12,
        color: '#161c26'
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