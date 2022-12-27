import React from 'react';
import { Text ,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import SignUp from './pages/SignUp';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Schedule">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{title:'Cadastre-se',headerStyle:{backgroundColor:"#423e3c"},headerTintColor:'#ffffff'}}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}