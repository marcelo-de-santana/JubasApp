import { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { global } from '../../components/styles/global'
import env from "../../../env.json";
import LoadingScreen from '../../components/LoadingScreen';
import { useService } from '../../contexts/service';

export default function Schedule({ navigation }) {
  const { setServiceParams } = useService();
  const [scheduleData, setScheduleData] = useState([]);
  const currentDay = new Date().getUTCDay();
  const [dayIndex, setDayIndex] = useState(currentDay);
  const lastDay = currentDay + 2;
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch(`${env.host}/schedule/`)
      .then(response => response.json())
      .then(json => setScheduleData(json))
      .catch(err => console.log(err))
  }, [refresh])

  //ATUALIZA A PÁGINA QUANDO A NAVEGAÇÃO É RETORNADA
  navigation.addListener('focus', () => refreshPage())

  function refreshPage() {
    setRefresh(refresh + 1)
  }

  function changeScreen(dayParams) {
    setServiceParams(dayParams)
    navigation.push('CategoryBox')
  };

  if (scheduleData.length === 0) {
    return (
      <LoadingScreen />
    );
  }

  function changeDay(day) {
    setDayIndex(day)
  }

  return (
    <View style={global.container}>
      <ScrollView >
        <View style={global.boxFlexRow}>
          {scheduleData.map((item, index) => (
            (index >= currentDay && index <= lastDay) &&
            <TouchableWithoutFeedback onPress={() => changeDay(index)}
              key={item.day_id}
              disabled={(dayIndex === index)}
            >
              <View style={(dayIndex === index) ? global.inactiveButton : global.activeButton} >
                <Text style={global.textButton}>{(item.day_id == currentDay) ? 'Hoje' : item.day_name}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        {scheduleData[dayIndex]?.daily_schedule.map(item => (
          <View key={item.barber_id}>
            <Text style={global.textHeader}>{item.barber_name}</Text>
            <View style={global.blueBox}>
              {item.available_times.map((time) => {
                const isTimeUnavailable = item.unavailable_times.includes(time)
                const textStyle = isTimeUnavailable ? global.redText : global.whiteTextLarge
                return (
                  <TouchableOpacity onPress={() => changeScreen({
                    barberId: item.barber_id,
                    barberName: item.barber_name,
                    time: time,
                    dayId: scheduleData[dayIndex].day_id
                  })}
                    key={time}
                    disabled={isTimeUnavailable}
                  >
                    <Text style={textStyle}>{time.slice(0, -3)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView >
    </View >
  );
}