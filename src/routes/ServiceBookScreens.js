import { createStackNavigator } from '@react-navigation/stack';
import { headerStack } from '../components/styles/headerNavigation';
import ServiceProvider from '../contexts/service';
import CategoryBox from '../screens/ServiceBook/CategoryBox';
import ServiceBox from '../screens/ServiceBook/ServiceBox';
import Cart from '../screens/ServiceBook/Cart';
import ListAvailableTimes from '../screens/ServiceBook/ListAvailableTimes';

const Stack = createStackNavigator();

export default function ServiceBookScreens() {
	return (
		<ServiceProvider>
			<Stack.Navigator initialRouteName="Categories" screenOptions={{
				headerStyle: {
					backgroundColor: "#3c4659"
				},
				headerTintColor: '#fff'
			}}>
				<Stack.Screen name="Categories" component={CategoryBox} options={{title:'Marcar atendimento'}} />
				<Stack.Screen name="Services" component={ServiceBox} options={{title:'Marcar atendimento'}} />
				<Stack.Screen name="Cart" component={Cart} options={{title:'Minhas compras'}} />
				<Stack.Screen name="ListAvailableTimes" component={ListAvailableTimes} options={{title:'Minhas compras'}} />
			</Stack.Navigator>
		</ServiceProvider>
	)
}