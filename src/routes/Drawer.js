
import { createDrawerNavigator } from '@react-navigation/drawer'
import Schedule from '../screens/Schedule';
import About from '../screens/About';
import MyShopping from '../screens/MyShopping';
import UnderConstruction from '../screens/UnderConstruction';
import { EmployeesScreen } from './EmployeesScreens';
import { CatalogScreen } from './CatalogScreens';


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
			}}
		>
			<Drawer.Screen name="Home" component={Schedule} options={{ headerTitle: 'Jubas Barbearia', headerTitleAlign: 'center' }} />
			<Drawer.Screen name="Minha conta" component={UnderConstruction} />
			<Drawer.Screen name="Minhas compras" component={MyShopping} />
			<Drawer.Screen name="Promoções" component={UnderConstruction} />
			<Drawer.Screen name="Catálogo de serviços" component={CatalogScreen} />
			<Drawer.Screen name="Gerenciar agenda" component={UnderConstruction} />
			<Drawer.Screen name="Gerenciar barbeiros" component={EmployeesScreen} />
			<Drawer.Screen name="Gerenciar pagamentos" component={UnderConstruction} />
			<Drawer.Screen name="Gerenciar estoque" component={UnderConstruction} />
			<Drawer.Screen name="Acompanhar devolução" component={UnderConstruction} />
			<Drawer.Screen name="Sobre" component={About} />
		</Drawer.Navigator>
	)
}
