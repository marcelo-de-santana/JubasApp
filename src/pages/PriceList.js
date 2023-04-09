import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import env from "../../env.json";
import LoadingScreen from "../components/LoadingScreen";
import SwitchButton from "../components/SwitchButton";

export default function PriceList() {
    const [priceListData, setPriceListData] = useState(null);

    useEffect(() => {
        fetch(`${env.host}/schedule/services-by-category`)
            .then(response => response.json())
            .then(json => setPriceListData(json))
            .catch(err => console.log(err))
    }, [])

    return (
        <FlatList
            data={priceListData}
            keyExtractor={(item) => item.category_id.toString()}
            ListEmptyComponent={<View style={styles.emptyListContainer}>
            <LoadingScreen />
          </View>}
            renderItem={({ item }) => (

                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{item.category_name}</Text>

                    <View style={styles.servicesContainer}>

                        {item.name_services.map((service) => (
                            <View style={{flexDirection:"row",justifyContent:"space-between",}}>
                            <Text key={service.service_id} style={styles.serviceTitle}>
                                {service.service_name}
                            </Text>
                            <SwitchButton/>
                            </View>
                        ))}
                        
                    </View>

                </View>

            )}
        />
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginTop: 5,
        paddingHorizontal: 10,
    },
    categoryTitle: {
        color:'#000000',
        fontSize: 14,
        paddingLeft: 5,
        marginBottom: 4,
    },
    servicesContainer: {
        backgroundColor: "#9ba7bf",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    serviceTitle: {
        color: "#ffffff",
        fontSize: 14,
        marginBottom: 3,
    },
    emptyListContainer: {
        marginTop: "82%",
      },
})