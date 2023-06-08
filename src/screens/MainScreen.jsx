import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { global } from "../components/styles/global";

export default function MainScreen({ navigation }) {
    return (
        <View style={global.container}>
            <Text>Seja Bem-vindo</Text>
            <ScrollView>
                <View style={global.boxFlexRow}>

                    <TouchableOpacity style={styles.boxMenu} onPress={()=> navigation.navigate('Schedule')}>
                        <Text style={styles.textMenu}>Ver agenda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu}>
                        <Text style={styles.textMenu}>Gerenciar catálogo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu}>
                        <Text style={styles.textMenu}>Gerenciar funcionários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu}>
                        <Text style={styles.textMenu}>Minha conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu}>
                        <Text style={styles.textMenu}>Minhas compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu}>
                        <Text style={styles.textMenu}>Promoções</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

styles = StyleSheet.create({
    boxMenu: {
        backgroundColor: '#9BA7BF',
        borderRadius: 6,
        height: 60,
        justifyContent: 'center',
        margin: 5,
        width: '45%'
    },
    textMenu: {
        color: 'white',
        textAlign: 'center'
    }
})