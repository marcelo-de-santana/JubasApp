import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import DrawerScreens from './Drawer';

const Stack = createStackNavigator();

export default function StackScreens() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
				<Stack.Screen name="SignUp" component={SignUp}
					options={{
						title: 'Cadastre-se',
						headerStyle: {
							backgroundColor: "#3c4659"
						},
						headerTintColor: '#ffffff'
					}} />
				<Stack.Screen name="Schedule" component={DrawerScreens} options={{ headerShown: false }} />
			</Stack.Navigator>

		</NavigationContainer>
	);
}
