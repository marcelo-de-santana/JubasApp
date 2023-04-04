import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import env from "../../env.json";
import UnderConstruction from "./UnderConstruction";

export default function PriceList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${env.host}/schedule/services-by-category`)
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    if (data != null) {
        return (
            <>
                {data.map((item) => (
                    <>
                        <Text style={{ color: '#000000' }}>
                            {item.nome_servico}
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