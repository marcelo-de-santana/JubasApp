
import { createDrawerNavigator } from '@react-navigation/drawer'

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
			

		</Drawer.Navigator>
	)
}
