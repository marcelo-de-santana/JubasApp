import { createStackNavigator } from "@react-navigation/stack";
import UsersList from "../screens/Users/UsersList";

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
            <Stack.Screen name='UsersList' component={UsersList} options={{ title: 'Gerenciar de usuários' }} />

        </Stack.Navigator>
    );
}