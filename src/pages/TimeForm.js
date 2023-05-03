import React, { useState } from "react";
import { Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView ,Switch, TextInput} from "react-native";


export default function TimeForm(props) {
    const [data, setData] = useState(props.route.params)

    const weekday = [
        {
            day_id: 1,
            weekday: 'Monday'
        },
        {
            day_id: 2,
            weekday: 'Tuesday'
        },
        {
            day_id: 3,
            weekday: 'Wednesday'
        },
        {
            day_id: 4,
            weekday: 'Thursday'
        },
        {
            day_id: 5,
            weekday: 'Friday'
        }
    ]

    try {
        return (


            <View style={styles.container}>
                <ScrollView style>
                    <Pressable onPress={Keyboard.dismiss} style={styles.container}>

                        <Text style={styles.label}>{data.barber_name}</Text>
                        <View style={styles.boxForm}>

                            <Text style={styles.label}>Quais dias deseja cadastrar?</Text>

                            {weekday.map((i) => (
                                <TouchableOpacity>
                                    <View
                                    >
                                        <Text>{i.weekday}</Text>
                                        <Switch
                                            value={(data.weekday == i.weekday)? false : true}
                                            
                                        />
                                    </View>
                                </TouchableOpacity>

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
    } catch (error) {
        console.log(error)
    }
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    boxForm: {
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