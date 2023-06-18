import { useAuth } from "../contexts/auth";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { global } from "../components/styles/global";

export default function Main({ navigation }) {
    const { user } = useAuth();

    function AdminModules() {
        return (
            <>
                <TouchableOpacity style={global.boxMenu} onPress={() => alert('Módulo em construção')}>
                    <Text style={global.textMenu}>Gerenciar agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('ServiceCatalogScreens')}>
                    <Text style={global.textMenu}>Gerenciar catálogo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('EmployeesScreens')}>
                    <Text style={global.textMenu}>Gerenciar barbeiros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('UsersScreens')}>
                    <Text style={global.textMenu}>Gerenciar usuários</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global.boxMenu} onPress={()=> alert('Módulo em construção')}>
                        <Text style={global.textMenu}>Gerenciar pagamentos</Text>
                    </TouchableOpacity>
            </>
        );
    }

    Alert.alert('', `Seja Bem-Vindo ${user.NAME}`)
    return (
        <View style={global.container}>
            <ScrollView>
                <View style={global.boxFlexRow}>
                    <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('ServiceBookScreens')}>
                        <Text style={global.textMenu}>Ver agenda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={global.boxMenu} onPress={() => navigation.navigate('MyAccount')}>
                        <Text style={global.textMenu}>Minha conta</Text>
                    </TouchableOpacity>
                    {user.LEVEL === 1 && <AdminModules />}
                    <TouchableOpacity style={global.boxMenu} onPress={()=> alert('Módulo em construção')}>
                        <Text style={global.textMenu}>Minhas compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={global.boxMenu} onPress={()=> alert('Módulo em construção')}>
                        <Text style={global.textMenu}>Promoções</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}