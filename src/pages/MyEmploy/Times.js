import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import env from "../../../env.json";
import LoadignScreen from "../../components/LoadingScreen"

export default function Times(props) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`${env.host}/barber/${props.route.params.barber_id}/service-hour`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.log(error))
    }, [])

    if (data != null) {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>

                    <Text style={styles.textTitle}>{data[0]?.barber_name}</Text>

                    {data[0]?.times.map((item, index) => (
                        <View style={styles.boxTimes} key={item.weekday}>

                            <View style={styles.boxHeader}>
                                <Text style={styles.textHeader}>{item.weekday}</Text>
                                <TouchableOpacity
                                    onPress={() => { props.navigation.navigate('EditForm', { time_id: data[0].time_id, dayInfo: data[0].times[index] }) }}
                                >
                                    <Text style={styles.textHeader}>Editar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.boxDetails}>
                                <Text style={styles.textDetails}>
                                    Entrada{'\n'}
                                    {item.start_time.slice(0, -3)}
                                </Text>
                                <Text style={styles.textDetails}>
                                    E. Inter.{'\n'}
                                    {item.start_interval.slice(0, -3)}
                                </Text>
                                <Text style={styles.textDetails}>
                                    R. Inter.{'\n'}
                                    {item.end_interval.slice(0, -3)}
                                </Text>
                                <Text style={styles.textDetails}>
                                    Saída{'\n'}
                                    {item.end_time.slice(0, -3)}
                                </Text>
                                <Text style={styles.textDetails}>
                                    Status{'\n'}
                                    {item.status == 1 ? 'Ativo' : 'Inativo'}
                                </Text>
                            </View>

                        </View>

                    ))}


                </ScrollView>
                <TouchableOpacity style={styles.insertButton}
                    onPress={() => { props.navigation.push('TimeForm', { barber_id: data[0]?.barber_id, times: data[0]?.times }) }}>
                    <Text style={styles.textInsertButton}>Inserir</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <LoadignScreen />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    scroll: {
        height: '90%'
    },
    textTitle: {
        color: "#000000",
        fontSize: 18,
    },
    boxTimes: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#9ba7bf',
        borderRadius: 6,
    },
    boxHeader: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    textHeader: {
        color: "#ffffff",
        fontSize: 16,
    },
    boxDetails: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: '#ccced9',
        borderRadius: 6,
    },
    textDetails: {
        color: "#161c26",
        fontSize: 14,
        textAlign: 'center'
    },
    insertButton: {
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
    },
    textInsertButton: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center'
    }
})