import { useService } from '../../contexts/service';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { global } from '../../components/styles/global';
import env from '../../../env.json';

export default function Cart({ navigation }) {
    const { switchState, shoppingCart } = useService()

    async function sendShoppingCart() {
        const response = await fetch(`${env.host}/schedule/available-times`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ servicesId: shoppingCart })
        })

    const json = await response.json()
        
        console.log(json)
        navigation.navigate('ListAvailableTimes')
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
                            Ver horários disponíveis
                        </Text>
                    </TouchableOpacity>
                </>
                :
                <EmptyCart />
            }
        </View>
    );
}
