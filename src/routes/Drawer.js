
import { createDrawerNavigator } from '@react-navigation/drawer'
import { EmployeesScreen } from './EmployeesScreens';
import { CatalogScreen } from './CatalogScreens';
import ServiceBookScreens from './ServiceBookScreens';

const Drawer = createDrawerNavigator();

export default function DrawerScreens() {
	return (
		<Drawer.Navigator
			initialRouteName='Home'
			screenOptions={{
				drawerActiveTintColor: '#ffffff',
				drawerActiveBackgroundColor: '#9ba7bf',
				drawerInactiveTintColor: '#ffffff',
				drawerStyle: {
					backgroundColor: '#3c4659',
				},
				headerTintColor: '#fff',
				headerStyle: {
					backgroundColor: '#3c4659',
				},
			}}>
			
			<Drawer.Screen name="ScheduleBook" component={ServiceBookScreens} options={{ headerShown: false }} />
			<Drawer.Screen name="Catálogo de serviços" component={CatalogScreen} />
			<Drawer.Screen name="Gerenciar barbeiros" component={EmployeesScreen} />

		</Drawer.Navigator>
	)
}
