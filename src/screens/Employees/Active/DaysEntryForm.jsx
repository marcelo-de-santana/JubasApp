import React, { useEffect, useState } from "react";
import { useEmployee } from "../../../contexts/employee"
import { Alert, Keyboard, Pressable, StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import LoadingScreen from "../../../components/LoadingScreen"
import env from "../../../../env.json"
import d from "../../../services/api/barberWeek.json"

export default function DaysEntryForm({navigation}) {
    const { data, week, indexButton, loading } = useEmployee()
    const [buttonDayStatus, setButtonDayStatus] = useState([])

    function handlePage() {
        //ATRIBUINDO A VARIÁVEL APENAS OS BOTÕES COM VALOR STATUS VERDADEIRO
        let trueDayId = Object.keys(buttonDayStatus)
            .filter(key => buttonDayStatus[key].status == true)
            .map(keyId => keyId)
        //VERIFICA SE EXISTE ALGUM DIA SELECIONADO
        if(trueDayId.length == 0){
            Alert.alert('','Selecione ao menos um dia!')
        } else {
            navigation.push('EmployeesTimetableEntryForm', trueDayId)
        }
    }

    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Pressable onPress={Keyboard.dismiss}>

                    <Text style={styles.textTitle}>
                        {data[indexButton].barber_name}{'\n'}
                        Dias em que estará disponível
                    </Text>
                    {week?.map((item, index) => (
                        <View
                            key={index}
                            style={styles.boxForm}>
                            <Text style={styles.textWeek}>{item.day}</Text>
                            <Switch
                                disabled={(data[indexButton].times?.find(value => (item.day == value.weekday)) && true)}
                                value={buttonDayStatus[item.id]?.status}
                                onChange={() => {
                                    setButtonDayStatus(prevState => (
                                        {
                                            ...prevState,
                                            [item.id]: {
                                                "dayId": [item.id],
                                                "status": !buttonDayStatus[item.id]?.status
                                            }
                                        }))
                                }}
                            />

                        </View>
                    ))
                    }
                    <TouchableOpacity style={styles.button} onPress={() => handlePage()}>
                        <Text style={styles.textButton}>Confirmar</Text>
                    </TouchableOpacity>

                </Pressable>
            </ScrollView>
        </View >
    );

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
        textAlign: "justify"
    },
    boxForm: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textWeek: {
        fontSize: 16,
        color: '#3c4659'
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
