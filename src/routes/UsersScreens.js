import { createStackNavigator } from "@react-navigation/stack";
import UsersMainScreen from "../screens/Users/UsersMainScreen";

const Stack = createStackNavigator();

export default function UsersScreens() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: 'Gerenciar de usuários',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: "#3C4659"
            }
        }}>
            <Stack.Screen name='UsersMainScreen' component={UsersMainScreen} options={{ title: 'Gerenciar de usuários' }} />
        </Stack.Navigator>
    );
}