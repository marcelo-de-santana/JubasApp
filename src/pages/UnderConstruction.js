import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function UnderConstruction() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Essa página está em construção</Text>
            <Image source={{uri:'https://i.pinimg.com/originals/ce/d2/d0/ced2d0cc1832708a6a1ee95df0e285a1.gif'}} style={styles.image} />
            <Text style={styles.description}>
                Desculpe pelo transtorno, estamos trabalhando para melhorar sua experiência.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 556,
        height: 417,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color:'#000000',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color:'#000000',
        textAlign: 'center',
        marginHorizontal: 20,
    },
});

