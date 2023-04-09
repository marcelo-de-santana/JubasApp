
import { createDrawerNavigator } from '@react-navigation/drawer'
import Schedule from '../pages/Schedule';
import MyAccount from '../pages/MyAccount';
import About from '../pages/About';
import MyShopping from '../pages/MyShopping';
import UnderConstruction from '../pages/UnderConstruction';
import PriceList from '../pages/PriceList';
import MyEmployees from '../pages/MyEmployees';

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

				}
			}}
		>
			<Drawer.Screen name="Home" component={Schedule}
				options={{
					headerTitle: 'Jubas Barbearia',
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
					headerTitleAlign: 'center',
				}}
			/>
			<Drawer.Screen name="Minha conta" component={MyAccount}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Minhas compras" component={MyShopping}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Promoções" component={UnderConstruction}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Tabela de preços" component={PriceList}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Gerenciar agenda" component={UnderConstruction}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Gerenciar barbeiros" component={MyEmployees}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Gerenciar pagamentos" component={UnderConstruction}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Gerenciar estoque" component={UnderConstruction}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Acompanhar devolução" component={UnderConstruction}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
			<Drawer.Screen name="Sobre" component={About}
				options={{
					headerTintColor: '#ffffff',
					headerStyle: {
						backgroundColor: '#3c4659',
					},
				}}
			/>
		</Drawer.Navigator>
	)
}