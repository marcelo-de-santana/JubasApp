import { useService } from '../../contexts/service';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { global } from '../../components/styles/global';
import env from '../../../env.json';
import { useAuth } from '../../contexts/auth';

export default function Cart({ navigation }) {
    const { user } = useAuth();
    const { switchState, shoppingCart, serviceParams } = useService();
    const { barberId, dayId, time } = serviceParams;

    async function sendShoppingCart() {
        const response = await fetch(`${env.host}/schedule/register-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.ID,
                barber_id: barberId,
                services_id: shoppingCart,
                day_id: dayId,
                time: time
            })
        })
        const json = await response.json()
        Alert.alert('', json.message)
        navigation.navigate('Schedule')
    }

    function EmptyCart() {
        return (
            <View style={global.blueBoxItems}>
                <Text style={global.whiteTextSmallCenter}>Carrinho Vazio</Text>
            </View>
        );
    }

    return (
        <View style={global.container}>
            <Text style={global.textHeader}>Meu carrinho</Text>
            {shoppingCart.length > 0 ?
                <>
                    <ScrollView style={global.blueBoxItems}>
                        {shoppingCart.map((item, index) => {
                            return (
                                <Text key={index} style={global.whiteTextSmall}>
                                    {switchState[item].serviceName}
                                </Text>
                            );
                        })}
                    </ScrollView>
                    <TouchableOpacity style={global.button} onPress={() => sendShoppingCart()}>
                        <Text style={global.textButton}>
                            Finalizar agendamento
                        </Text>
                    </TouchableOpacity>
                </>
                :
                <EmptyCart />
            }
        </View>
    );
}
