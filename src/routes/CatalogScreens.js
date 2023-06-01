import { createStackNavigator } from "@react-navigation/stack";
import CatalogProvider from "../contexts/catalog";
import ListCategories from "../screens/ServiceCatalog/ListCategories";
import ListServices from "../screens/ServiceCatalog/ListServices";
import CategoryEntryForm from "../screens/ServiceCatalog/CategoryEntryForm";
import ServiceEntryForm from "../screens/ServiceCatalog/ServiceEntryForm";
import CategoryEditForm from "../screens/ServiceCatalog/CategoryEditForm";

const Stack = createStackNavigator();

export function CatalogScreen() {
    return (
        <CatalogProvider>
            <Stack.Navigator>
                <Stack.Screen name='ListCategories' component={ListCategories} options={{ headerShown: false }} />
                <Stack.Screen name='ListServices' component={ListServices} options={{ headerShown: false }} />
                <Stack.Screen name='CategoryEntryForm' component={CategoryEntryForm} options={{ headerShown: false }} />
                <Stack.Screen name='ServiceEntryForm' component={ServiceEntryForm} options={{ headerShown: false }} />
                <Stack.Screen name='CategoryEditForm' component={CategoryEditForm} options={{ headerShown: false }} />
            </Stack.Navigator>
        </CatalogProvider>
    );
}
