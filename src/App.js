import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import SignUp from './pages/SignUp';

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{title:'Cadastre-se',headerStyle:{backgroundColor:"#3c4659"},headerTintColor:'#ffffff'}}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
