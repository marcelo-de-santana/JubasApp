import React, { useState, useEffect } from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScroolView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Title from '../components/Title';
import env from "../../env.json";
import BarberList from '../components/BarberList';

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    fetch(`${env.host}/schedule/`)
      .then((response) => response.json())
      .then((json) => (setScheduleData(json)))
      .catch(() => (alert('Impossível carregar a agenda!')))
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <BarberList data={scheduleData}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 0,
    width: "100%",
    height: "auto",
    backgroundColor: "#423e3c",
    
  },
  times: {

  }
})