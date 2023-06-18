import { Text, TouchableOpacity, View } from "react-native";
import { global, modal } from "../../components/styles/global";

export default function UsersList({ data, openModal }) {
    const { cpf, name, email, birthday, status_registration, description, phone, } = data;

    return (
        <View style={global.blueBoxItems}>
            <View style={global.boxFlexRow}>
                <Text style={global.whiteTextMiddle}>{name}</Text>
                <TouchableOpacity onPress={() => openModal(data)}>
                    <Text style={global.whiteTextSmall}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View style={global.greyBox}>
                <View style={{width: '50%', alignItems:'flex-start',  justifyContent:'center'}}>
                <Text style={global.darkBlueTextSmallCenter}>CPF: {cpf}</Text>
                <Text style={global.darkBlueTextSmallCenter}>E-mail: {email}</Text>
                <Text style={global.darkBlueTextSmallCenter}>Telefone: {phone}</Text>
                <Text style={global.darkBlueTextSmallCenter}>Aniversário: {birthday}</Text>
                </View>
                <View style={{width: '50%', alignItems:'flex-end', justifyContent:'center'}}>
                <Text style={global.darkBlueTextSmallCenter}>Nível{`\n${description}`}</Text>
                <Text style={global.darkBlueTextSmallCenter}>Status{`\n${status_registration ? "Ativo" : "Inativo"}`}</Text>
                </View>
            </View>
        </View>
    );
}