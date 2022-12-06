import React from 'react';
import {
  Button,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  View,
} from 'react-native';

const agenda = [{
    title: "Barbeiro 1",
    schedules: [
      { id:1, time:"8:00" },
      { id:2, time:"8:30" }]
  },
  {
    title: "Barbeiro 2",
    schedules: [
      { id:1, time:"8:00" },
      { id:2, time:"8:30" }]
  }];

export default function agenda (){  
  return(
    <View>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  </View>
  )

}