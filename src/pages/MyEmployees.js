import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import env from "../../env.json";
import LoadScreen from "../components/LoadingScreen"

export default function MyEmployees({ navigation }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${env.host}/barber/service-hour`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.log(error))
    }, [])

    try {

        if (data?.length > 0) {
            return (
                <ScrollView style={styles.scrollBox}>
                    {data.map((value) => (
                        <TouchableOpacity
                            style={styles.buttonBox}
                            onPress={() => navigation.navigate('EmployeesTimes', value)}
                        >
                            <Text style={styles.text}>
                                {value.barber_name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            );
        }
        return (
            <LoadScreen />
        );
    } catch (error) {
        console.log(error)
    }
}

const styles = StyleSheet.create({
    scrollBox: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    buttonBox: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#9ba7bf',
        borderRadius: 6,
    },
    text: {
        color: "#ffffff",
        fontSize: 18,
    },
})