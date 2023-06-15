import { Text, TouchablOpacity, View } from "react-native";
import {global} from "../../components/styles/global";
import UnderConstruction from "../../components/UnderConstruction";

export default function UsersList({ navigation }) {
    return (
        <View style={global.container}>
            <Text style={global.blackTextLargeCenter}>Listagem de todos os usuários</Text>
        
        <UnderConstruction/>
        </View>
    );
}