import { useAuth } from "../contexts/auth";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { global } from "../components/styles/global";

export default function MainScreen({ navigation }) {
    const { user } = useAuth();

    function AdminModules() {
        return (
            <>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('CatalogScreen')}>
                    <Text style={global.textMenu}>Gerenciar catálogo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('EmployeesScreen')}>
                    <Text style={global.textMenu}>Gerenciar barbeiros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('EmployeesScreen')}>
                    <Text style={global.textMenu}>Gerenciar usuários</Text>
                </TouchableOpacity>
            </>
        );
    }

    Alert.alert('', `Seja Bem-Vindo ${user.NAME}`)
    return (
        <View style={global.container}>
            <ScrollView>
                <View style={global.boxFlexRow}>
                    <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('ServiceBook')}>
                        <Text style={global.textMenu}>Ver agenda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={global.boxMenu}>
                        <Text style={global.textMenu}>Minha conta</Text>
                    </TouchableOpacity>
                    {user.LEVEL === 1 || <AdminModules />}
                    <TouchableOpacity style={global.boxMenu}>
                        <Text style={global.textMenu}>Minhas compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={global.boxMenu}>
                        <Text style={global.textMenu}>Promoções</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

styles = StyleSheet.create({

})