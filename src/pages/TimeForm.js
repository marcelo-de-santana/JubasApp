import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import LoadingScreen from "../components/LoadingScreen"
import env from "../../env.json"

export default function TimeForm(props) {
    const [data, setData] = useState(props.route.params)
    const [week, setWeek] = useState(null)
    const [statusTimeButton, setStatusTimeButton] = useState({})

    useEffect(() => {
        fetch(`${env.host}/barber/week`)
            .then(response => response.json())
            .then(json => setWeek(json))
    }, [])

    function SelectionForm() {
        return (
            week.map((item, index) => (
                <View
                    key={index}
                    style={styles.boxForm}>
                    <Text style={styles.textWeek}>{item.day}</Text>
                    <Switch
                        value={statusTimeButton[item.id]}
                        onChange={() => { setStatusTimeButton(prevState => ({ ...prevState, [item.id]: !statusTimeButton[item.id] })) }}
                        disabled={(data.times.find(value => (item.day == value.weekday))) ? true : false}
                    />

                </View>
            ))
        )
    }

    if (data != null) {
        return (

            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Pressable onPress={Keyboard.dismiss}>

                        <Text style={styles.textTitle}>Quais dias deseja cadastrar?</Text>

                        {(week != null) ?
                            <SelectionForm />
                            :
                            <LoadingScreen />
                        }

                        <TouchableOpacity style={styles.button} onPress={() => {props.navigation.push('DailyForm',{barber_id:data['barber_id'],times:statusTimeButton},) }}>
                            <Text style={styles.textButton}>Confirmar</Text>
                        </TouchableOpacity>

                    </Pressable>
                </ScrollView>
            </View >
        );
    }
    return (
        <LoadingScreen />
    )

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
    boxForm: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textWeek: {
        fontSize: 16,
        color:'#3c4659'
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