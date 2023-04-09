import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import DrawerScreens from './Drawer';
import About from '../pages/About';
import Appointment from '../pages/Appointment';
import PriceList from '../pages/PriceList';

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
				<Stack.Screen name="Appointment" component={Appointment}
					options={{
						title: 'Agendamento',
						headerStyle: {
							backgroundColor: "#3c4659"
						},
						headerTintColor: '#ffffff'
					}} />
				<Stack.Screen name="PriceList" component={PriceList}
					options={{
						title: 'Lista de Serviços',
						headerStyle: {
							backgroundColor: "#3c4659"
						},
						headerTintColor: '#ffffff'
					}} />
				<Stack.Screen name="About" component={About} />
			</Stack.Navigator>

		</NavigationContainer>
	);
}
