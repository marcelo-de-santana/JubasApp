import { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { global } from '../../components/styles/global'
import env from "../../../env.json";
import LoadingScreen from '../../components/LoadingScreen';
import d from '../../services/api/schedule.json'

export default function Schedule({ navigation }) {
  const [scheduleData, setScheduleData] = useState([]);
  const currentDay = new Date().getDay();
  const lastDay = currentDay + 2;
  const [dayIndex, setDayIndex] = useState(currentDay);

  useEffect(() => {
    fetch(`${env.host}/schedule/`)
      .then(response => response.json())
      .then(json => setScheduleData(json))
      .catch(err => console.log(err))
  }, [])

  function changeScreen(dayParams) {
    navigation.push('CategoryBox', dayParams)
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
                <Text style={global.textButton}>{(index == currentDay) ? 'Hoje' : item.day_name}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        {scheduleData[dayIndex].daily_schedule.map(item => (
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
                    <Text style={textStyle}>{time}</Text>
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