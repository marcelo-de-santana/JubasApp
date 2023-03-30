import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import SignUp from './pages/SignUp';
import About from './pages/About';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
    	initialRouteName='Home'
    	screenOptions={{
    		drawerActiveTintColor:'#ffffff',
    		drawerActiveBackgroundColor:'#9ba7bf',
    		drawerInactiveTintColor:'#ffffff',
    		drawerStyle:{
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
        	headerTitleAlign:'center',
      	}}
      />
      	<Drawer.Screen name="Minha conta" component={Login} />
	<Drawer.Screen name="Minhas compras" component={Login} />
	<Drawer.Screen name="Promoções" component={Login} />
	<Drawer.Screen name="Tabela de preços" component={Login} />
	<Drawer.Screen name="Gerenciar agenda" component={Login} />
	<Drawer.Screen name="Gerenciar barbeiros" component={Login} />
	<Drawer.Screen name="Gerenciar pagamentos" component={Login} />
	<Drawer.Screen name="Gerenciar estoque" component={Login} />
	<Drawer.Screen name="Acompanhar devolução" component={Login} />
	<Drawer.Screen name="Sobre" component={About} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp}
        	options={{
        		title: 'Cadastre-se',
        		headerStyle: {
        			backgroundColor: "#3c4659"
        		},
        		headerTintColor: '#ffffff' }} />
        <Stack.Screen name="Schedule" component={MyDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
