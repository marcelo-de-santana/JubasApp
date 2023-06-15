import { createStackNavigator } from "@react-navigation/stack";
import CatalogProvider from "../contexts/catalog";
import ListCategories from "../screens/ServiceCatalog/ListCategories";
import ListServices from "../screens/ServiceCatalog/ListServices";

const Stack = createStackNavigator();

export default function ServiceCatalogScreens() {
    return (
        <CatalogProvider>
            <Stack.Navigator screenOptions={{
				headerTitle: 'Catálogo de serviços',
				headerTintColor: '#fff',
				headerStyle: {
					backgroundColor: "#3C4659"
				}
            }}>
                <Stack.Screen name='ListCategories' component={ListCategories} options={{ title: 'Catálogo de serviços' }} />
                <Stack.Screen name='ListServices' component={ListServices} />
            </Stack.Navigator>
        </CatalogProvider>
    );
}
