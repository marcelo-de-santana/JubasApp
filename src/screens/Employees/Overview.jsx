import { Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";

export default function EmployeeOverview({ navigation }) {
    return (
        <View style={global.container}>
            <View style={global.boxFlexRow}>
                <TouchableOpacity style={global.boxMenu} onPress={() => navigation.push('EmployeeTimetable')}>
                    <Text style={global.textMenu}>Ver horários</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={global.boxMenu} onPress={() => navigation.push('EmployeeSpecialties')}>
                    <Text style={global.textMenu}>Ver especialidades</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}