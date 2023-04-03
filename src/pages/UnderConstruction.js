import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function UnderConstruction() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/under-construction.gif')} style={styles.image} />
            <Text style={styles.title}>Essa página está em construção</Text>
            <Text style={styles.description}>
                Desculpe pelo transtorno, estamos trabalhando para melhorar sua experiência.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 357,
        height: 220,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
    },
});

