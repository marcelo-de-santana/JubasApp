import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import env from "../../env.json";
import UnderConstruction from "./UnderConstruction";

export default function MyEmployees() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${env.host}/barber`)
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    if (data != null) {
        return (
            <>
                {data.map(item => (
                    <View style={{
                        marginTop:10,
                        padding: 10,
                        backgroundColor: '#9ba7bf',
                        borderRadius: 10,
                        marginHorizontal: 10,

                    }}>
                        <Text key={item.id} style={{
                            color: "#ffffff",
                            fontSize: 14,
                            paddingLeft: 15,
                            paddingBottom: 4
                        }}>
                            {item.nome}

                        </Text>
                    </View>

                ))}

            </>

        );
    }
    return (
        <UnderConstruction />
    );
}