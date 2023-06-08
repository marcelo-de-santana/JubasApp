import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {

    return (
        <View style={styles.container}>
            <ActivityIndicator color='#3c4659' size="large" />
            <Text style={styles.text}>Carregando...</Text >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color:'grey'
    },
})