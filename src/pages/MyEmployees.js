import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from "react-native";
import env from "../../env.json";
import LoadScreen from "../components/LoadingScreen"

export default function MyEmployees({ navigation }) {
    const [data, setData] = useState(null);

    console.log(data)

    useEffect(() => {
        fetch(`${env.host}/barber/`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => {
		setData(rt)
		console.log(error)
	    })
    }, [])

    if (data != null) {
        return (
            <ScrollView style={styles.scrollBox}>
                {data.map((value,index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.buttonBox}
                            onPress={() => navigation.push('MyEmployeesTimes',{barber_id: value.barber_id})}
                        >
                            <Text style={styles.text}>
                                {value.barber_name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        );
    } else {
        return (
            <LoadScreen />
        );
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
