import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import MainScreen from '../screens/Main';
import ServiceBookScreens from './ServiceBookScreens';
import CatalogScreen from './CatalogScreens';
import EmployeesScreen from './EmployeesScreens';

const Stack = createStackNavigator();

export default function StackScreens() {
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{
			headerStyle: {
				backgroundColor: "#3C4659"
			},
			headerTintColor: '#fff'
		}}>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Cadastre-se' }} />
			<Stack.Screen name="Main" component={MainScreen} options={{ headerTitle: 'Jubas Barbearia', headerTitleAlign: 'center', headerLeft: false }} />
			<Stack.Screen name="ServiceBook" component={ServiceBookScreens} options={{ headerShown: false }} />
			<Stack.Screen name="CatalogScreen" component={CatalogScreen} options={{ headerShown: false }} />
			<Stack.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: false }} />
		</Stack.Navigator>

	);
}

