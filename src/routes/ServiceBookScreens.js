import { createStackNavigator } from '@react-navigation/stack';
import ServiceProvider from '../contexts/service';
import Schedule from '../screens/Schedule';
import CategoryBox from '../screens/ServiceBook/CategoryBox';
import ServiceBox from '../screens/ServiceBook/ServiceBox';
import Cart from '../screens/ServiceBook/Cart';
import MainScreen from '../screens/MainScreen';


const Stack = createStackNavigator();

export default function ServiceBookScreens() {
	return (
		<ServiceProvider>
			<Stack.Navigator initialRouteName="MainScreen" screenOptions={{
				headerStyle: {
					backgroundColor: "#3c4659"
				},
				headerTintColor: '#fff'
			}}>
				<Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Schedule" component={Schedule} options={{ headerTitle: 'Jubas Barbearia', headerTitleAlign: 'center' }} />
				<Stack.Screen name="CategoryBox" component={CategoryBox} options={{ title: 'Marcar atendimento' }} />
				<Stack.Screen name="ServiceBox" component={ServiceBox} options={{ title: 'Marcar atendimento' }} />
				<Stack.Screen name="Cart" component={Cart} options={{ title: 'Minhas compras' }} />
			</Stack.Navigator>
		</ServiceProvider>
	)
}