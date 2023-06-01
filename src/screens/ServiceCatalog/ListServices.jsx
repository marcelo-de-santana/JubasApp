import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import { useCatalog } from "../../contexts/catalog";

export default function ListServices({ navigation, route }) {
    const { specialties, categoryIndex } = useCatalog();

    return (
        <View style={global.container}>
            <ScrollView style={{height: '94%'}}>
            <Text style={global.textHeader}>{specialties[categoryIndex].category_name}</Text>

            {specialties?.[categoryIndex]?.services.map(item => (
                <View key={item.service_id} style={global.blueBoxItems}>
                    <Text style={global.whiteTextSmall}>
                        {item.service_name}
                    </Text>
                </View>
            ))}
            </ScrollView>
            <TouchableOpacity style={global.button}>
                <Text style={global.textButton}>Adicionar Serviço</Text>
            </TouchableOpacity>
        </View>

    );
}