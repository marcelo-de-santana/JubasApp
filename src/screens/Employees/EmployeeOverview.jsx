import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import { useEmployee } from "../../contexts/employee";

export default function EmployeeOverview({ navigation }) {
    const { data, indexButton } = useEmployee();

    return (
        <View style={global.container}>
            <ScrollView>
                <TouchableOpacity style={global.blueBoxItems} onPress={() => navigation.push('EmployeeTimeList')}>
                    <Text style={global.whiteTextMiddle}>Ver horários</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={global.blueBoxItems} onPress={() => navigation.push('SpecialtiesEmployee', { barberId: data[indexButton].barber_id })}>
                    <Text style={global.whiteTextMiddle}>Ver especialidades</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}