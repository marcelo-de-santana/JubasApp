import { useEmployee } from "../../../contexts/employee";
import LoadScreen from "../../../components/LoadingScreen";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { global } from "../../../components/styles/global";

export default function ActiveEmployees() {
    const { data, handleBarberTimes, loading } = useEmployee();

    if (loading) {
        return (
            <LoadScreen />
        );
    }
    return (
        <ScrollView style={global.container}>
            <Text style={global.textHeaderMiddle}>
                Barbeiros ativos
            </Text>
            {data.map((value, index) => (
                <View key={index}>
                    <TouchableOpacity style={global.blueBoxItems} onPress={() => handleBarberTimes(index)}>
                        <Text style={global.whiteTextMiddle}>
                            {value.barber_name}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );

}
