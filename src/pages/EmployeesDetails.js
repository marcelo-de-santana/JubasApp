import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function EmployeesDetails(props) {
    const [data, setData] = useState(props.route.params);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.textTitle}>{data.barber_name}</Text>
                <View style={styles.boxTimes}>
                    <View style={styles.boxHeader}>
                        <Text style={styles.textHeader}>{data.weekday}</Text>
                        <TouchableOpacity><Text style={styles.textHeader}>Editar</Text></TouchableOpacity>
                    </View>
                    <View style={styles.boxDetails}>
                        <Text style={styles.textDetails}>
                            Entrada{'\n'}
                            {data.start_time.slice(0, -3)}
                        </Text>
                        <Text style={styles.textDetails}>
                            E. Inter.{'\n'}
                            {data.start_interval.slice(0, -3)}
                        </Text>
                        <Text style={styles.textDetails}>
                            R. Inter.{'\n'}
                            {data.end_interval.slice(0, -3)}
                        </Text>
                        <Text style={styles.textDetails}>
                            Saída{'\n'}
                            {data.end_time.slice(0, -3)}
                        </Text>
                        <Text style={styles.textDetails}>
                            Status{'\n'}
                            {data.status == 1 ? 'Ativo' : 'Inativo'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.insertButton}
                onPress={() => {props.navigation.navigate('EmployeesTimeForm',data)}}
            >
                <Text style={styles.textInsertButton}>Inserir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    scroll:{
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
    insertButton:{
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
    },
    textInsertButton:{
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center'
    }
})