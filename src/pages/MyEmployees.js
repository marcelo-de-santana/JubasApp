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
                    <>
                        <Text style={{ color: '#000000' }}>
                            {item.nome}

                        </Text>
                    </>

                ))}

            </>

        );
    }
    return (
        <UnderConstruction />
    );
}