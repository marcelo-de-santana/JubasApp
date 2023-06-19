import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Main from '../screens/Main';
import RecoverPassword from '../screens/RecoverPassword';
import EmployeesScreens from './EmployeesScreens';
import ServiceBookScreens from './ServiceBookScreens';
import ServiceCatalogScreens from './ServiceCatalogScreens';
import UsersScreens from './UsersScreens';
import MyAccount from '../screens/MyAccount';
import ScheduleManagementMainScreen from '../screens/ScheduleManagement/MainScreen';

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
			<Stack.Screen name="Main" component={Main} options={{ headerTitle: 'Jubas Barbearia', headerTitleAlign: 'center', headerLeft: false }} />
			<Stack.Screen name="MyAccount" component={MyAccount} options={{ headerTitle: 'Minha conta'}} />
			<Stack.Screen name="ScheduleManagement" component={ScheduleManagementMainScreen} options={{ headerTitle: 'Gerenciar agenda'}} />
			<Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{ headerTitle: 'Recuperar acesso'}} />
			<Stack.Screen name="ServiceBookScreens" component={ServiceBookScreens} options={{ headerShown: false }} />
			<Stack.Screen name="EmployeesScreens" component={EmployeesScreens} options={{ headerShown: false }} />
			<Stack.Screen name="ServiceCatalogScreens" component={ServiceCatalogScreens} options={{ headerShown: false }} />
			<Stack.Screen name="UsersScreens" component={UsersScreens} options={{ headerShown: false }} />
			<Stack.Screen name="Promotions" component={Main} />
		</Stack.Navigator>

	);
}

