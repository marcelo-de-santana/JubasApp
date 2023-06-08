import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ServiceBookScreens from './ServiceBookScreens';

const Stack = createStackNavigator();

export default function StackScreens() {
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{
			headerStyle: {
				backgroundColor: "#3c4659"
			},
			headerTintColor: '#fff'
		}}>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Cadastre-se' }} />
			<Stack.Screen name="Main" component={ServiceBookScreens} options={{ headerShown: false }} />
		</Stack.Navigator>

	);
}

