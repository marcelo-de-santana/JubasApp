import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import env from "../../env.json";
import UnderConstruction from "./UnderConstruction";

export default function MyEmployees() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${env.host}/barber/service-hour`)
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    if (data?.length > 0) {
        return (
            <View style={{
                marginVertical: 10,
                marginHorizontal: 10,
            }}>
                <ScrollView>
                    {data.map(item => (
                        <View
                            key={item.barber_id}
                            style={{
                                marginVertical: 5,
                                padding: 10,
                                backgroundColor: '#9ba7bf',
                                borderRadius: 6,
                            }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between'
                            }}>
                                <Text style={styles.textHeader}>
                                    {item.barber_name}
                                </Text>
                                <TouchableOpacity
                                    key={item.barber_id}
                                ><Text style={styles.textButtonEdit}>Editar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                marginTop: 5,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                backgroundColor: '#ccced9',
                                borderRadius: 6,
                            }
                            }>
                                <Text style={styles.textDetails}>
                                    Entrada{'\n'}
                                    {item.start_time}
                                </Text>
                                <Text style={styles.textDetails}>
                                    Saída{'\n'}
                                    {item.end_time}
                                </Text>
                                <Text style={styles.textDetails}>
                                    I. Entrada{'\n'}
                                    {item.start_interval}
                                </Text>
                                <Text style={styles.textDetails}>
                                    I. Retorno{'\n'}
                                    {item.end_interval}
                                </Text>
                            </View>
                        </View>

                    ))}
                </ScrollView>
            </View>

        );
    }
    return (
        <UnderConstruction />
    );
}

const styles = StyleSheet.create({
    textHeader: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 'bold'
    },
    textButtonEdit: {
        color: "#ffffff",
        fontSize: 16,
    },
    textDetails: {
        color: "#161c26",
        fontSize: 18,
        textAlign: 'center',

    }
})