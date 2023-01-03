import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BarberList({ data }) {

    return (

        (data != null) ?
            <ScrollView>

                {data.map(item => (

                    <View key={item.id} style={{ paddingBottom: 10 }}>

                        <Text style={{ color: "white", fontSize: 20, paddingLeft: 15, paddingBottom: 4 }}>{item.name}</Text>

                        <View style={{ backgroundColor: "grey", borderRadius: 10, flexDirection: "row", flexWrap: 'wrap', marginHorizontal: 10, padding: 12 }}>

                            {item.available_times.map((v) => (
                                <Text key={v} style={{ color: "white", fontSize: 20, paddingHorizontal: 4 }}>{v.substr(0, 5)}</Text>
                            ))}

                        </View>
                    </View>

                ))}
            </ScrollView>

            :

            <View style={{ alignItems: "center", height: "70%", justifyContent: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Agenda Indiponível</Text>
            </View>

    )

}