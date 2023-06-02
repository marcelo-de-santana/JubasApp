import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { global } from '../components/styles/global'
import env from "../../env.json";
import LoadingScreen from '../components/LoadingScreen';
import d from '../services/api/schedule.json'

export default function Schedule({ navigation }) {
  const [scheduleData, setScheduleData] = useState(d)

  useEffect(() => searchSchedule(), [])

  function searchSchedule() {
    fetch(`${env.host}/schedule/`)
      .then(response => response.json())
      .then(json => setScheduleData(json))
      .catch(err => console.log(err))
  }

  function timeResponse(id, barber_name, time) {
    alert(`Deseja marcar um atendimento com ${barber_name} às ${new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}h?`)
    navigation.navigate('ServiceBook')
  };

  if (scheduleData?.length > 0) {
    return (
      <View style={global.container}>

        <ScrollView style={{ height: '90%' }}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity style={global.buttonSelectionInactive}><Text style={global.whiteTextSmallCenter}>Hoje</Text></TouchableOpacity>
            <TouchableOpacity style={global.buttonSelectionActive}><Text style={global.whiteTextSmallCenter}>Amanhã</Text></TouchableOpacity>
            <TouchableOpacity style={global.buttonSelectionActive}><Text style={global.whiteTextSmallCenter}>Quinta</Text></TouchableOpacity>
          </View>
          {scheduleData.map((item) => (
            <View key={item.barber_id}>
              <Text style={global.textHeader}>{item.barber_name}</Text>
              <View style={styles.timesBox}>

                {item.available_times.map((aTimes) => {
                  const isTimeUnavailable = item.unavailable_times.includes(aTimes)
                  const textStyle = isTimeUnavailable ? styles.textUnATimes : styles.textATimes
                  const key = isTimeUnavailable ? aTimes : `${item.barber_id}-${aTimes}`

                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => timeResponse(item.barber_id, item.barber_name, aTimes)}
                      disabled={isTimeUnavailable}
                    >
                      <Text style={textStyle}>{new Date(aTimes).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                  )

                })}

              </View>
            </View>
          ))}

        </ScrollView>
        <View style={styles.footerBox}>
          <Text style={styles.scrollInfo}>Role para visualizar mais horários</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ServiceBook')}>
            <Text style={styles.textButton}>Marcar atendimento</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#f2f2f2",
  },
  boxHeader: {
    marginBottom: 10,
  },
  textHeader: {
    color: "#000000",
    fontSize: 16,
    paddingLeft: 5,
    paddingBottom: 4,
  },
  timesBox: {
    backgroundColor: "#9ba7bf",
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",

    padding: 12,
  },
  textATimes: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 4,
  },
  textUnATimes: {
    color: "red",
    fontSize: 20,
    paddingHorizontal: 4,
  },
  footerBox: {
    paddingBottom: 10,
  },
  scrollInfo: {
    textAlign: 'center',
    color: '#3c4659',
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3c4659",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
  },
  textButton: {
    textAlign: 'center',
    color: "#ffffff",
    fontSize: 18
  },
})
