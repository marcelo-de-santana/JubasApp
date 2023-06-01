import { createStackNavigator } from "@react-navigation/stack";
import CatalogProvider from "../contexts/catalog";
import ListCategories from "../screens/ServiceCatalog/ListCategories";
import ListServices from "../screens/ServiceCatalog/ListServices";

const Stack = createStackNavigator();

export function CatalogScreen() {
    return (
        <CatalogProvider>
            <Stack.Navigator>
                <Stack.Screen name='ListCategories' component={ListCategories} options={{ headerShown: false }} />
                <Stack.Screen name='ListServices' component={ListServices} options={{ headerShown: false }} />
            </Stack.Navigator>
        </CatalogProvider>
    );
}