import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import DrawerScreens from './Drawer';
import About from '../screens/About';
import ServiceBookScreens from './ServiceBookScreens';
import ListServices from '../screens/ServiceCatalog/ListServices';

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
			<Stack.Screen name="Schedule" component={DrawerScreens} options={{ headerShown: false }} />
			<Stack.Screen name="ServiceBook" component={ServiceBookScreens} options={{ headerShown: false }} />
			<Stack.Screen name="ListServices" component={ListServices} options={{ title: 'Lista de Serviços' }} />
			{/* <Stack.Screen name="MyEmployees" component={Employees} options={title:'Horários de atendimento')} />
			<Stack.Screen name="MyEmployeesTimes" component={Times} options={title:'Horários de atendimento')} />
			<Stack.Screen name="TimeForm" component={Form} options={title:'Inserir horários')} />
			<Stack.Screen name="DailyForm" component={Insert} options={title:'Inserir horários')} />
			
			<Stack.Screen name="EditForm" component={Edit} options={{title:'Editar horários'}} /> */}


		</Stack.Navigator>

	);
}

