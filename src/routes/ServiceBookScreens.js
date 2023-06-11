import { createStackNavigator } from '@react-navigation/stack';
import ServiceProvider from '../contexts/service';
import Schedule from '../screens/ServiceBook/Schedule';
import CategoryBox from '../screens/ServiceBook/CategoryBox';
import ServiceBox from '../screens/ServiceBook/ServiceBox';
import Cart from '../screens/ServiceBook/Cart';


const Stack = createStackNavigator();

export default function ServiceBookScreens() {
	return (
		<ServiceProvider>
			<Stack.Navigator initialRouteName="Schedule" screenOptions={{
				headerTitle: 'Marcar atendimento',
				headerTintColor: '#fff',
				headerStyle: {
					backgroundColor: "#3C4659"
				}
			}}>
				<Stack.Screen name="Schedule" component={Schedule} />
				<Stack.Screen name="CategoryBox" component={CategoryBox} />
				<Stack.Screen name="ServiceBox" component={ServiceBox} />
				<Stack.Screen name="Cart" component={Cart} />
			</Stack.Navigator>
		</ServiceProvider >
	)
}