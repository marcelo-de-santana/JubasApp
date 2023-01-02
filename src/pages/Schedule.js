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
import env from "../../env.json"

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch(`${env.host}/schedule/`)
      .then((response) => response.json())
      .then((json) => (setScheduleData(json)))
      .catch(() => (alert('Impossível carregar a agenda!')))
  }, [])

  function getSchedule(data) {
    return data.map(item => (
      (item.available_times != '') ?
      <View key={item.id} style={{ paddingBottom: 10}}>

        <Text style={{ color: "white", fontSize: 20, paddingLeft: 15, paddingBottom: 4 }}>{item.name}</Text>

        <View style={{ backgroundColor: "grey", borderRadius: 10, flexDirection: "row", flexWrap: 'wrap', marginHorizontal: 10, padding: 12 }}>

        {item.available_times.map((v) => (
                <Text key={v} style={{ color: "white", fontSize: 20, paddingHorizontal: 4 }}>{v.substr(0, 5)}</Text>
              ))} 
        </View>
      </View>
      :
      ''
    )
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title />

      {getSchedule(scheduleData)}
      
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